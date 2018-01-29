import React from 'react'
import ReactDOM from 'react-dom'
import cookie from "react-cookies"

import { Link } from 'react-router-dom'

import Header from './Header.js'
import FindId from './FindId.jsx'
import FindPwd from './FindPwd.jsx'

import './Header.css'

class SignInForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            result: '',
            name: '',
            username: '',
            reserves: '',
            email: '',
            id: '',
            password: '',
            logined: 'in',
            license_category: '',
            license_type: '',
            license_number: '',
            date_if_issue: '',
            aptitude_test: '',
            phone: '',
        }
    }

    idChange(e){
        this.setState({id:e.target.value});
    }
    passwordChange(e){
        this.setState({password:e.target.value});
    }

    setSignIn(opts){
        fetch('/sign_in', {
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
                    result:json.result, 
                    name:json.name, 
                    username:json.username, 
                    reserves:json.reserves, 
                    email:json.email,
                    license_category:json.license_category,
                    license_type:json.license_type,
                    license_number:json.license_number,
                    date_if_issue:json.date_if_issue,
                    aptitude_test:json.aptitude_test,
                    phone:json.phone,
                }); 
            })
        .then(function(){
            console.log("reuslt = > ", this.state.result);

            if(this.state.result == 0){
                alert("아이디 혹은 비밀번호를 다시 한번 확인해주세요.");
            }else if(this.state.result == 2){
                alert("로그인 실패 횟수가 5회를 달성하였습니다. 비밀번호찾기에서 비밀번호를 변경해주세요.");
            }else if(this.state.result == 5){
                this.setState({logined:"admin"});
            }else{
                alert("로그인에 성공하였습니다.");

                cookie.save('name', this.state.name, {path: '/'});
                cookie.save('username', this.state.username, {path: '/'});
                cookie.save('reserves', this.state.reserves, {path: '/'});
                cookie.save('email', this.state.email, {path: '/'});
                cookie.save('phone', this.state.phone, {path: '/'});
                cookie.save('license_category', this.state.license_category, {path: '/'});
                cookie.save('license_type', this.state.license_type, {path: '/'});
                cookie.save('license_number', this.state.license_number, {path: '/'});
                cookie.save('date_if_issue', this.state.date_if_issue, {path: '/'});
                cookie.save('aptitude_test', this.state.aptitude_test, {path: '/'});

                window.location.reload();
            }
        }.bind(this));
    }

    submitGit(){
        this.setSignIn({
            username: this.state.id,
            password: this.state.password
        });
    }

    click_findId(){
        this.setState({logined:"find_id"});
    }
    click_findPwd(){
        this.setState({logined:"find_pwd"});
    }

    render(){
        let login_Form = (
            <div>
                <form className="signIn" id="signinForm">
                    <input type="text" className="signInInput" placeholder="username" autoFocus required onChange={this.idChange.bind(this)} />
                    <input type="password" className="signInInput" placeholder="password" required onChange={this.passwordChange.bind(this)}/>
                    <button className="signInButton" onClick={this.submitGit.bind(this)}> Log In </button>
                    <div className="signIn_extra_service">
                        <Link to="/api/v1/find_id"><div className="signIn_extra_service_content"> 아이디 찾기 </div></Link>
                        &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                        <Link to="/api/vi/find_password"><div className="signIn_extra_service_content"> 비밀번호 찾기 </div></Link>
                    </div>
                </form>
            </div>
        )

        let find_id_Form = (
            <div>
                <FindId />
            </div>
        )
        let find_pwd_Form = (
            <div>
                <FindPwd />
            </div>
        )
        
        if(this.state.logined=="find_id"){
            return find_id_Form;
        }else if(this.state.logined=="find_pwd"){
            return find_pwd_Form;
        }else {
            return login_Form;
        }
    }
}

export default SignInForm;