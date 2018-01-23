package main

import (
	"github.com/gin-gonic/gin"
	"github.com/olahol/melody"
	"math/rand"
	"time"
	"strconv"
	"encoding/json"
	"database/sql"
	"net/http"
	"net/smtp"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"strings"
	"reflect"
)

type User struct {
	aptitude_test string
	count string
	date_if_issue string
	email string
	license_category string
	license_number string
	license_type string
	name string
	password string
	phone string
	username string
}
type Login_User struct{
	result int
	name string
	username string
	reserves string
	email string
	license_id string
	license_category string
	license_number string
	license_type string
	date_if_issue string
	aptitude_test string
}
type Email struct {
	email string
}
type headerSetter struct {
	key, val string
	handler  http.Handler
}
type Rent1 struct {
	image string
	car_name string
	car_type string
	fuel string
	few string
	color string
	distance string
	registration_date string
	six_hour string
	ten_hour string
	twelve_hour string
	two_days string
	four_days string
	six_days string
	more string
	car_number string
}

type Reservation_History struct {
	image string
	car_number string
	car_name string
	car_type string
	fuel string
	color string
	distance string
	few string
}

// func FloatToString(input_num float64) string {
//     // to convert a float number to a string
//     return strconv.FormatFloat(input_num, 'f', 6, 64)
// } 

 func send(email string, body string){
	 from := "hyepago@gmail.com"
	 pass := "9017thdud"
	 to := email

	 msg := "From: " + from + "\n" +
		"To: " + to + "\n" + 
		"Subject: 인증번호입니다.\n\n" +
		body


	err := smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))


	if err != nil {
		log.Printf("smtp err : %s", err)
		return
	}

	log.Println("sent, visit http://foobarbazz.mailinator.com")
 }

func randInt(min int, max int) int {
	rand.Seed(time.Now().UTC().UnixNano())
	return min+rand.Intn(max-min)
}

