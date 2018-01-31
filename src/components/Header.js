import React from 'react';
import ReactDOM from 'react-dom'
import cookie from "react-cookies"
import { Link } from 'react-router-dom'

import './Header.css';

class Header extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            returned: '',
        }
    }

    log_out(){
        cookie.remove('name', {path:'/'});
        cookie.remove('username', {path:'/'});
        cookie.remove('reserves', {path:'/'});
        cookie.remove('email', {path:'/'});

        document.location.href = "/";
    }

    render(){
        let member_top_Form = (
            <div>
                <div className="menu">
                    <Link to="/"><div className="logo"> 로고 </div></Link>
                    <Link to="/reservation_member"><div className="menu-item"> 예약 및 이용 내역 </div> </Link>
                    <div className="menu-item" onClick={this.log_out.bind(this)}> 로그아웃 </div>
                    <Link to="/search_rent"><div className="menu-item"> 렌터카 예약 </div></Link>
                    <div className="dropdown-menu-item"> 
                            고객센터
                        <div className="dropdown-content">
                            <div> 내 의견 보기 </div>
                            <div> 의견 보내기 </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        let non_member_top_Form = (
            <div>
                <div className="menu">
                    <Link to="/"><div className="logo"> 로고 </div></Link>
                    <Link to="/reservation_non_member"><div className="menu-item"> 예약 및 이용내역 </div></Link>
                    <Link to="/signin"> <div className="menu-item"> 로그인 </div> </Link>
                    <Link to="/signup"> <div className="menu-item"> 회원가입 </div> </Link>
                    <div className="dropdown-menu-item"> 
                            고객센터
                        <div className="dropdown-content">
                            <div> 내 의견 보기 </div>
                            <div> 의견 보내기 </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        if(cookie.load('name')){
            return member_top_Form;
        } else {
            return non_member_top_Form;
        }
    }
}

export default Header;