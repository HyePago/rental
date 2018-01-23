import React from 'react';
import ReactDOM from 'react-dom'
import cookie from "react-cookies"

import './Header.css';

import SignUpForm from './SignUpForm.jsx'
import SignInForm from './SignInForm.jsx'
import Rent_1 from './Rent_1.jsx'
import ImageTest from './ImageTest.jsx'
import App from './App';

var returned = 'home'

function move_home(){
    returned = 'home';
}

const Header = () => {
    let member_Form = (
        <div>
            <div className = "logo">
                렌터카
            </div>
            <div className="menu">
                <div className="menu-item"> 홈 </div>
                <div className="menu-item"> 렌터카 예약 </div>
                <div className="menu-item"> 로그아웃 </div>
                <div className="menu-item"> 사진테스트 </div>
            </div>
        </div>
    )

    let nonMember_Form = (
        <div>
            <div className = "logo">
                렌터카
            </div>
            <div className="menu">
                <div className="menu-item"> 홈 </div>
                <div className="menu-item"> 로그인 </div>
                <div className="menu-item"> 회원가입 </div>
                <div className="menu-item"> 사진테스트 </div>
            </div>
        </div>
    )

    if(cookie.load('name')){
        return member_Form;
    } else {
        return nonMember_Form;
    }
}

export default Header;