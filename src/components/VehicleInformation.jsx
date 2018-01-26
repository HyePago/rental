import React from 'react'
import ReactDOM from 'react-dom'

import './Header.css'

class VehicleInformation extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            list: '',
            currentPage: '',
            total_page: '',
            returned: 1,
            input_car_type: '',
            image: [],
            car_number: [],
            car_name: [],
            color: [],
            car_type: [],
            fuel: [],
            few: [],
            distance: [],
            area: [],
            point: [],
            ider_repair: [],
            six_hour: [],
            ten_hour: [],
            twelve_hour: [],
            two_days: [],
            four_days: [],
            six_days: [],
            more: [],
            id: [],
            count: 0,
            test_number: 0,
            division_number: 0,
            upload_car_number:'',
            upload_color:'',
            upload_car_type:'',
            upload_fuel:'',
            upload_few:'',
            upload_distance:'',
            upload_area:'',
            upload_point:'',
            upload_ider_repair:'',
            upload_car_name:'',
            upload_six_hour:'',
            upload_ten_hour:'',
            upload_twelve_hour:'',
            upload_two_days:'',
            upload_four_days:'',
            upload_six_days:'',
            upload_more:'',
            result:'',
            sort:'1',
        }
    }

    componentDidMount() {
        this.setState({input_car_type:"0"});
        this.submitCarImpormation();
    }

    //list
    setCarImpormation(opts){
        fetch('/car_impormation', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            console.log("LOG result = ", this.state.result);

            this.setState({image:[]});
            this.setState({car_number:[]});
            this.setState({car_name:[]});
            this.setState({color:[]});
            this.setState({car_type:[]});
            this.setState({fuel:[]});
            this.setState({distance:[]});
            this.setState({area:[]});
            this.setState({point:[]});
            this.setState({ider_repair:[]});
            this.setState({six_hour:[]});
            this.setState({ten_hour:[]});
            this.setState({twelve_hour:[]});
            this.setState({two_days:[]});
            this.setState({four_days:[]});
            this.setState({six_days:[]});
            this.setState({more:[]});
            this.setState({id:[]});

            for(var count=0; this.state.result[count] != null; count++){
                this.setState({image:this.state.image.concat(this.state.result[count]["image"])});
                this.setState({car_number:this.state.car_number.concat(this.state.result[count]["car_number"])});
                this.setState({car_name:this.state.car_name.concat(this.state.result[count]["car_name"])});
                this.setState({color:this.state.color.concat(this.state.result[count]["color"])});
                this.setState({car_type:this.state.car_type.concat(this.state.result[count]["car_type"])});
                this.setState({fuel:this.state.fuel.concat(this.state.result[count]["fuel"])});
                this.setState({few:this.state.few.concat(this.state.result[count]["few"])});
                this.setState({distance:this.state.distance.concat(this.state.result[count]["distance"])});
                this.setState({area:this.state.area.concat(this.state.result[count]["area"])});
                this.setState({point:this.state.point.concat(this.state.result[count]["point"])});
                this.setState({ider_repair:this.state.ider_repair.concat(this.state.result[count]["ider_repair"])});
                this.setState({six_hour:this.state.six_hour.concat(this.state.result[count]["six_hour"])});
                this.setState({ten_hour:this.state.ten_hour.concat(this.state.result[count]["ten_hour"])});
                this.setState({twelve_hour:this.state.twelve_hour.concat(this.state.result[count]["twelve_hour"])});
                this.setState({two_days:this.state.two_days.concat(this.state.result[count]["two_days"])});
                this.setState({four_days:this.state.four_days.concat(this.state.result[count]["four_days"])});
                this.setState({six_days:this.state.six_days.concat(this.state.result[count]["six_days"])});
                this.setState({more:this.state.more.concat(this.state.result[count]["more"])});
                this.setState({id:this.state.id.concat(this.state.result[count]["id"])});
            }
            console.log("car_name : ", this.state.car_name);
            console.log("count : ", count);

            this.setState({count:count});
            this.setState({total_page:this.state.result[0]["total_count"]});
        }.bind(this))
        .then(function(){
            if(this.state.test_number==0){
                this.setState({test_number:1});
                this.submitCarImpormation();
            }else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitCarImpormation(){
        this.setCarImpormation({
            currentPage: this.state.currentPage,
            input_car_type: this.state.input_car_type,
            sort: this.state.sort,
        })
    }

    //page
    handleClick(e){
        this.setState({currentPage: e.target.id});

        this.submitCarImpormation();
    }

    //change & click
    click_home(){
        this.setState({returned:'home'});
    }  
    insert_car_Change(){
        this.setState({returned:'insert_car'})
    }
    mamber_impormation_Change(){
        this.setState({returned:'member_impormation'});
    }
    input_car_typeChange(e){
        this.setState({input_car_type:e.target.value});
        this.submitCarImpormation();
    }
    car_impormation_click(e){
        this.setState({division_number:e.target.id});

        this.setState({upload_car_number:this.state.car_number[e.target.id]});
        this.setState({upload_color:this.state.color[e.target.id]});
        this.setState({upload_car_type:this.state.car_type[e.target.id]});
        this.setState({upload_fuel:this.state.fuel[e.target.id]});
        this.setState({upload_few:this.state.few[e.target.id]});
        this.setState({upload_distance:this.state.distance[e.target.id]});
        this.setState({upload_area:this.state.area[e.target.id]});
        this.setState({upload_point:this.state.point[e.target.id]});
        this.setState({upload_ider_repair:this.state.ider_repair[e.target.id]});
        this.setState({upload_car_name:this.state.car_name[e.target.id]});
        this.setState({upload_six_hour:this.state.six_hour[e.target.id]});
        this.setState({upload_ten_hour:this.state.ten_hour[e.target.id]});
        this.setState({upload_twelve_hour:this.state.twelve_hour[e.target.id]});
        this.setState({upload_two_days:this.state.two_days[e.target.id]});
        this.setState({upload_four_days:this.state.four_days[e.target.id]});
        this.setState({upload_six_days:this.state.six_days[e.target.id]});        
        this.setState({upload_more:this.state.more[e.target.id]});

        this.setState({returned:2});
    }
    back_click(e){
        this.setState({returned:1});
    }
    car_numberChange(e){
        this.setState({upload_car_number:e.target.value});
    }
    colorChange(e){
        this.setState({upload_color:e.target.value});
    }
    car_typeChange(e){
        this.setState({upload_car_type:e.target.value});
    }
    fuelChange(e){
        this.setState({upload_fuel:e.target.value});
    }
    fewChange(e){
        this.setState({upload_few:e.target.value});
    }
    distanceChange(e){
        this.setState({upload_distance:e.target.value});
    }
    areaChange(e){
        this.setState({upload_area:e.target.value});
    }
    pointChange(e){
        this.setState({upload_point:e.target.value});
    }
    ider_repairChange(e){
        this.setState({upload_ider_repair:e.target.value});
    }
    car_nameChange(e){
        this.setState({upload_car_name:e.target.value});
    }
    six_hourChange(e){
        this.setState({upload_six_hour:e.target.value});
    }
    ten_hourChange(e){
        this.setState({upload_ten_hour:e.target.value});
    }
    twelve_hourChange(e){
        this.setState({upload_twelve_hour:e.target.value});
    }
    two_daysChange(e){
        this.setState({upload_two_days:e.target.value});
    }
    four_daysChange(e){
        this.setState({upload_four_days:e.target.value});
    }
    six_daysChange(e){
        this.setState({upload_six_days:e.target.value});
    }
    moreChange(e){
        this.setState({upload_more:e.target.value});
    }
    sortChange(e){
        this.setState({sort:e.target.value});
        this.submitCarImpormation();
    }

    //update
    setCarUpdate(opts){
        console.log("setCarUpadet color = ", this.state.color);
        fetch('/car_update', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result == "true"){
                alert("수정이 완료되었습니다.");
                this.submitCarImpormation();
                this.back_click();
            }else {
                alert("실패하였습니다, 다시 시도해주세요.");
            }
        }.bind(this))
    }

    submitUpdate(){
        console.log("submitUpdate color = ", this.state.color)
        this.setCarUpdate({
            id: this.state.id[this.state.division_number],
            car_number: this.state.upload_car_number,
            color: this.state.upload_color,
            car_type: this.state.upload_car_type,
            fuel: this.state.upload_fuel,
            few: this.state.upload_few,
            distance: this.state.upload_distance,
            area: this.state.upload_area,
            point: this.state.upload_point,
            ider_repair: this.state.upload_ider_repair,
            car_name: this.state.upload_car_name,
            six_hour: this.state.upload_six_hour,
            ten_hour: this.state.upload_ten_hour,
            twelve_hour: this.state.upload_twelve_hour,
            two_days: this.state.upload_two_days,
            four_days: this.state.upload_four_days,
            six_days: this.state.upload_six_days,
            more: this.state.upload_more
        })
    }
    update_check(){
        if(this.state.car_number=="" || this.state.color=="" || this.state.car_type=="" || this.state.fuel=="" || this.state.few=="" || this.state.distance=="" || this.state.area=="" || this.state.point=="" || this.state.ider_repair=="" || this.state.car_name=="" || this.state.six_hour=="" || this.state.ten_hour=="" || this.state.twelve_hour=="" || this.state.two_days=="" || this.state.four_days=="" || this.state.six_days=="" || this.state.more==""){
            alert("빠짐없이 다 입력해주세요.");
            return;
        }

        console.log("update_check color = ", this.state.color);

        this.submitUpdate();
    }
    
    //delete
    setCarDelete(opts){
        console.log("setCarUpadet color = ", this.state.color);
        fetch('/car_delete', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "id="+this.state.id[this.state.division_number]
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result == "true"){
                alert("삭제가 완료되었습니다.");
                this.submitCarImpormation();
                this.back_click();
            }else {
                alert("실패하였습니다, 다시 시도해주세요.");
            }
        }.bind(this))
    }

    click_delete(e){
        this.setState({division_number:e.target.id});

        this.setCarDelete();
    }

    render(){
        const noneStyle = {
            display: 'none',
        }
        const blockStyle = {
        }

        const impormation_number = [];
        for(let i=0; i < 5; i++){
            impormation_number.push(i);
        }
        
        //page
        const pageNumbers = [];
        for(let i = 1; i <= (Math.floor((this.state.total_page - 1) / 5)) + 1; i++){
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick.bind(this)}>
                    {number}
                </li>
            )
        })

        //list
        const impormation_car = impormation_number.map(number => {
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
                    <td>
                        <button id={number} onClick={this.car_impormation_click.bind(this)}> 수정 </button>
                    </td>
                    <td>
                        <button id={number} onClick={this.click_delete.bind(this)}> 삭제 </button>
                    </td>
                </tr>
            )
        })

        let car_impormation_Form = (
            <div>
                <div className="logo">
                    렌터카
                </div>
                <div className="menu">
                    <div className="menu-item" onClick={this.click_home.bind(this)}> 홈 </div>                                    
                    <div className="menu-item" onClick={this.insert_car_Change.bind(this)}> 신규 차량 등록 </div>
                    <div className="menu-item" onClick={this.back_click.bind(this)}> 차량 정보 관리 </div>
                    <div className="menu-item" onClick={this.mamber_impormation_Change.bind(this)}> 고객 정보 관리 </div>
                </div>
                <br />
                <input type="radio" name="radio" value="0" onChange={this.input_car_typeChange.bind(this)} checked={(this.state.input_car_type=='' || this.state.input_car_type=='0')?true:false}/>
                전체
                <input type="radio" name="radio" value="1" onChange={this.input_car_typeChange.bind(this)}/>
                소형
                <input type="radio" name="radio" value="2" onChange={this.input_car_typeChange.bind(this)}/>
                중형
                <input type="radio" name="radio" value="3" onChange={this.input_car_typeChange.bind(this)}/>
                대형
                <input type="radio" name="radio" value="4" onChange={this.input_car_typeChange.bind(this)}/>
                승합
                <br />
                <input type="radio" name="radio" value="5" onChange={this.input_car_typeChange.bind(this)}/>
                SUV/RV
                <input type="radio" name="radio" value="6" onChange={this.input_car_typeChange.bind(this)}/>
                수입차
                <input type="radio" name="radio" value="7" onChange={this.input_car_typeChange.bind(this)}/>
                오픈카
                <input type="radio" name="radio" value="8" onChange={this.input_car_typeChange.bind(this)}/>
                전기차
                <input type="radio" name="radio" value="9" onChange={this.input_car_typeChange.bind(this)}/>
                캐릭터카
                <br />
                <label>
                    정렬 방법
                </label>
                <select defaultValue={1} onChange={this.sortChange.bind(this)}>
                    <option value={1}> 등록된지 오래된 순 </option>
                    <option value={2}> 최근 등록된 순 </option>
                </select>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td width="230">
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
                                N인승
                            </td>
                        </tr>
                        {impormation_car}
                    </tbody>
                </table>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>
        )
        let update_car = (
            <div>
                <div className="logo">
                    렌터카
                </div>
                <div className="menu">
                    <div className="menu-item" onClick={this.click_home.bind(this)}> 홈 </div>                                    
                    <div className="menu-item" onClick={this.insert_car_Change.bind(this)}> 신규 차량 등록 </div>
                    <div className="menu-item"> 차량 정보 관리 </div>
                    <div className="menu-item" onClick={this.mamber_impormation_Change.bind(this)}> 고객 정보 관리 </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <img src={this.state.image[this.state.division_number]} width="500" height="380" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                차량 이름
                            </td>
                            <td>
                                <input type="text" defaultValue={this.state.upload_car_name} onChange={this.car_nameChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                자동차 번호
                            </td>
                            <td>
                                <input type="text" defaultValue={this.state.upload_car_number} onChange={this.car_numberChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                색상
                            </td>
                            <td>
                                <input type="text" defaultValue={this.state.upload_color} onChange={this.colorChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                자동차 유형
                            </td>
                            <td>
                                <select defaultValue={this.state.upload_car_type} onChange={this.car_typeChange.bind(this)}>
                                    <option value={1}> 소형 </option>
                                    <option value={2}> 중형 </option>
                                    <option value={3}> 대형 </option>
                                    <option value={4}> 승합 </option>
                                    <option value={5}> SUV/RV </option>
                                    <option value={6}> 수입차 </option>
                                    <option value={7}> 오픈카 </option>
                                    <option value={8}> 전기차 </option>
                                    <option value={9}> 캐릭터카 </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                연료
                            </td>
                            <td>
                                <input type="text" defaultValue={this.state.upload_fuel} onChange={this.fuelChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                N인승
                            </td>
                            <td>
                                <input type="number" defaultValue={this.state.upload_few} onChange={this.fewChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                주행거리
                            </td>
                            <td>
                                <input type="number" defaultValue={this.state.upload_distance} onChange={this.distanceChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                지역
                            </td>
                            <td>
                                <select defaultValue={this.state.upload_area} onChange={this.areaChange.bind(this)}>
                                    <option value="inland"> 내륙 </option>
                                    <option value="jeju"> 제주도 </option>
                                    <option value="overseas"> 해외 </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                지점
                            </td>
                            <td>
                                <select defaultValue={this.state.upload_point} onChange={this.pointChange.bind(this)}>
                                    <option value="Gangnam"> 강남 </option>
                                    <option value="DongDaeMoon"> 동대문 </option>
                                    <option value="Yeouido"> 여의도 </option>
                                    <option value="Guro"> 구로 </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                수리 중 여부
                            </td>
                            <td>
                                <select defaultValue={this.state.upload_ider_repair} onChange={this.ider_repairChange.bind(this)}>
                                    <option value={0}> 사용 가능 </option>
                                    <option value={1}> 수리 중 </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                6시간
                            </td>
                            <td>
                                <input type="number" defaultValue={this.state.upload_six_hour} onChange={this.six_hourChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                10시간
                            </td>
                            <td>
                                <input type="number" defaultValue={this.state.upload_ten_hour} onChange={this.ten_hourChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                12시간
                            </td>
                            <td>
                                <input type="number" defaultValue={this.state.upload_twelve_hour} onChange={this.twelve_hourChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                1~2일
                            </td>
                            <td>
                                <input type="number" defaultValue={this.state.upload_two_days} onChange={this.two_daysChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                3~4일
                            </td>
                            <td>
                                <input type="number" defaultValue={this.state.upload_four_days} onChange={this.four_daysChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                5~6일
                            </td>
                            <td>
                                <input type="number" defaultValue={this.state.upload_six_days} onChange={this.six_daysChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                7일 이상
                            </td>
                            <td>
                                <input type="number" defaultValue={this.state.upload_more} onChange={this.moreChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.update_check.bind(this)}> 수정 </button>
                                <button onClick={this.back_click.bind(this)}> 나가기 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

        if(this.state.returned == 1){
            return car_impormation_Form;
        } else if(this.state.returned == 2){
            return update_car;
        }
    }
}

export default VehicleInformation;