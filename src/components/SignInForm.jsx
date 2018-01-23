import React from 'react'
import ReactDOM from 'react-dom'

import App from './App';

import cookie from "react-cookies"

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
            logined: 'f',
            license_category: '',
            license_type: '',
            license_number: '',
            date_if_issue: '',
            aptitude_test: ''
        }
    }

    //Cookie
    /*createCookie(name, value, days){
        if(days){
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";

        document.cookie = name+"="+value+expires+"; path=/";
    }

    readCookie(name){
        var nameEQ = name+"=";
        var ca = document.cookie.split(';');

        for(var i=0; i<ca.length; i++){
            var c = ca[i];

            for(var i=0; i<ca.length; i++){
                var c = ca[i];
                while(c.charAt(0)==' ') c = c.substring(1, c.length);
                if(c.indexOf(nameEQ)==0) return c.substring(nameEQ.length, c.length);
            }

            return "";
        }
    }*/

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

                this.setState({logined:'s'});
            }
        }.bind(this));
    }

    submitGit(){
        this.setSignIn({
            username: this.state.id,
            password: this.state.password
        });
    }

    render(){
        let login_Form = (
            <div>
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
        
        if(this.state.logined == 'f'){
            return login_Form;
        }else{
            return logined_Form;
        }
    }
}

module.exports = SignInForm;