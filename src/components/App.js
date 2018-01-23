import React from 'react';
import ReactDOM from 'react-dom'
import cookie from "react-cookies"

import SendEmail from './SendEmail.jsx'
import SignUpForm from './SignUpForm.jsx'
import SignInForm from './SignInForm.jsx'
import Rent_1 from './Rent_1.jsx'
import ImageTest from './ImageTest.jsx'
import Reservation_history from './Reservation_history.jsx'

import './Header.css'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {state_1: null};
    }

    setEmail(email){
        fetch('/email', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'email='+email
        })
        .then((response) => { return response.json(); })
       // .then((json) => { this.setState({ email: json.user });});
    }

    click_sign_up(){
        this.setState({state_1:'s'});
    }
    click_sign_in(){
        this.setState({state_1:'i'});
    }
    click_rent(){
        this.setState({state_1:'r'});
    }
    click_ImageTest(){
        this.setState({state_1:'t'});
    }
    click_reservation(){
        this.setState({state_1:'e'});
    }

    log_out(){
        cookie.remove('name', {path:'/'});
        cookie.remove('username', {path:'/'});
        cookie.remove('reserves', {path:'/'});
        cookie.remove('email', {path:'/'});
        window.location.reload();
    }

    render(){
       //alert(cookie.load('name'));
       //cookie.remove('name', {path:'/'})
       let sign_up_Form = (
            <div>
                <SignUpForm 
                    placeholder="Input the id" />
            </div>
        )
        let sign_in_Form = (
            <div>
                <SignInForm />
            </div>
        )
        let list_Form = (
            <div>
                <div className="logo">
                    렌터카
                </div>
                <div className="menu">
                    <div className="menu-item"> 홈 </div>                                    
                    <div className="menu-item" onClick={this.click_sign_in.bind(this)}> 로그인 </div>
                    <div className="menu-item" onClick={this.click_sign_up.bind(this)}> 회원가입 </div>
                    <div className="menu-item" onClick={this.click_ImageTest.bind(this)}> 사진테스트 </div>
                </div>
            </div>
        )
        let user_Form = (
            <div>
                <div className="logo">
                    렌터카
                </div>
                <div className="menu">
                    <div className="menu-item"> 홈 </div>                                    
                    <div className="menu-item" onClick={this.click_rent.bind(this)}> 렌터카 예약 </div>
                    <div className="menu-item" onClick={this.log_out.bind(this)}> 로그아웃 </div>
                    <div className="menu-item" onClick={this.click_reservation.bind(this)}> 예약 및 이용내역 </div>
                </div>
            </div>
        )
        let rent_Form = (
            <div>
                <Rent_1 />
            </div>
        )
        let imagetest_Form = (
            <div>
                <ImageTest />
            </div>
        )
        let reservation_number_Form = (
            <div>
                <Reservation_history />
            </div>
        )
    
        if(this.state.state_1=='s'){
            //this.setState({state_1:''});
            return sign_up_Form;
        } 
        else if(this.state.state_1=='i'){
            return sign_in_Form;
        }
        else if(this.state.state_1=='r'){
            return rent_Form;
        }
        else if(this.state.state_1=='t'){
            return imagetest_Form;
        }
        else if(this.state.state_1=='e'){
            return reservation_number_Form;
        }
        else if(cookie.load('name')){
            return user_Form;
        }
        else{
            return list_Form;
        }

        return list_Form;
    }
}

ReactDOM.render(
    <h1>test</h1>,
    document.getElementById('root')
)

export default App;
