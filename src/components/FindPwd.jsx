import React from 'react'
import ReactDOM from 'react-dom'

import cookie from "react-cookies"

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
        if(this.state.email==''){
            alert("이메일을 입력해주세요.");
            return;
        }

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
        if(this.state.name=='' || this.state.email=='' || this.state.input_certification_number=='' || this.state.id==''){
            alert("빠짐없이 다 입력해주세요.");
            return;
        }
        this.find_pwd({
            email:this.state.email,
            name:this.state.name,
            id:this.state.id,
            certification_number: this.state.input_certification_number,
        })
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
            alert("9자리 ~ 16자리 이내로 입력해주세요.")
            return false;
        }
        else if(blank_pattern.test(pw)==true){
        //else if(pw.search(/₩s/) != -1){
            alert("비밀번호는 공백없이 입력해주세요.")
            return false;
        }
        else if(num<0 || eng<0 || spe<0){
            alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
            return false;
        }
        else{
            return true;
        }
    }
    passwordChange(e){
        this.setState({password:e.target.value});
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
                document.location.href = "/";
            }else{
                alert("비밀 번호 변경에 실패하셨습니다. 다시 한 번 시도해주세요.");
                return;
            }
        }.bind(this))
    }
    changeThePwd(){
        if(this.state.password=='' || this.state.password_confirm==''){
            alert("빠짐없이 입력해주세요.")
            return;
        }
        if(!(this.chkPwd())){
            return;
        }
        else if(this.state.password != this.state.password_confirm){
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
                                <button type="button" onClick={this.submitGit_email.bind(this)}> 인증번호 전송 </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                인증번호
                            </td>
                            <td>    
                                <input type="number" placeholder="인증번호를 입력해주세요" onChange={this.input_certification_numberChange.bind(this)}/>
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
                <div>
                    <label>비밀번호 </label>
                    <input type="password" name="password" maxLength={16} size="16" onChange={this.passwordChange.bind(this)} placeholder="비밀번호를 입력해주세요"/>
                    &nbsp;&nbsp;<span>{this.state.password_feedback}</span>
                    <br/>
                    <label>비밀번호 확인 </label>
                    <input type="password" name="password_confirm" maxLength={16} size="16" onChange={this.password_confirmChange.bind(this)}placeholder="비밀번호를 입력해주세요"/>
                    <button type="button" onClick={this.changeThePwd.bind(this)}> 비밀번호 변경 </button>
                </div>
            </div>
        )

        if(this.state.returned == 1){
            return find_pwd_Form;
        }else if(this.state.returned == 2){
            return update_pwd_Form;
        }
    }
}

export default FindPwd