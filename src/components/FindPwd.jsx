import React from 'react'
import ReactDOM from 'react-dom'

import cookie from "react-cookies"

import SignInForm from './SignInForm.jsx'
import ImageTest from './ImageTest.jsx'
import SignUpForm from './SignUpForm.jsx'

import './Header.css'

class FindPwd extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            returned: 1,
            name: '',
            input_certification_number: '',
            certification_number: '',
            email: '',
            result: '',
            id: '',
            password: '',
            password_confirm: '',
            password_feedback: '',
        }
    }

    emailAuthentication(opts){
        fetch('/email', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        //.then((json) => { this.setState({result:json.result}); })
    }
    submitGit_email(){
        var min = 100000;
        var max = 999999;
        var certification_number = parseInt(min + (Math.random() * (max-min)));
        
        this.setState({certification_number:certification_number});

        this.emailAuthentication({
            email:this.state.email,
            certification_number:certification_number
        });
    }

    find_pwd(opts){
        fetch('/find_pwd', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result == "email"){
                alert("인증번호를 확인해주세요.");
                return;
            }else if(this.state.result == "impormation"){
                alert("입력하신 회원정보를 다시 한 번 확인해주시길 바랍니다.");
                return;
            }else{
                this.setState({returned:2});
            }
        }.bind(this))
    }
    submitGit_find_pwd(){
        this.find_pwd({
            email:this.state.email,
            name:this.state.name,
            id:this.state.id,
            certification_number: this.state.input_certification_number,
        })
    }

    click_sign_up(){
        this.setState({returned:"up"});
    }
    click_sign_in(){
        this.setState({returned:"in"});
    }
    click_ImageTest(){
        this.setState({returned:"image"});
    }
    click_home(){
        window.location.reload();
    }

    emailChange(e){
        this.setState({email:e.target.value});
    }
    input_certification_numberChange(e){
        this.setState({input_certification_number:e.target.value});
    }
    nameChange(e){
        this.setState({name:e.target.value});
    }
    idChange(e){
        this.setState({id:e.target.value});
    }

    //password
    chkPwd(){
        var pw = this.state.password;
        var num = pw.search(/[0-9]/g);
        var eng = pw.search(/[a-z]/ig);
        var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
        var blank_pattern = /[\s]/g;

        if(pw.length<8 || pw.length>16){
            this.setState({password_feedback:"9자리 ~ 16자리 이내로 입력해주세요."});
            //alert("9자리 ~ 16자리 이내로 입력해주세요.")
        }
        else if(blank_pattern.test(pw)==true){
        //else if(pw.search(/₩s/) != -1){
            this.setState({password_feedback:"비밀번호는 공백없이 입력해주세요."});
            //alert("비밀번호는 공백없이 입력해주세요.")
        }
        else if(num<0 || eng<0 || spe<0){
            this.setState({password_feedback:"영문, 숫자, 특수문자를 혼합하여 입력해주세요."});
            //alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.")
        }
        else{
            this.setState({password_feedback:''});
        }
    }
    passwordChange(e){
        this.setState({password:e.target.value});
        this.chkPwd();
    }
    password_confirmChange(e){
        this.setState({password_confirm:e.target.value});
    }

    change_Pwd(opts){
        fetch('/change_pwd', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result, id:json.id}); })
        .then(function(){
            if(this.state.result == "true"){
                alert("비밀번호 변경에 성공하셨습니다.");
                this.click_home();
            }else{
                alert("비밀 번호 변경에 실패하셨습니다. 다시 한 번 시도해주세요.");
                return;
            }
        }.bind(this))
    }
    changeThePwd(){
        if(this.state.password_feedback!=''){        
            //if(this.state.password_feedback!='' || this.state.password_confirm_feedback!=''){
            alert("비밀번호 양식이 맞는 지 확인해주시길 바립니다.");
            return;
        }else if(this.state.password != this.state.password_confirm){
            alert("비밀번호와 비밀번호 확인이 일치하는 지 확인해주시길 바랍니다.");
            return;
        }

        this.change_Pwd({
            password:this.state.password,
            email:this.state.email
        })
    }

    render(){
        let find_pwd_Form = (
            <div>
                <div className="logo">
                    렌트카
                </div>
                <div className="menu">
                    <div className="menu-item" onClick={this.click_home.bind(this)}> 홈 </div>                                    
                    <div className="menu-item" onClick={this.click_sign_in.bind(this)}> 로그인 </div>
                    <div className="menu-item" onClick={this.click_sign_up.bind(this)}> 회원가입 </div>
                    <div className="menu-item" onClick={this.click_ImageTest.bind(this)}> 사진테스트 </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                이름
                            </td>
                            <td>
                                <input type="text" placeholder="이름을 입력해주세요" onChange={this.nameChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                이메일
                            </td>
                            <td>
                                <input type="text" placeholder="이메일을 입력해주세요." onChange={this.emailChange.bind(this)}/>
                            </td>
                            <td>
                                <button onClick={this.submitGit_email.bind(this)}> 인증번호 전송 </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                인증번호
                            </td>
                            <td>    
                                <input type="text" placeholder="인증번호를 입력해주세요" onChange={this.input_certification_numberChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                아이디
                            </td>
                            <td>
                                <input type="text" placeholder="아이디를 입력해주세요." onChange={this.idChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.submitGit_find_pwd.bind(this)}> 비밀번호 찾기 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        let update_pwd_Form = (
            <div>
                <div className="logo">
                    렌트카
                </div>
                <div className="menu">
                    <div className="menu-item" onClick={this.click_home.bind(this)}> 홈 </div>                                    
                    <div className="menu-item" onClick={this.click_sign_in.bind(this)}> 로그인 </div>
                    <div className="menu-item" onClick={this.click_sign_up.bind(this)}> 회원가입 </div>
                    <div className="menu-item" onClick={this.click_ImageTest.bind(this)}> 사진테스트 </div>
                </div>
                <div>
                    <label>비밀번호 </label>
                    <input type="password" name="password" maxLength={16} size="16" onChange={this.passwordChange.bind(this)} placeholder="비밀번호를 입력해주세요"/>
                    &nbsp;&nbsp;<span>{this.state.password_feedback}</span>
                    <br/>
                    <label>비밀번호 확인 </label>
                    <input type="password" name="password_confirm" maxLength={16} size="16" onChange={this.password_confirmChange.bind(this)}placeholder="비밀번호를 입력해주세요"/>
                    <button onClick={this.changeThePwd.bind(this)}> 비밀번호 변경 </button>
                </div>
            </div>
        )
        let sign_in_Form = (
            <div>
                <SignInForm />
            </div>
        )
        let sign_up_Form = (
            <div>
                <SignUpForm />
            </div>
        )
        let image_test_Form = (
            <div>
                <ImageTest />
            </div>
        )

        if(this.state.returned == 1){
            return find_pwd_Form;
        }else if(this.state.returned == 2){
            return update_pwd_Form;
        }else if(this.state.returned == "in"){
            return sign_in_Form;
        }else if(this.state.returned == "up"){
            return sign_up_Form;
        }else if(this.state.returned == "image"){
            return image_test_Form;
        }
    }
}

export default FindPwd