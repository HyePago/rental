import React from 'react'
import ReactDOM from 'react-dom'

import './Header.css'

class Non_Member_reservation extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: 1,
            email: '',
            input_certification_number: '',
            certification_number: '',
            image: [],
            car_number: [],
            car_name: [],
            fuel: [],
            color: [],
            distance: [],
            few: [],
            refundable: [],
            reservation_number: [],
            rental_point: '',
            return_point: '',
            rental_date: '',
            return_date: '',
            currentPage: '',
            total_page: '',
            test_number: 0,
            division_number: 0,
        }

        this.handleClick = this.handleClick.bind(this);
    }
    // page
    handleClick(event){
        this.setState({currentPage: event.target.id});

        this.submitGit_reservation_list();
    }

    emailChange(e){
        this.setState({email:e.target.value});
    }
    input_certification_numberChange(e){
        this.setState({input_certification_number:e.target.value});
    }

    // send_email
    emailAuthentication(opts){
        fetch('/email', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((Response) => { return Response.json(); })
    }
    submitGit_email(){
        var min = 100000;
        var max = 999999;
        var certification_number = parseInt(min + (Math.random() * (max-min)));

        this.setState({certification_number:certification_number});

        this.emailAuthentication({
            email: this.state.email,
            certification_number: certification_number
        });
    }

    // email_certification
    setCertification(opts){
        fetch('/email_certification', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result == "false"){
                alert("인증번호를 다시 한 번 확인해주시길 바랍니다.");
                return;
            }

            this.submitGit_reservation_list();
            this.setState({returned:2});
        }.bind(this))
    }
    submitGit_certification(){
        this.setCertification({
            email:this.state.email,
            certification_number:this.state.input_certification_number
        })
    }

    //reservation_list
    list_reservation(opts){
        fetch('/reservation_history', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({image:[]});
            this.setState({car_number:[]});
            this.setState({car_name:[]});
            this.setState({fuel:[]});
            this.setState({color:[]})
            this.setState({distance:[]});
            this.setState({few:[]});
            this.setState({refundable:[]});
            this.setState({reservation_number:[]});

            for(var count = 0; this.state.result[count] != null; count++){
                this.setState({image:this.state.image.concat(this.state.result[count]["image"])});
                this.setState({car_number:this.state.car_number.concat(this.state.result[count]["car_number"])});
                this.setState({car_name:this.state.car_name.concat(this.state.result[count]["car_name"])});
                this.setState({fuel:this.state.fuel.concat(this.state.result[count]["fuel"])});
                this.setState({color:this.state.color.concat(this.state.result[count]["color"])});
                this.setState({distance:this.state.distance.concat(this.state.result[count]["distance"])});
                this.setState({few:this.state.few.concat(this.state.result[count]["few"])});
                this.setState({refundable:this.state.refundable.concat(this.state.result[count]["refundable"])});
                this.setState({reservation_number:this.state.reservation_number.concat(this.state.result[count]["reservation_number"])});
            }
            this.setState({count:count});
            this.setState({total_page:this.state.result[0]["total_page"]});
        }.bind(this))
        .then(function(){
            if(this.state.test_number==0){
                this.setState({test_number:1});
                this.submitGit_reservation_list();
            }
            else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitGit_reservation_list(){
        this.list_reservation({
            email: this.state.email,
            currentPage: this.state.currentPage
        })
    }

    //refund
    refund_impormation(){
        fetch('/refund_impormation', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "reservation_number="+this.state.reservation_number[this.state.division_number]
        })
        .then((response) => { return response.json(); })
        .then((json) => { 
            this.setState(
                {
                    rental_point:json.rental_point,
                    rental_date:json.rental_date,
                    return_point:json.return_point,
                    return_date:json.return_date
                }); 
        })
        .then(function(){
            if(this.state.test_number==0){
                this.setState({test_number:1});
                this.refund_impormation();
            }
            else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    click_refund(e){
        this.setState({division_number:e.target.id});
        console.log("e.target.id = > ", e.target.id);
        this.setState({returned:'refund'});
        this.refund_impormation();
    }
    cancel_reservation(){
        fetch('/refund', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "reservation_number="+this.state.reservation_number[this.state.division_number]
        })
        .then((response) => { return response.json(); })
        .then((json) => { 
            if(json.result == "false"){
                alert("다시 한 번 시도해주시길 바랍니다.");
            }
            this.submitGit_reservation_list();
            this.setState({returned:2});
        })
    }
    click_cancel_reservation(){
        var answer = confirm("정말 예약 취소하시겠습니까?");
        if(answer == true){
            this.cancel_reservation();
        }
    }

    render(){
        //page
        const pageNumbers = [];
        for (let i = 1; i <= (Math.floor((this.state.total_page-1) / 5))+1; i++){
            pageNumbers.push(i);
        }
        const renderPageNUmbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick}>
                    {number}
                </li>
            );
        });

        //style
        const noneStyle = {
            display: 'none',
        }
        const blockStyle = {}

        //list
        const list_number = [];
        for(let i = 0; i < 5; i++){
            list_number.push(i);
        }
        const reservation_list = list_number.map(number => {
            return(
                <tr key={number} id={number} style={this.state.image[number] == null ? noneStyle : blockStyle}>
                    <td>
                        <img src={this.state.image[number]} width="230" height="130" />
                    </td>
                    <td>
                        {this.state.car_number[number]}
                    </td>
                    <td>
                        {this.state.car_name[number]}
                    </td>
                    <td>
                        {this.state.fuel[number]}
                    </td>
                    <td>
                        {this.state.color[number]}
                    </td>
                    <td>
                        {this.state.distance[number]}
                    </td>
                    <td>
                        {this.state.few[number]}
                    </td>
                    <td style={this.state.refundable[number] == "false"? noneStyle : blockStyle}>
                        <button id={number} onClick={this.click_refund.bind(this)}> 환불 </button>
                    </td>
                </tr>
            )
        })

        let email_certification_Form = (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                이메일
                            </td>
                            <td>
                                <input type="text" onChange={this.emailChange.bind(this)} />
                                <button onClick={this.submitGit_email.bind(this)}> 인증번호 전송 </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                인증번호
                            </td>
                            <td>
                                <input type="number" onChange={this.input_certification_numberChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.submitGit_certification.bind(this)}> 확인 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        let reservation_list_Form = (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td widrth="230">
                                이미지
                            </td>
                            <td width="150">
                                차량 번호
                            </td>
                            <td width="150">
                                차량 이름
                            </td>
                            <td width="150">
                                연료
                            </td>
                            <td width="150">
                                색상
                            </td>
                            <td width="150">
                                주행거리
                            </td>
                            <td width="150">
                                n인승
                            </td>
                            <td width="150">
                                예약취소
                            </td>
                        </tr>
                        {reservation_list}
                    </tbody>
                </table>
                <ul id="page-numbers">
                    {renderPageNUmbers}
                </ul>
            </div>
        )
        let refuned_Form = (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <img src={this.state.image[this.state.division_number]} width="500" height="380" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                차종
                            </td>
                            <td>
                                {this.state.car_name[this.state.division_number]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                색상
                            </td>
                            <td>
                                {this.state.color[this.state.division_number]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                주행거리
                            </td>
                            <td>
                                {this.state.distance[this.state.division_number]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                N인승
                            </td>
                            <td>
                                {this.state.few[this.state.division_number]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                대여지점
                            </td>
                            <td>
                                {this.state.rental_point}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                반납지점
                            </td>
                            <td>
                                {this.state.return_point}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                대여 일자
                            </td>
                            <td>
                                {this.state.rental_date.slice(0,16)}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                반납 일자
                            </td>
                            <td>
                                {this.state.return_date.slice(0,16)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button onClick={this.click_cancel_reservation.bind(this)}> 예약 취소 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

        if(this.state.returned == 1){
            return email_certification_Form;
        } else if(this.state.returned == 2){
            return reservation_list_Form;
        } else if(this.state.returned == 'refund'){
            return refuned_Form;
        }
    }
}

export default Non_Member_reservation;