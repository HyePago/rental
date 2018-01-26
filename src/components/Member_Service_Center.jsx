import React from 'react'
import ReactDOM from 'react-dom'
import cookie from "react-cookies"

import './Header.css'

class Member_Service_Center extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: '',
            division: "차량",
            category: "칭찬",
            title: '',
            contents: '',
            result: '',
        }
    }

    click_home(){
        window.location.reload();
    }
    click_rent(){
        this.setState({state_1:'r'});
    }
    click_reservation(){
        this.setState({state_1:'e'});
    }
    log_out(){
        cookie.remove('name', {path:'/'});
        cookie.remove('username', {path:'/'});
        cookie.remove('reserves', {path:'/'});
        cookie.remove('email', {path:'/'});
        window.location.reload();
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

    //uplaod
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
            division: this.state.division,
            category: this.state.category,
            title: this.state.title,
            contents: this.state.contents,
            email: cookie.load('email'),
            name: cookie.load('name'),
            phone: cookie.load('phone')
        });
    }

    click_upload(){
        if(this.state.division=="" || this.state.category=="" || this.state.title=="" || this.state.contents==""){
            alert("빠짐없이 다 입력해주세요.");
            return;
        }
        
        this.submitGit_Upload();
    }

    render(){
        let writing_Form = (
            <div>
                <div className="logo">
                    렌터카
                </div>
                <div className="menu">
                    <div className="menu-item" onClick={this.click_home.bind(this)}> 홈 </div>                                    
                    <div className="menu-item" onClick={this.click_rent.bind(this)}> 렌터카 예약 </div>
                    <div className="menu-item" onClick={this.log_out.bind(this)}> 로그아웃 </div>
                    <div className="menu-item" onClick={this.click_reservation.bind(this)}> 예약 및 이용내역 </div>
                    <div className="menu-item"> 고객 센터 </div>
                </div>
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

        return writing_Form;
    }
}

export default Member_Service_Center;