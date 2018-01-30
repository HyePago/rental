import React from 'react';
import ReactDOM from 'react-dom'
import cookie from "react-cookies"
import { Link } from 'react-router-dom'

import Reservation_history from './Reservation_history.jsx'
import Rent_1 from './Rent_1.jsx'
import Member_Service_Center from './Member_Service_Center.jsx'
import Member_feedback from './Member_feedback.jsx'
import Non_Member_ServiceCenter from './Non_Member_ServiceCenter.jsx'
import Non_Member_feedback from './Non_Member_feedback.jsx'
import SignUpForm from './SignUpForm.jsx'
import SignInForm from './SignInForm.jsx'

import './Header.css';

class Header extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            returned: '',
        }
    }

    click_member_reservation(){
        this.setState({returned: 'reservation'});
    }
    click_rent(){
        this.setState({returned:'rent'});
    }
    click_member_service_center(){
        this.setState({returned:'ms'});
    }
    click_member_feedback(){
        this.setState({returned:'mf'});
    }
    log_out(){
        cookie.remove('name', {path:'/'});
        cookie.remove('username', {path:'/'});
        cookie.remove('reserves', {path:'/'});
        cookie.remove('email', {path:'/'});

        document.location.href = "/";
    }
    click_nonmember_service_center(){
        this.setState({returned:'ns'});
    }
    click_nonmember_feedback(){
        this.setState({returned:'nf'});
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
                            <div onClick={this.click_member_service_center.bind(this)}> 내 의견 보기 </div>
                            <div onClick={this.click_member_feedback.bind(this)}> 의견 보내기 </div>
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
                            <div onClick={this.click_nonmember_feedback.bind(this)}> 내 의견 보기 </div>
                            <div onClick={this.click_nonmember_service_center.bind(this)}> 의견 보내기 </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        let Reservation_history_Form = (
            <Reservation_history />
        )
        let Rent_Form = (
            <Rent_1 />
        )
        let Member_Service_Center_Form = (
            <Member_Service_Center />
        )
        let Member_Feedback_Form = (
            <Member_feedback />
        )
        let NonMember_Service_Center_Form = (
            <Non_Member_ServiceCenter />
        )
        let NonMember_Feedback_Form = (
            <Non_Member_feedback />
        )

        if(this.state.returned == 'reservation'){
            return Reservation_history_Form;
        } else if(this.state.returned == 'rent'){
            return Rent_Form;
        } else if(this.state.returned == 'ms'){
            return Member_Service_Center_Form;
        } else if(this.state.returned == 'mf'){
            return Member_Feedback_Form;
        } else if(this.state.returned == 'ns'){
            return NonMember_Service_Center_Form;
        } else if(this.state.returned == 'nf'){
            return NonMember_Feedback_Form;
        } else if(this.state.returned == 'none'){
            return;
        }else if(cookie.load('name')){
            return member_top_Form;
        } else {
            return non_member_top_Form;
        }

        // if(cookie.load('name')) { 
        //     if(this.state.returned == 'reservation'){
        //         return Reservation_history_Form;
        //     } else if(this.state.returned == 'rent'){
        //         return Rent_Form;
        //     } else if(this.state.returned == 'ms'){
        //         return Member_Service_Center_Form;
        //     } else if(this.state.returned == 'mf'){
        //         return Member_Feedback_Form;
        //     } else {
        //         return member_top_Form;
        //     }
        // } else {
        //     if(this.state.returned == 'si'){
        //         return Sign_In_Form;
        //     } else if(this.state.returned == 'su'){
        //         return Sign_Up_Form;
        //     } else if(this.state.returned == 'ns'){
        //         return NonMember_Service_Center_Form;
        //     } else if(this.state.returned == 'nf'){
        //         return NonMember_Feedback_Form;
        //     } else {
        //         return non_member_top_Form;
        //     }
        // }
    }
}

export default Header;