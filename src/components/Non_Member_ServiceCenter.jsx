import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.js'

import './Header.css'

class Non_Member_ServiceCenter extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned:'',
            name: '',
            email: '',
            certification_number: '',
            input_certification_number: '',
            phone_0: "010",
            phone_1: '',
            phone_2: '',
            division: "차량",
            category: "칭찬",
            title: '',
            contents: '',
            result: '',
            divison: '',
        }
    }

    click_home(){
        this.setState({returned:'h'});
    }
    click_sign_up(){
        this.setState({returned:'s'});
    }
    click_sign_in(){
        this.setState({returned:'i'});
    }
    click_ImageTest(){
        this.setState({returned:'t'});
    }
    nameChange(e){
        this.setState({name:e.target.value});
    }
    emailChange(e){
        this.setState({email:e.target.value});
    }
    certification_numberChange(e){
        this.setState({input_certification_number:e.target.value});
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
    divisionChange(e){
        this.setState({division:e.target.value});
    }
    categoryChange(e){
        this.setState({category:e.target.value});
    }
    titleChange(e){
        this.setState({title:e.target.value});
    }
    contentsChange(e){
        this.setState({contents:e.target.value});
    }
    click_upload(){
        if(this.state.name=="" || this.state.email=="" || this.state.phone_0=="" || this.state.phone_1=="" || this.state.phone_2=="" || this.state.input_certification_number=="" || this.state.division=="" || this.state.category=="" || this.state.title=="" || this.state.contents==""){
            alert("빠짐없이 다 입력해주십시오");
            console.log(this.state.name+", "+this.state.email+", "+this.state.phone_0+", "+this.state.phone_1+", "+this.state.phone_2+", "+this.state.input_certification_number+", "+this.state.division+", "+this.state.category+", "+this.state.title+", "+this.state.contents);            
            return;
        }
        this.submitGit_email_certification();
    }

    //upload
    setUpload(opts){
        fetch('/upload_service_center', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result=="true"){
                console.log("업로드 성공");
                this.click_home();
            }
        }.bind(this))
    }

    submitGit_Upload(){
        this.setUpload({
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone_0+""+this.state.phone_1+""+this.state.phone_2,
            division: this.state.division,
            category: this.state.category,
            title: this.state.title,
            contents: this.state.contents
        })
    }

    //email
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
            email: this.state.email,
            certification_number: certification_number
        });
    }

    email_certification(opts){
        fetch('/email_certification', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result == "false"){
                alert("인증번호를 다시 한 번 확인해주시길 바랍니다.");
                return;
            }

            this.submitGit_Upload();
        }.bind(this))
    }
    submitGit_email_certification(){
        this.email_certification({
            email: this.state.email,
            certification_number: this.state.input_certification_number
        })
    }

    render(){
        let writing_Form = (
            <div>
                <div className="logo">
                    렌터카
                </div>
                <div className="menu">
                    <div className="menu-item"> 홈 </div>                                    
                    <div className="menu-item" onClick={this.click_sign_in.bind(this)}> 로그인 </div>
                    <div className="menu-item" onClick={this.click_sign_up.bind(this)}> 회원가입 </div>
                    <div className="menu-item" onClick={this.click_ImageTest.bind(this)}> 사진테스트 </div>
                    <div className="menu-item"> 고객 센터 </div>
                </div>
                <br />
                고객 정보
                <table>
                    <tbody>
                        <tr>
                            <td>
                                이름
                            </td>
                            <td>
                                <input type="text" onChange={this.nameChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                이메일
                            </td>
                            <td>
                                <input type="text" name="email" onChange={this.emailChange.bind(this)}/>
                                <button onClick={this.submitGit_email.bind(this)}> 인증번호 전송 </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                인증번호
                            </td>
                            <td>
                                <input type="number" onChange={this.certification_numberChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                전화번호
                            </td>
                            <td>
                                <select onChange={this.phone_0Change.bind(this)}>
                                    <option id="010" value="010">010</option>
                                    <option id="011" value="011">011</option>
                                    <option id="017" value="017">017</option>
                                </select>
                                &nbsp; - &nbsp;
                                <input type="number" max="9999" size="4" onChange={this.phone_1Change.bind(this)}/>
                                &nbsp; - &nbsp;
                                <input type="number" max="9999" size="4" onChange={this.phone_2Change.bind(this)}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                의견 작성
                <table>
                    <tbody>
                        <tr>
                            <td>
                                구분
                            </td>
                            <td>
                                <select onChange={this.divisionChange.bind(this)}>
                                    <option value="차량">차량</option>
                                    <option value="사이트">사이트</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                카테고리
                            </td>
                            <td>
                                <select onChange={this.categoryChange.bind(this)}>
                                    <option value="칭찬">칭찬</option>
                                    <option value="불만">불만</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                제목
                            </td>
                            <td>
                                <input type="text" onChange={this.titleChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                내용
                            </td>
                            <td>
                                <textarea rows={10} cols={35} onChange={this.contentsChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.click_upload.bind(this)}> 등록 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        
        let home_Form = (
            <div>
                <App />
            </div>
        )

        if(this.state.returned=='h'){
            return home_Form;
        }
        else{
            return writing_Form;
        }
    }
}

export default Non_Member_ServiceCenter;