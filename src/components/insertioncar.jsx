import React from 'react';
import ReactDOM from 'react-dom'

import './Header.css'

class InsertionCar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            returned:'',
            formdata:'',
            car_number: '',
            color: '',
            car_type: 1,
            fuel: '',
            few: '',
            distance: '',
            area: 'inland',
            point: 'Gangnam',
            name: '',
            six_hour: '',
            ten_hour: '',
            twelve_hour: '',
            two_days: '',
            four_days: '',
            six_days: '',
            more: '',
            car_priceid: '',
            url: '',
            result: '',
            image: '',
        };
    }

    home_impormation_Change(){
        this.setState({returned:'home'});
    }
    car_impormation_Change(){
        this.setState({returned:'car_impormation'});
    }
    mamber_impormation_Change(){
        this.setState({returned:'member_impormation'});
    }
    fileChange(e){
        var formData  = new FormData();
        var data = e.currentTarget.files;

        for(var name in data) {
            formData.append(name, data[name]);
            console.log(name + ", " + e.currentTarget.files[name]);
        }

        this.setState({formdata:formData});
    }
    car_numberChange(e){
        this.setState({car_number:e.target.value});
    }
    colorChange(e){
        this.setState({color:e.target.value});
    }
    car_typeChange(e){
        this.setState({car_type:e.target.value});
    }
    fuelChange(e){
        this.setState({fuel:e.target.value});
    }
    fewChange(e){
        this.setState({few:e.target.value});
    }
    distanceChange(e){
        this.setState({distance:e.target.value});
    }
    areaChange(e){
        this.setState({area:e.target.value});
    }
    pointChange(e){
        this.setState({point:e.target.value});
    }
    nameChange(e){
        this.setState({name:e.target.value});
    }
    six_hourChange(e){
        this.setState({six_hour:e.target.value});
    }
    ten_hourChange(e){
        this.setState({ten_hour:e.target.value});
    }
    twelve_hourChange(e){
        this.setState({twelve_hour:e.target.value});
    }
    two_daysChange(e){
        this.setState({two_days:e.target.value});
    }
    four_daysChange(e){
        this.setState({four_days:e.target.value});
    }
    six_daysChange(e){
        this.setState({six_days:e.target.value});
    }
    moreChange(e){
        this.setState({more:e.target.value});
    }

    AddCheck(){
        if(this.state.formdata=="" || this.state.car_number=="" || this.state.color=="" || this.state.car_type=="" || this.state.fuel=="" || this.state.few=="" || this.state.distance=="" || this.state.area=="" || this.state.point=="" || this.state.name==""){
            alert("빠짐없이 다 입력해주세요. ");
            return;
        }

        this.setImageUpload();
    }

    setCarUpload(opts){
        fetch('/upload_carprice', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { 
            this.setState(
                {
                    car_priceid:json.id
                }); 
            })
        .then(function(){
            if(this.state.car_priceid == "" || this.state.car_priceid == null){
                alert("등록에 실패하였습니다. 다시 시도해주세요.");
                return;
            }

            console.log("car price image : ", this.state.image);

            this.setCarPriceUpload({
                image: this.state.image,
                car_number: this.state.car_number,
                color: this.state.color,
                type: this.state.car_type,
                fuel: this.state.fuel,
                few: this.state.few,
                distance: this.state.distance,
                area: this.state.area,
                point: this.state.point,
                car_priceid: this.state.car_priceid,
                name: this.state.name
            })
        }.bind(this))
    }

    setCarPriceUpload(opts){
        fetch('/upload_car', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { 
            this.setState(
                {
                    car_priceid:json.id
                }); 
            })
        .then(function(){
            if(this.state.result=="false"){
                alert("등록에 실패하였습니다. 다시 시도해주세요.");
                return;
            }

            this.home_impormation_Change();
        }.bind(this))
    }

    setImageUpload(){
        var PATH = "http://localhost:5000/public/upload_image/";        

        console.log("formdate => ", this.state.formdate);

        fetch('/upload_image', {
            method: 'POST',
            body: this.state.formdata
        })
        .then((response) => {return response.json(); })
        .then((json) => { this.setState({image: json.url}); })
        .then(function(){
            this.setCarUpload({
                six_hour: this.state.six_hour,
                ten_hour: this.state.ten_hour,
                twelve_hour: this.state.twelve_hour,
                two_days: this.state.two_days,
                four_days: this.state.four_days,
                six_days: this.state.six_days,
                more: this.state.more
            })
        }.bind(this))
    }

    render(){
        let inser_car_Form = (
            <div>
                <div>
                    <div className="logo">
                        렌터카
                    </div>
                    <div className="menu">
                        <div className="menu-item" onClick={this.home_impormation_Change.bind(this)}> 홈 </div>                                    
                        <div className="menu-item"> 신규 차량 등록 </div>
                        <div className="menu-item" onClick={this.car_impormation_Change.bind(this)}> 차량 정보 관리 </div>
                        <div className="menu-item" onClick={this.mamber_impormation_Change.bind(this)}> 고객 정보 관리 </div>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                이미지
                            </td>
                            <td>
                                <input type="file" onChange={this.fileChange.bind(this)} name="uploadfile" />
                                <input type="hidden" name="token" value="{{.}}"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                차량 번호
                            </td>
                            <td>
                                <input type="text" onChange={this.car_numberChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                차량 이름
                            </td>
                            <td>
                                <input type="text" onChange={this.nameChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                차량 색상
                            </td>
                            <td>
                                <input type="text" onChange={this.colorChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                유형
                            </td>
                            <td>
                                <select onChange={this.car_typeChange.bind(this)}>
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
                                <input type="text" onChange={this.fuelChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                N인승
                            </td>
                            <td>
                                <input type="number" onChange={this.fewChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                주행거리
                            </td>
                            <td>
                                <input type="number" onChange={this.distanceChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                지역
                            </td>
                            <td>
                                <select onChange={this.areaChange.bind(this)}>
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
                                <select onChange={this.pointChange.bind(this)}>
                                    <option value="Gangnam"> 강남 </option>
                                    <option value="DongDaeMoon"> 동대문 </option>
                                    <option value="Yeouido"> 여의도 </option>
                                    <option value="Guro"> 구로 </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                6시간
                            </td>
                            <td>
                                <input type="number" onChange={this.six_hourChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                10시간
                            </td>
                            <td>
                                <input type="number" onChange={this.ten_hourChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                12시간
                            </td>
                            <td>
                                <input type="number" onChange={this.twelve_hourChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                1~2일
                            </td>
                            <td>
                                <input type="number" onChange={this.two_daysChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                3~4일
                            </td>
                            <td>
                                <input type="number" onChange={this.four_daysChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                5~6일
                            </td>
                            <td>
                                <input type="number" onChange={this.six_daysChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                7일 이상
                            </td>
                            <td>
                                <input type="number" onChange={this.moreChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.AddCheck.bind(this)}> 차량 등록 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>                
            </div>
        )


        return inser_car_Form;
    }
}

export default InsertionCar;