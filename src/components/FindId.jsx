import React from 'react'
import ReactDOM from 'react-dom'
import cookie from "react-cookies"

import './Header.css'

class FindId extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            returned: '',
            email: '',
            certification_number: '',
            input_certification_number: '',
            name: '',
            id: '',
            result: 'ming',
            returned: 1
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

    find_id(opts){
        fetch('/find_id', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result, id:json.id}); })
        .then(function(){
            console.log("result = ", this.state.result);
            console.log("id = ", this.state.id);

            if(this.state.result == "email"){
                alert("인증번호를 확인해주세요.");
                return;
            }else if(this.state.result == "impormation"){
                alert("없는 회원 정보입니다.");
                return;
            }else{
                this.setState({returned:2});
            }
        }.bind(this))
    }
    submitGit_find_id(){
        this.find_id({
            email:this.state.email,
            certification_number:this.state.input_certification_number,
            name:this.state.name,
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

    render(){
        let find_id_Form = (
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
                                <button onClick={this.submitGit_find_id.bind(this)}> 아이디 찾기 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        let show_id = (
            <div>
                회원님의 아이디 : {this.state.id}
            </div>
        )

        if(this.state.returned == 1){
            return find_id_Form;
        }else if(this.state.returned == 2){
            return show_id;
        }
    }
}

export default FindId;