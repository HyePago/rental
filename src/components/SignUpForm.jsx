import React from 'react'
import ReactDOM from 'react-dom'

import SignInForm from './SignInForm.jsx'
import App from './App';

class SignUpForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            username: '',
            username_ch: '',
            password: '',
            password_feedback: '',
            password_confirm: '',
            password_confirm_feedback: '',
            email: '',
            phone_0: '010',
            phone_1: '',
            phone_2: '',
            license_category: '1',
            license_type: '1',
            license_number_0: '1',
            license_number_1: '',
            license_number_2: '',
            license_number_3: '',
            date_if_issue: '',
            aptitude_test: '',
            result: '',
            signed: 'f'
        };
    }

    setSignUp(opts){
        fetch('/sign_up', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result == true){
                alert("회원가입에 성공하였습니다.");
                this.setState({signed:'s'});
            }else{
                alert("만들어놓은 아이디가 있는지 확인해주시길 바랍니다.");
            }
        }.bind(this));
       // .then((json) => { this.setState({ email: json.user });});
    }

    submitGit(){
        this.setSignUp({
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone_0+""+this.state.phone_1+""+this.state.phone_2,
            license_category: this.state.license_category,
            license_type: this.state.license_type,
            license_number: this.state.license_number_0+""+this.state.license_number_1+""+this.state.license_number_2+""+this.state.license_number_3,
            date_if_issue: this.state.date_if_issue,
            aptitude_test: this.state.aptitude_test
        });
    }


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

    chkConfirmPwd(){
        if(this.state.password != this.state.password_confirm){
            this.setState({password_confirm_feedback: "비밀번호와 일치하지않습니다."});
        }
        else{
            this.setState({password_confirm_feedback: ''});
        }
    }

    nameChange(e){
        this.setState({name:e.target.value});
    }
    usernameChange(e){
        this.setState({username:e.target.value});
    }
    passwordChange(e){
        this.setState({password:e.target.value});
        this.chkPwd();
    }
    password_confirmChange(e){
        this.setState({password_confirm:e.target.value});
        this.chkConfirmPwd();        
    }
    emailChange(e){
        this.setState({email:e.target.value});
    }
    phone_0Change(e){
        this.setState({phone_0:e.target.value});
    }
    phone_1Change(e){
        this.setState({phone_1:e.target.value});
    }
    phone_2Change(e){
        this.setState({phone_2:e.target.value});
    }
    license_categoryChange(e){
        this.setState({license_category:e.target.value});
    }
    license_typeChange(e){
        this.setState({license_type: e.target.value});
    }
    license_number_0Change(e){
        this.setState({license_number_0: e.target.value})
    }
    license_number_1Change(e){
        this.setState({license_number_1: e.target.value});
    }
    license_number_2Change(e){
        this.setState({license_number_2: e.target.value});
    }
    license_number_3Change(e){
        this.setState({license_number_3: e.target.value});
    }
    date_if_issueChange(e){
        var date_if = e.target.value;
        date_if = date_if.replace(/\-/g,'');
        this.setState({date_if_issue:date_if});
    }
    aptitude_testChange(e){
        var date_if = e.target.value;
        date_if = date_if.replace(/\-/g,'');
        this.setState({aptitude_test:date_if});
    }

   /* maxLengthCheck(object){
        if(object.value.length>object.maxLength){
            object.value=object.value.slice(0, object.max.length);
        }
    }*/

    idOverlap(username){
        if(this.state.username.length<4 || this.state.username.length>15){
            alert("아이디를 5자리 ~ 15자리 이내로 입력해주세요.")
        }
        else{
            fetch('/id_overlap', {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'username='+this.state.username
            })
            .then((response) => { return response.json(); })
            .then((json) => { this.setState({username_ch:json.users}); })
            .then(function(){
                if(this.state.username_ch == 116){
                    alert("사용 가능한 아이디입니다.");
                }
                else{
                    alert("이미 사용중인 아이디입니다, 다른 아이디를 입력해주십시오.");
                }
            }.bind(this));
        }
    }

    SignUpCheck(){
        if(this.state.username.length<4 || this.state.username.length>15){
            alert("아이디를 5자리 ~ 15자리 이내로 입력해주세요.")
            return;
        }
        else{
            fetch('/id_overlap', {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'username='+this.state.username
            })
            .then((response) => { return response.json(); })
            .then((json) => { this.setState({username_ch:json.users}); })
            .then(function(){
                if(this.state.username_ch == 116){
                }
                else{
                    alert("이미 사용중인 아이디입니다, 다른 아이디를 입력해주십시오.");
                    return;                    
                }
            }.bind(this));
        }
        this.chkPwd();
        if(this.state.password_feedback!=''){        
        //if(this.state.password_feedback!='' || this.state.password_confirm_feedback!=''){
            alert("비밀번호를 다시 한 번 확인해주십시오.");
            return;
        }
        
        if(this.state.name=="" || this.state.username=="" || this.state.password=="" || this.state.password_confirm=="" || this.state.email=="" || this.state.phone_1=="" || this.state.phone_2=="" || this.state.license_number_1=="" || this.state.license_number_2=="" || this.state.license_number_3==""){
            alert("빠짐없이 다 입력해주십시오.");
            return;
        }

        this.submitGit();
    }

    render(){
        let sign_up_Form = (
            <div>
                <p>
                    <label>이름 </label>
                    <input type="text" name="name" placeholder="이름을 입력해주십시오" onChange={this.nameChange.bind(this)}/>
                    <br/>
                    <label>아이디 </label>
                    <input type="text" name="id" onChange={this.usernameChange.bind(this)} size="15" placeholder={this.props.placeholder} maxLength={15}/>
                    <button onClick={this.idOverlap.bind(this)}>아이디 중복 확인</button>
                    <br/>
                    <label>비밀번호 </label>
                    <input type="password" name="password" maxLength={16} size="16" onChange={this.passwordChange.bind(this)} placeholder="비밀번호를 입력해주세요"/>
                    &nbsp;&nbsp;<span>{this.state.password_feedback}</span>
                    <br/>
                    <label>비밀번호 확인 </label>
                    <input type="password" name="password_confirm" maxLength={16} size="16" onChange={this.password_confirmChange.bind(this)}placeholder="비밀번호를 입력해주세요"/>
                    &nbsp;&nbsp;<span>{this.state.password_confirm_feedback}</span>
                    <br />
                    <label>이메일 </label>
                    <input type="text" name="email" onChange={this.emailChange.bind(this)} placeholder="예) hyejin@gmail.com"/>
                    <br />
                    <label>전화번호 </label>
                    <select onChange={this.phone_0Change.bind(this)}>
                        <option id="010" value="010">010</option>
                        <option id="011" value="011">011</option>
                        <option id="017" value="017">017</option>
                    </select>
                    &nbsp;-&nbsp;
                    <input type="number" onChange={this.phone_1Change.bind(this)} name="phone_1" max="9999" maxLength={4} size="4"></input>
                    &nbsp;-&nbsp;
                    <input type="number" onChange={this.phone_2Change.bind(this)} name="phone_2" max="9999" maxLength={4} size="4"></input>
                    <br />
                    <label>면허구분</label>
                    <select onChange={this.license_categoryChange.bind(this)}>
                        <option id="1" value="1">국내</option>
                        <option id="2" value="2">국외</option>
                    </select>
                    <br />
                    <label>면허 종류</label>
                    <select onChange={this.license_typeChange.bind(this)}>
                        <option id="1" value="1">1종대형</option>
                        <option id="2" value="2">1종보통</option>
                        <option id="3" value="3">2종보통</option>
                    </select>
                    <br />
                    <label>면허증 번호</label>
                    <select onChange={this.license_number_0Change.bind(this)}>
                        <option id="1" value="1">서울</option>
                        <option id="2" value="2">11</option>
                    </select>
                    &nbsp;
                    <input type="text" size="2" maxLength={2} onChange={this.license_number_1Change.bind(this)}></input>
                    -
                    <input type="text" size="6" maxLength={6} onChange={this.license_number_2Change.bind(this)}></input>
                    -
                    <input type="text" size="2" maxLength={2} onChange={this.license_number_3Change.bind(this)}></input>
                    <br />
                    <label>면허발급일자</label>
                    <input type="date" onChange={this.date_if_issueChange.bind(this)}></input>
                    <br />
                    <label>적성검사</label>
                    <input type="date" onChange={this.aptitude_testChange.bind(this)}></input>
                    <br /><br />
                    <button onClick={this.SignUpCheck.bind(this)}>회원가입</button>
                </p>
            </div>
        )

        let sign_up_finish_Form = (
            <SignInForm />
        )

        if(this.state.signed == 'f'){
            return sign_up_Form;
        }else{
            return sign_up_finish_Form;
        }

    }
}

module.exports = SignUpForm;