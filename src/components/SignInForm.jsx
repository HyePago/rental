import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import SignUpForm from './SignUpForm.jsx'
import ImageTest from './ImageTest.jsx'

import cookie from "react-cookies"

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
            aptitude_test: ''
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
                    aptitude_test:json.aptitude_test
                }); 
            })
        .then(function(){
            if(this.state.result == 0){
                alert("아이디 혹은 비밀번호를 다시 한번 확인해주세요.");
            }else if(this.state.result == 2){
                alert("로그인 실패 횟수가 5회를 달성하였습니다. 비밀번호찾기에서 비밀번호를 변경해주세요.");
            }else{
                alert("로그인에 성공하였습니다.");

                cookie.save('name', this.state.name, {path: '/'});
                cookie.save('username', this.state.username, {path: '/'});
                cookie.save('reserves', this.state.reserves, {path: '/'});
                cookie.save('email', this.state.email, {path: '/'});
                cookie.save('license_category', this.state.license_category, {path: '/'});
                cookie.save('license_type', this.state.license_type, {path: '/'});
                cookie.save('license_number', this.state.license_number, {path: '/'});
                cookie.save('date_if_issue', this.state.date_if_issue, {path: '/'});
                cookie.save('aptitude_test', this.state.aptitude_test, {path: '/'});

                this.setState({logined:"home"});
            }
        }.bind(this));
    }

    submitGit(){
        this.setSignIn({
            username: this.state.id,
            password: this.state.password
        });
    }

    click_sign_up(){
        this.setState({logined:"up"});
    }
    click_ImageTest(){
        this.setState({logined:"image"});
    }
    click_home(){
        this.setState({logined:"home"});
    }

    render(){
        let login_Form = (
            <div>
                <div className="logo">
                    렌터카
                </div>
                <div className="menu">
                    <div className="menu-item" onClick={this.click_home.bind(this)}> 홈 </div>                                    
                    <div className="menu-item"> 로그인 </div>
                    <div className="menu-item" onClick={this.click_sign_up.bind(this)}> 회원가입 </div>
                    <div className="menu-item" onClick={this.click_ImageTest.bind(this)}> 사진테스트 </div>
                </div>
                <p>
                    <label>아이디</label>
                    <input type="text" name="username" placeholder="id" onChange={this.idChange.bind(this)}></input>
                    <br />
                    <label>비밀번호</label>
                    <input type="password" name="password" placeholder="password" onChange={this.passwordChange.bind(this)}></input>
                    <br />
                    <button onClick={this.submitGit.bind(this)}>로그인</button>
                </p>
            </div>
        )

        let logined_Form = (
            <App />
        )
        let ImageTest_Form = (
            <ImageTest />
        )
        let sign_up_Form = (
            <SignUpForm />
        )
        
        if(this.state.logined == "in"){
            return login_Form;
        }else if(this.state.logined=="home"){
            return logined_Form;
        }else if(this.state.logined=="image"){
            return ImageTest_Form;
        }else {
            alert("회원가입은 대체 왜 안되는 걸까요?! ..ㅠㅜㅠㅠㅠ ")
            //return sign_up_Form;
            return sign_up_Form;
        }
    }
}

module.exports = SignInForm;