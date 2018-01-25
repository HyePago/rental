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
            returned: '',
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
            count: 0,
            test_number: 0,
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
        })
    }

    //page
    handleClick(e){
        console.log("currentPage : ", e.target.id)
        this.setState({currentPage: e.target.id});

        this.submitCarImpormation();
    }

    //change
    click_home(){
        this.setState({returned:'home'});
    }  
    insert_car_Change(){
        this.setState({returned:'insert_car'})
    }
    mamber_impormation_Change(){
        this.setState({returned:'member_impormation'});
    }
    car_typeChange(e){
        this.setState({input_car_type:e.target.value});
        this.submitCarImpormation();
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
                <tr key={number} style={this.state.image[number] == null ? noneStyle : blockStyle}>
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
                    <div className="menu-item"> 차량 정보 관리 </div>
                    <div className="menu-item" onClick={this.mamber_impormation_Change.bind(this)}> 고객 정보 관리 </div>
                </div>
                <br />
                <input type="radio" name="radio" value="0" onChange={this.car_typeChange.bind(this)} checked={(this.state.input_car_type=='' || this.state.input_car_type=='0')?true:false}/>
                전체
                <input type="radio" name="radio" value="1" onChange={this.car_typeChange.bind(this)}/>
                소형
                <input type="radio" name="radio" value="2" onChange={this.car_typeChange.bind(this)}/>
                중형
                <input type="radio" name="radio" value="3" onChange={this.car_typeChange.bind(this)}/>
                대형
                <input type="radio" name="radio" value="4" onChange={this.car_typeChange.bind(this)}/>
                승합
                <br />
                <input type="radio" name="radio" value="5" onChange={this.car_typeChange.bind(this)}/>
                SUV/RV
                <input type="radio" name="radio" value="6" onChange={this.car_typeChange.bind(this)}/>
                수입차
                <input type="radio" name="radio" value="7" onChange={this.car_typeChange.bind(this)}/>
                오픈카
                <input type="radio" name="radio" value="8" onChange={this.car_typeChange.bind(this)}/>
                전기차
                <input type="radio" name="radio" value="9" onChange={this.car_typeChange.bind(this)}/>
                캐릭터카
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

        return car_impormation_Form;
    }
}

export default VehicleInformation;