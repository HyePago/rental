import React from 'react'
import ReactDOM from 'react-dom'
import cookie from "react-cookies"

import App from './App'
import Rent_1 from './Rent_1.jsx'

import './Header.css'

class Reservation_history extends React.Component{
    constructor(props){
        super(props);
        this.handleLoad = this.handleLoad.bind(this);

        this.state = {
            image: [],
            car_number: [],
            car_type: [],
            car_name: [],
            fuel: [],
            color: [],
            distance: [],
            few: [],
            currentPage: '',
            count: '',
            returned: 'ready'
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.submitGit();
     }
    handleLoad(){
        this.submitGit();
    }
    handleClick(event){
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

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
            this.setState({iamge:[]})
            this.setState({car_number:[]})
            this.setState({car_name:[]})
            this.setState({fuel:[]})
            this.setState({color:[]})
            this.setState({distance:[]})
            this.setState({few:[]})

            for(var count = 0; this.state.result[count] != null; count++){
                this.setState({image:this.state.image.concat(this.state.result[count]["image"])});
                this.setState({car_number:this.state.car_number.concat(this.state.result[count]["car_number"])});
                this.setState({car_name:this.state.car_name.concat(this.state.result[count]["car_name"])});
                this.setState({fuel:this.state.fuel.concat(this.state.result[count]["fuel"])});
                this.setState({color:this.state.color.concat(this.state.result[count]["color"])});
                this.setState({distance:this.state.distance.concat(this.state.result[count]["distance"])});
                this.setState({few:this.state.few.concat(this.state.result[count]["few"])});
            }
            this.setState({count:count});

            console.log("reservation history count : ", count)
        }.bind(this))
    }

    submitGit(){
        this.list_reservation({
            email: cookie.load('email'),
            currentPage: this.state.currentPage
        })
    }

    click_home(){
        this.setState({returned:'home'});
    }    
    click_rent(){
        this.setState({returned:'rent'});
    }
    log_out(){
        cookie.remove('name', {path:'/'});
        cookie.remove('username', {path:'/'});
        cookie.remove('reserves', {path:'/'});
        cookie.remove('email', {path:'/'});
        window.location.reload();
    }

    render(){
        const pageNumbers = [];
        for (let i = 1; i <= (Math.floor(this.state.count / 5))+1; i++){
            pageNumbers.push(i);
            console.log("pagenumber push : ", i, " | count : ", this.state.count);
        }

        const renderPageNUmbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick} onClick={this.submitGit.bind(this)}>
                    {number}
                </li>
            );
        });

        const noneStyle = {
            display: 'none',
        }
        const blockStyle = {

        }

        let reservation_history_form = (
            <div>
                <div className="logo" onClick={this.click_home.bind(this)}>
                    렌터카
                </div>
                <div className="menu">
                    <div className="menu-item" onClick={this.click_home.bind(this)}> 홈 </div>
                    <div className="menu-item" onClick={this.click_rent.bind(this)}> 렌터카 예약 </div>
                    <div className="menu-item" onClick={this.log_out.bind(this)}> 로그아웃 </div>
                    <div className="menu-item"> 예약 및 이용 내역 </div>
                </div>

                <table>
                    <tbody>
                        <tr style={this.state.image[0]==null?noneStyle:blockStyle}>
                            <td>
                                이미지
                            </td>
                            <td>
                                차량 번호
                            </td>
                            <td>
                                차량 이름
                            </td>
                            <td>
                                차량 유형
                            </td>
                            <td>
                                연료
                            </td>
                            <td>
                                색상
                            </td>
                            <td>
                                주행거리
                            </td>
                            <td>
                                n인승
                            </td>
                        </tr>
                        <tr style={this.state.image[0]==null?noneStyle:blockStyle}>
                            <td>
                                <img src={this.state.image[0]} width="230" height="130"/>
                            </td>
                            <td>
                                {this.state.car_number[0]}
                            </td>
                            <td>
                                {this.state.car_name[0]}
                            </td>
                            <td>
                                {this.state.car_type[0]}
                            </td>
                            <td>
                                {this.state.fuel[0]}
                            </td>
                            <td>
                                {this.state.color[0]}
                            </td>
                            <td>
                                {this.state.distance[0]}
                            </td>
                            <td>
                                {this.state.few[0]}
                            </td>
                        </tr>
                        <tr style={this.state.image[1]==null?noneStyle:blockStyle}>
                            <td>
                                <img src={this.state.image[1]} width="230" height="130"/>
                            </td>
                            <td>
                                {this.state.car_number[1]}
                            </td>
                            <td>
                                {this.state.car_name[1]}
                            </td>
                            <td>
                                {this.state.car_type[1]}
                            </td>
                            <td>
                                {this.state.fuel[1]}
                            </td>
                            <td>
                                {this.state.color[1]}
                            </td>
                            <td>
                                {this.state.distance[1]}
                            </td>
                            <td>
                                {this.state.few[1]}
                            </td>
                        </tr>
                        <tr style={this.state.image[2]==null?noneStyle:blockStyle}>
                            <td>
                                <img src={this.state.image[2]} width="230" height="130"/>
                            </td>
                            <td>
                                {this.state.car_number[2]}
                            </td>
                            <td>
                                {this.state.car_name[2]}
                            </td>
                            <td>
                                {this.state.car_type[2]}
                            </td>
                            <td>
                                {this.state.fuel[2]}
                            </td>
                            <td>
                                {this.state.color[2]}
                            </td>
                            <td>
                                {this.state.distance[2]}
                            </td>
                            <td>
                                {this.state.few[2]}
                            </td>
                        </tr>
                        <tr style={this.state.image[3]==null?noneStyle:blockStyle}>
                            <td>
                                <img src={this.state.image[3]} width="230" height="130"/>
                            </td>
                            <td>
                                {this.state.car_number[3]}
                            </td>
                            <td>
                                {this.state.car_name[3]}
                            </td>
                            <td>
                                {this.state.car_type[3]}
                            </td>
                            <td>
                                {this.state.fuel[3]}
                            </td>
                            <td>
                                {this.state.color[3]}
                            </td>
                            <td>
                                {this.state.distance[3]}
                            </td>
                            <td>
                                {this.state.few[3]}
                            </td>
                        </tr>
                        <tr style={this.state.image[4]==null?noneStyle:blockStyle}>
                            <td>
                                <img src={this.state.image[4]} width="230" height="130"/>
                            </td>
                            <td>
                                {this.state.car_number[4]}
                            </td>
                            <td>
                                {this.state.car_name[4]}
                            </td>
                            <td>
                                {this.state.car_type[4]}
                            </td>
                            <td>
                                {this.state.fuel[4]}
                            </td>
                            <td>
                                {this.state.color[4]}
                            </td>
                            <td>
                                {this.state.distance[4]}
                            </td>
                            <td>
                                {this.state.few[4]}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ul id="page-numbers">
                    {renderPageNUmbers}
                </ul>
            </div>
        )

        if(this.state.returned=="ready"){
            this.setState.returned="reservation"            
            return reservation_history_form;
        }else{
            return reservation_history_form;
        }
    }
}

module.exports = Reservation_history;