func main() {
	router := gin.Default()
	m := melody.New()
	 
	//db_url := os.Getenv("root:111111@/rent")
	db, _ := sql.Open("mysql", "root:111111@/rent")

	router.GET("/", func(c *gin.Context) {
		http.ServeFile(c.Writer, c.Request, "./public/index.html")
	})

	router.GET("/bundle.js", func(c *gin.Context) {
		http.ServeFile(c.Writer, c.Request, "./public/bundle.js")
	})

	router.POST("/upload_image", func(c *gin.Context){
		form, err := c.MultipartForm()
		//log.Println(form.File["0"]) //v의 length가 1개가 아닐떄 에러
		//log.Println("len:",len(form.File["0"]))

		v := form.File["0"]

		if(len(v) != 1){ //개수가 1개가 아니면
			log.Println("Error: len(v) != 1 | ", len(v))
			return	
		}

		if err != nil {
			log.Println("Failed to upload image: ", err)
			return
		}

		const PATH = "/Users/samjung/documents/rental/public/upload_image/"
		extension := strings.Split(v[0].Filename, ".")

		var id string
		var now = time.Now().String()

		for {
			now = time.Now().String()
			err := db.QueryRow("SELECT id FROM image where changed_filename=?", PATH + now + "." + extension[1]).Scan(&id)
			
			switch {
			case err == sql.ErrNoRows:
				break;
			case err != nil:
				log.Println(err)
			default:
				log.Println("LOG:: 이미 같은 파일명 존재 - ", PATH + now + "." + extension[1])
			}

			if id == "" {
				break;
			}
		}

		c.SaveUploadedFile(v[0], PATH + now + "." + extension[1]) //랜덤-바꾼파일명이 디렉터리에 있는지도 확인!!(있을경우 다시 파일이름 바꾸게)
		_, err = db.Exec("INSERT INTO image (original_filename, changed_filename) values (?, ?)", v[0].Filename, "http://localhost:5000/public/upload_image/" + now + "."+extension[1])

		if err != nil {
			log.Fatal(err)
		}

		/*url := c.PostForm("url")

		target_url := "http://localhost:5000/upload"
		filename := url
		postFile(filename, target_url)
		
		c.JSON(200, gin.H{

		})
		*/

		c.JSON(200, gin.H{
			"url": now + "."+extension[1],
		})
	})	

	router.POST("/id_overlap", func(c *gin.Context) {
		username := c.PostForm("username")
		log.Println("LOG: id_overlap | "+username)
		err := db.QueryRow("SELECT id FROM users where username = ?", username).Scan(&username)

		switch{
		case err == sql.ErrNoRows:
			log.Println("LOG: 아이디 중복 없음")
			c.JSON(200, gin.H {
				"users": 't',
			})
		case err != nil:
			log.Println(err)
		default:
			log.Println("LOG: 아이디 중복 있음")
			c.JSON(200, gin.H {
				"users": 'f',
			})
		}

		log.Println("LOG: Out the id_overlap")
	})

	router.POST("/sign_in", func(c *gin.Context){
		log.Println("LOG:: sign_in_go")
		form := c.PostForm("form")

		var raw map[string]interface{}
		log.Println("**json**")
		log.Println(form)
		json.Unmarshal([]byte(form), &raw)

		username := raw["username"]
		password := raw["password"]

		var failures int		
		err := db.QueryRow("SELECT failures FROM users where username=?", username).Scan(&failures)

		var users Login_User

		switch{
		case err == sql.ErrNoRows:
			log.Println("LOG:: 아이디가 존재하지않아요.")
			log.Println(username)
			c.JSON(200, gin.H{ 
				"result": 0,
				"name": ' ',
				"username": ' ',
				"reserves": ' ',
				"email": ' ',
			})
			return;
		case err != nil:
			log.Println(err)
			return;

		default:
			if failures > 5 {
				log.Println("LOG:: 5회 이상 틀리셨어요.")				
				c.JSON(200, gin.H{
					"result": 2,
					"name": ' ',
					"username": ' ',
					"reserves": ' ',
					"email": ' ',
				})
				return;
			}
		}

		err = db.QueryRow("SELECT license_id, name, username, point, email FROM users where username=? && password=?", username, password).Scan(&users.license_id, &users.name, &users.username, &users.reserves, &users.email)

		switch{
		case err == sql.ErrNoRows:
			log.Println("LOG:: 비밀번호가 틀렸어요.")
			_, err = db.Exec("UPDATE users set failures=? where username=?",failures, username)
			c.JSON(200, gin.H{
				"result": 0,
				"name": ' ',
				"username": ' ',
				"reserves": ' ',
				"email": ' ',
			})
			return;
		case err != nil:
			log.Println(err)
			return;
		}

		err = db.QueryRow("SELECT category, type, number, date_if_issue, aptitude_test FROM license where id = ?", users.license_id).Scan(&users.license_category, &users.license_type, &users.license_number, &users.date_if_issue, &users.aptitude_test);

		switch{
		case err == sql.ErrNoRows:
			log.Println("운전면허정보가 없어요.")
			return;
		case err != nil:
			log.Println(err)
			return;
		}

		log.Println("LOG:: 로그인에 성공하셨어요!")
		_, err = db.Exec("UPDATE users set failures=? where username=?",0,username)
		log.Println("LOG:: 회원정보입니다!")
		
		c.JSON(200, gin.H{
			"result": 1,
			"name": users.name,
			"username": users.username,
			"reserves": users.reserves,
			"email": users.email,
			"license_category": users.license_category,
			"license_type": users.license_type,
			"license_number": users.license_number,
			"date_if_issue": users.date_if_issue,
			"aptitude_test": users.aptitude_test,
		})
	})

	router.POST("/sign_up", func(c *gin.Context) {
		log.Println("LOG:: sing_up_go")
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		log.Println("**map**");
		log.Println(raw["username"]);

		name := raw["name"]
		username := raw["username"]	
		password := raw["password"]		
		email := raw["email"]
		phone := raw["phone"]
		
		// license
		license_category := raw["license_category"]
		license_type := raw["license_type"]
		license_number := raw["license_number"]
		date_if_issue := raw["date_if_issue"]
		aptitude_test := raw["aptitude_test"]
		
		var id int
		var user_id int
		err := db.QueryRow("SELECT id FROM license where number=?", license_number).Scan(&id)

		switch{
		case err == sql.ErrNoRows:
			_, err := db.Exec("INSERT INTO license (category, type, number, date_if_issue, aptitude_test) VALUES (?,?,?,?,?)",license_category, license_type, license_number, date_if_issue, aptitude_test)
			
			if err != nil {
				log.Fatal(err)
			}

			err = db.QueryRow("SELECT id FROM license where number=?", license_number).Scan(&id)
		case err != nil:
			log.Println(err)
			
		default:
			log.Println("이미 운전면허정보가 있데요!!")
			c.JSON(200, gin.H{
				"result":false,
			})
			return;
		}

		err = db.QueryRow("SELECT id FROM users where email=?", email).Scan(&user_id)

		switch{
		case err == sql.ErrNoRows:
		case err != nil:
		default:
			log.Println("이미 이메일이 있어요~!")
			c.JSON(200, gin.H{
				"result":false,
			})
			return;
		}

		log.Println("LOG:before, insert users")
		_, err = db.Exec("INSERT INTO users (email, name, username, password, phone, license_id) VALUES (?, ?, ?, ?, ?, ?)", email, name, username, password, phone, id)
		log.Println("LOG:after, inser users")

		if err != nil{
			log.Fatal(err)
		}

		c.JSON(200, gin.H{
			"result":true,
		})
	})

	router.POST("/email", func(c *gin.Context) {
		email := c.PostForm("email")
		number := randInt(100000,999999)
		log.Println(email)
		log.Println(number)

		msg := "인증번호 : " + strconv.Itoa(number)
		send(email, msg)

		var id int
		err := db.QueryRow("SELECT id FROM email_certification where email=?", email).Scan(&id)

		switch {
		case err == sql.ErrNoRows:
			_, err = db.Exec("INSERT email_certification set email=?, number=?", email, number)
		case err != nil:
			log.Println(err)
		default:
			stmt, _ := db.Prepare("UPDATE email_certification set number=? WHERE email=?")
			_, err = stmt.Exec(number, email)
		}		

		if err != nil {
			log.Fatal(err)
		} else {
			log.Println("email insert success")
		}

		c.JSON(200, gin.H{
			"email": Email{email},
		})
	})

	router.POST("/rent_1", func(c *gin.Context) {
		log.Println("LOG: /rent_1")
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		//area := raw["area"]
		//return_point := raw["return_point"]
		rental_point := raw["rental_point"].(string)
		rental_date := raw["rental_date"]
		rental_time := raw["rental_time"]
		return_date := raw["return_date"]
		return_time := raw["return_time"]
		start_page := raw["start_number"]
		car_type := raw["car_type"]

		log.Println("type of car_type : ", reflect.TypeOf(car_type))
		log.Println("car_type value : ", car_type)

		/*log.Println("rental_date : ", reflect.TypeOf(rental_date))
		log.Println("rental_time : ", reflect.TypeOf(rental_time))
		log.Println("return_date : ", reflect.TypeOf(return_date))
		log.Println("return_time : ", reflect.TypeOf(return_time))*/

		rentaldate := rental_date.(string) + " " + rental_time.(string) + ":00"
		//log.Println(rentaldate)
		returndate := return_date.(string) + " " + return_time.(string) + ":00"
		//log.Println(returndate)

		/*t_rentaldate, err := time.Parse("2006-01-02 15:04:05", rentaldate)
		t_returndate, err := time.Parse("2006-01-02 15:04:05", returndate)

		log.Println("t_rentaldate : ", t_rentaldate)
		log.Println("t_returndate : ", t_returndate)
		log.Println("t_retrundate - t_rentaldate : ", (t_returndate - t_rentaldate))*/

		var car_number string
		var id string
		
		count := 0
		index := 0

		var rent1 Rent1
		var result map[int]map[string]string = map[int]map[string]string{}

		rows, err := db.Query("SELECT car_number FROM reservation where ((rental_date >= ? && rental_date <= ?) || (return_date >= ? && return_date <= ?))", rentaldate, returndate, rentaldate, returndate)
		
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(&car_number)

			if err != nil {
				log.Fatal(err)
			}

			_, err = db.Exec("UPDATE car SET available = ? where car_number = ?", 0, car_number)

			if err != nil {
				log.Fatal(err)
			}
		}

		if car_type != "" {
			car_type, err = strconv.Atoi(car_type.(string))

			if err != nil{
				log.Println("err : ", err)
			}
		}

		// 가격이 낮은 순으로 보여줘야 함.
		rows, err = db.Query("SELECT id FROM car_price ORDER BY six_hour")

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(&id)

			result[index] = map[string]string{}

			if err != nil {
				log.Fatal(err)
			}
			
			if count < (int(start_page.(float64))-1) * 5 {
				count++;
				continue;
			}

			if car_type == "" || car_type == 0 {
				log.Println("차량 유형 전체 검색")
				err = db.QueryRow("SELECT image, name, type, fuel, few, color, carprice_id, distance, registration_date, car_number FROM car where carprice_id=? && available=? && point=?", id, 1, rental_point).Scan(&rent1.image, &rent1.car_name, &rent1.car_type, &rent1.fuel, &rent1.few, &rent1.color, &id, &rent1.distance, &rent1.registration_date, &rent1.car_number)
			} else {
				log.Println("유형 별 검색, 유형 => ", car_type)
				err = db.QueryRow("SELECT image, name, type, fuel, few, color, carprice_id, distance, registration_date, car_number FROM car where carprice_id=? && available=? && type = ? && point=?", id, 1, car_type, rental_point).Scan(&rent1.image, &rent1.car_name, &rent1.car_type, &rent1.fuel, &rent1.few, &rent1.color, &id, &rent1.distance, &rent1.registration_date, &rent1.car_number)				
			}

			switch{
			case err == sql.ErrNoRows:
				log.Println("LOG:: NO ROWS")
				count++;
				continue;
			case err != nil:
				log.Println(err)
			default:
				err = db.QueryRow("SELECT six_hour, ten_hour, twelve, two_days, four_days, six_days, more FROM car_price where id = ?", id).Scan(&rent1.six_hour, &rent1.ten_hour, &rent1.twelve_hour, &rent1.two_days, &rent1.four_days, &rent1.six_days, &rent1.more)

				switch{
				case err == sql.ErrNoRows:
					log.Println("Not Found Car_price")
				case err != nil:
					log.Println(err)
				}

				err = db.QueryRow("SELECT changed_filename FROM image where original_filename = ?", rent1.image).Scan(&rent1.image)

				result[index]["image"] = rent1.image
				result[index]["car_name"] = rent1.car_name
				result[index]["type"] = rent1.car_type
				result[index]["fuel"] = rent1.fuel
				result[index]["few"] = rent1.few
				result[index]["color"] = rent1.color
				result[index]["registration_date"] = rent1.registration_date
				result[index]["distance"] = rent1.distance
				result[index]["six_hour"] = rent1.six_hour
				result[index]["ten_hour"] = rent1.ten_hour
				result[index]["twelve_hour"] = rent1.twelve_hour
				result[index]["two_days"] = rent1.two_days
				result[index]["four_days"] = rent1.four_days
				result[index]["six_days"] = rent1.six_days
				result[index]["more"] = rent1.more
				result[index]["car_number"] = rent1.car_number

				count++;
				index++;
			}
		}

		_, err = db.Exec("UPDATE car SET available = ?", 1)

		if err != nil {
			log.Fatal(err)
		}

		// if(result[2] == nil){
		// 	log.Println("true")
		// }

		log.Println("rent_1 output result = ", result);

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/reservation", func(c *gin.Context) {
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		reservation_number := raw["reservation_number"]
		email := raw["email"]
		car_number := raw["car_number"]
		cost := raw["cost"]
		rental_date := raw["rental_date"]
		return_date := raw["return_date"]
		rental_point := raw["rental_point"]
		return_point := raw["return_point"]
		babyseat := raw["babyseat"]
		kor_navigation := raw["kor_navigation"]
		eng_navigation := raw["eng_navigation"]
		cdw := raw["cdw"]

		_, err := db.Exec("INSERT INTO reservation (number, email, car_number, cost, rental_date, return_date, rental_point, return_point, seat, navigation_korean, navigation_english, damage_indemnity) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",reservation_number, email, car_number, cost, rental_date, return_date, rental_point, return_point, babyseat, kor_navigation, eng_navigation, cdw)
		
		if err != nil {
			log.Fatal(err)
			c.JSON(200, gin.H {
				"result": false,
			})
			return;
		}

		c.JSON(200, gin.H {
			"result": true,
		})
	})

	router.POST("/send_reservation", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		// email := raw["email"].(string)
		// reservation_number := raw["reservation_number"].(string)
		email := raw["email"].(string)
		//reservation_number := floattostr(raw["reservation_number"].(float64))
		reservation_number := strconv.Itoa(int(raw["reservation_number"].(float64)))

		log.Println("email : ", email)
		log.Println("reservation_number : ", reservation_number)
		log.Println("type of email : ", reflect.TypeOf(email))
		log.Println("type of reservation_number : ", reflect.TypeOf(reservation_number))

		msg := "인증번호 : " + reservation_number
		send(email, msg)

		c.JSON(200, gin.H {
			"result": true,
		})
	})

	router.POST("/reservation_history", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"]
		currentPage := raw["currentPage"]

		count := 0
		index := 0

		var result map[int]map[string]string = map[int]map[string]string{}
		var car_number string
		var reservation Reservation_History

		rows, err := db.Query("SELECT car_number FROM reservation where email = ?", email)

		log.Println("LOG:: email = ", email)

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&car_number)
			log.Println("LOG:: car_number = ", car_number)

			if err != nil{
				log.Fatal(err)
			}

			result[index] = map[string]string{}

			if err != nil {
				log.Fatal(err)
			}

			currentPage_number, err := strconv.Atoi(currentPage.(string))

			if count < (currentPage_number -1) * 5 {
				count++;
				continue;
			}

			err = db.QueryRow("SELECT image, car_number, name, type, fuel, color, distance, few FROM car WHERE car_number = ?", car_number).Scan(&reservation.image, &reservation.car_number, &reservation.car_name, &reservation.car_type, &reservation.fuel, &reservation.color, &reservation.distance, &reservation.few)
		
			switch{
			case err == sql.ErrNoRows:
				log.Println("LOG:: No Rows")
				count++;
				continue;
			case err != nil:
				log.Println(err)
			}

			log.Println("LOG :: index = ", index, " | count = ", count, " | image = ", reservation.image)

			err = db.QueryRow("SELECT changed_filename FROM image where original_filename = ?", reservation.image).Scan(&reservation.image)

			result[index]["image"] = reservation.image
			result[index]["car_number"] = reservation.car_number
			result[index]["car_name"] = reservation.car_name
			result[index]["car_type"] = reservation.car_type
			result[index]["fuel"] = reservation.fuel
			result[index]["color"] = reservation.color
			result[index]["distance"] = reservation.distance
			result[index]["few"] = reservation.few

			count++
			index++
		}

		log.Println("result : ", result);

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	m.HandleMessage(func(s *melody.Session, message []byte) {
		
	})

	router.Static("/public", "./public")
	router.Run(":5000")
}
