import React from 'react'
import ReactDOM from 'react-dom'
import cookie from "react-cookies"

import './Header.css'

class Member_feedback extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: '',
            currentPage: '',
            total_page: '',
            id: [],
            name: [],
            phone: [],
            division: [],
            category: [],
            title: [],
            contents: [],
            timestamp: [],
            division_number: 0,
            input_division:"",
            input_category:"",
            sort: '1',
            result:'',
            test_number:0,
        }
    }

    componentDidMount(){
        this.submitGit_FeedbackList();
    }

    setFeedbackList(opts){
        fetch('/member_feedback_list', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({id:[]});
            this.setState({name:[]});
            this.setState({email:[]});
            this.setState({phone:[]})
            this.setState({division:[]});
            this.setState({category:[]});
            this.setState({title:[]});
            this.setState({contents:[]});
            this.setState({timestamp:[]});

            for(var count=0; this.state.result[count] != null; count++){
                this.setState({id:this.state.id.concat(this.state.result[count]["id"])});
                this.setState({name:this.state.name.concat(this.state.result[count]["name"])});
                this.setState({email:this.state.email.concat(this.state.result[count]["email"])});
                this.setState({phone:this.state.phone.concat(this.state.result[count]["phone"])});
                this.setState({division:this.state.division.concat(this.state.result[count]["division"])});
                this.setState({category:this.state.category.concat(this.state.result[count]["category"])});
                this.setState({title:this.state.title.concat(this.state.result[count]["title"])});
                this.setState({contents:this.state.contents.concat(this.state.result[count]["contents"])});
                this.setState({timestamp:this.state.timestamp.concat(this.state.result[count]["timestamp"])});
                this.setState({total_page:this.state.result[0]["total_count"]});
            }
        }.bind(this))
        .then(function(){
            if(this.state.test_number==0){
                this.setState({test_number:1});
                this.submitGit_FeedbackList();
            }else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitGit_FeedbackList(){
        console.log("submit = division : ", this.state.division);
        this.setFeedbackList({
            email: cookie.load('email'),
            currentPage: this.state.currentPage,
            division: this.state.input_division,
            category: this.state.input_category,
            sort: this.state.sort
        })
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
    click_member_service(){
        this.setState({state_1:'ms'});
    }
    log_out(){
        cookie.remove('name', {path:'/'});
        cookie.remove('username', {path:'/'});
        cookie.remove('reserves', {path:'/'});
        cookie.remove('email', {path:'/'});
        window.location.reload();
    }
    division_numberChange(e){
        this.setState({division_number:e.target.id});
        console.log("division_number = ", e.target.id);
        this.setState({returned:2});
    }
    input_categoryChange(e){
        this.setState({input_category:e.target.value});
        this.submitGit_FeedbackList();
    }
    input_divisionChange(e){
        this.setState({input_division:e.target.value});
        this.submitGit_FeedbackList();
    }
    sortChange(e){
        this.setState({sort:e.target.value});
        this.submitGit_FeedbackList();
    }

    //page
    handleClick(e){
        this.setState({currentPage: e.target.id});
        this.submitGit_FeedbackList();
    }

    back_list(){
        this.setState({returned:''});
    }

    render(){
        //style
        const noneStyle = {
            display: 'none',
        }
        const blockStyle = {
        }

        //page_number
        const pageNumbers = [];
        for(let i = 1; i <= (Math.floor((this.state.total_page - 1) / 5)) + 1 ; i++){
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick.bind(this)}>
                    {number}
                </li>
            )
        })

        //list
        const impormation_number = [];
        for(let i = 0; i < 5; i++){
            impormation_number.push(i);
        }
        const impormation_feedback = impormation_number.map(number => {
            return(
                <tr key={number} id={number} style={this.state.title[number] == null? noneStyle : blockStyle}>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.id[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.title[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.name[number]} ({cookie.load('email')})
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.timestamp[number]}
                    </td>
                </tr>
            )
        })

        let show_feedback_list = (
            <div>
                <label> 구분 </label>
                <select onChange={this.input_divisionChange.bind(this)}>
                    <option value=""> 전체 </option>
                    <option value="차량"> 차량 </option>
                    <option value="사이트"> 사이트 </option>
                </select>
                <br />
                <label> 카테고리 </label>
                <select onChange={this.input_categoryChange.bind(this)}>
                    <option value=""> 전체 </option>
                    <option value="칭찬"> 칭찬 </option>
                    <option value="불만"> 불만 </option>
                </select>
                <br />
                <label> 정렬방법 </label>
                <select defaultValue={1} onChange={this.sortChange.bind(this)}>
                    <option value={1}> 등록된지 오래된 순 </option>
                    <option value={2}> 최근 등록된 순 </option>
                </select>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td width={100}>
                                번호
                            </td>
                            <td width={250}>
                                제목
                            </td>
                            <td width={150}>
                                이름 (이메일)
                            </td>
                            <td width={200}>
                                올린 날짜
                            </td>
                        </tr>
                        {impormation_feedback}
                    </tbody>
                </table>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>
        )

        let show_feedback_Form = (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                제목
                            </td>
                            <td>
                                {this.state.title[this.state.division_number]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                구분
                            </td>
                            <td>
                                {this.state.division[this.state.division_number]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                카테고리
                            </td>
                            <td>
                                {this.state.category[this.state.division_number]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                올린 날짜
                            </td>
                            <td>
                                {this.state.timestamp[this.state.division_number]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                내용
                            </td>
                            <td>
                                {this.state.contents[this.state.division_number]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.back_list.bind(this)}> 목록 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

        if(this.state.returned == 2){
            return show_feedback_Form;
        }
        else{
            return show_feedback_list;
        }
    }
}

export default Member_feedback;