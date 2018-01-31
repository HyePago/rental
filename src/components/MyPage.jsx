import React from 'react'
import ReactDOM from 'react-dom'
import cookie from 'react-cookies'

import './Header.css'

class MyPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: 1,
        }
    }

    render(){
        let changing_impormation_Form = (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th> 이름 </th>
                            <td>
                                {cookie.load('name')}
                            </td>
                        </tr>
                        <tr>
                            <th> 아이디 </th>
                            <td>
                                {cookie.load('username')}
                            </td>
                        </tr>
                        <tr>
                            <th> 비밀번호 </th>
                            <td>
                                <button> 비밀번호 변경 </button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                이메일
                            </th>
                            <td>
                                {cookie.load('email')} &nbsp; <button>비밀번호 변경</button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                전화번호
                            </th>
                            <td>
                                <select defaultValue={cookie.load('phone').slice(0,4)}>
                                    <option id="010" value="010">010</option>
                                    <option id="011" value="011">011</option>
                                    <option id="017" value="017">017</option>
                                </select>
                                &nbsp;-&nbsp;
                                <input type="number" name="phone_1" max="9999" maxLength={4} size="4" defaultValue={cookie.load('phone').slice(4,8)}></input>
                                &nbsp;-&nbsp;
                                <input type="number" name="phone_2" max="9999" maxLength={4} size="4" defaultValue={cookie.load('phone').slice(8,12)}></input>
                            </td>
                        </tr>
                        <tr>
                            <th> 면허구분 </th>
                            <td>
                                <select defaultValue={cookie.load('license_category')}>
                                    <option id="1" value="1">1종대형</option>
                                    <option id="2" value="2">1종보통</option>
                                    <option id="3" value="3">2종보통</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th> 면허증 번호 </th>
                            <td>
                                <select defaultValue={cookie.load('license_number').slice(0,1)}>
                                    <option id="1" value="1">서울</option>
                                    <option id="2" value="2">11</option>
                                </select>
                                &nbsp;
                                <input type="text" size="2" maxLength={2} defaultValue={cookie.load('license_number').slice(1,3)}></input>
                                -
                                <input type="text" size="6" maxLength={6} defaultValue={cookie.load('license_number').slice(3,9)}></input>
                                -
                                <input type="text" size="2" maxLength={2} defaultValue={cookie.load('license_number').slice(9,11)}></input>
                            </td>
                        </tr>
                        <tr>
                            <th> 면허발급일자 </th>
                            <td>
                                <input type="date" defaultValue={cookie.load('date_if_issue')} />
                            </td>
                        </tr>
                        <tr>
                            <th> 적성검사 </th>
                            <td>
                                <input type="date" defaultValue={cookie.load('aptitude_test')} />
                            </td>
                        </tr>
                        <tr>
                            <th> </th>
                            <td >
                                <button> 수정 </button>
                                &nbsp;
                                &nbsp;
                                <button> 취소 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

        return changing_impormation_Form;
    }
}

export default MyPage;