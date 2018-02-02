import React from 'react'
import ReactDOM from 'react-dom'

import './Header.css'

class Total_Feedback_List extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: 1,
            currentPage: '',
            total_page: '',
            id:[],
            name:[],
            email:[],
            division:[],
            category:[],
            title:[],
            contents:[],
            timestamp:[],
            division_number:0,
            input_division:'',
            input_category:'',
            sort:'1',
            result:'',
            test_number:0,
            search_text: '',
            search_select: '1',
            searching: 0,
            admin: [],
            comment: [],
            comment_timestamp: '',
            comment_currentPage: '',
            comment_total_page: '',
            input_comment: '',
        }
    }

    componentDidMount(){
        this.submitGit_FeedbackList();
    }

    input_commentChange(e){
        this.setState({input_comment:e.target.value});
    }

    //list
    setFeedbackList(opts){
        fetch('/feedback_list', {
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
            this.setState({division:[]});
            this.setState({category:[]});
            this.setState({title:[]});
            this.setState({contents:[]});
            this.setState({timestamp:[]});        

            for(var count=0; this.state.result[count]!=null; count++){
                this.setState({id:this.state.id.concat(this.state.result[count]["id"])});
                this.setState({name:this.state.name.concat(this.state.result[count]["name"])});
                this.setState({email:this.state.email.concat(this.state.result[count]["email"])});
                this.setState({division:this.state.division.concat(this.state.result[count]["division"])});
                this.setState({category:this.state.category.concat(this.state.result[count]["category"])});
                this.setState({title:this.state.title.concat(this.state.result[count]["title"])});
                this.setState({contents:this.state.contents.concat(this.state.result[count]["contents"])});
                this.setState({timestamp:this.state.timestamp.concat(this.state.result[count]["timestamp"])});
                this.setState({total_page:this.state.result[0]["total_count"]});   
            }
        }.bind(this))
        .then(function(){
            if(this.state.test_number == 0){
                this.setState({test_number:1});
                this.submitGit_FeedbackList();
            }else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitGit_FeedbackList(){
        this.setFeedbackList({
            currentPage: this.state.currentPage,
            division: this.state.input_division,
            category: this.state.input_category,
            sort: this.state.sort
        })
    }

    //page 
    handleClick(e){
        this.setState({currentPage: e.target.id});
        if(this.state.searching == 0){
            this.submitGit_FeedbackList();
        } else {
            this.submitGit_Search();
        }
    }
    comment_handleClick(e){
        this.setState({comment_currentPage: e.target.id});
        this.submitGit_Contents();
    }

    input_categoryChange(e){
        this.setState({input_category:e.target.value});
        if(this.state.searching == 0){
            this.submitGit_FeedbackList();
        } else {
            this.submitGit_Search();
        }
    }
    input_divisionChange(e){
        this.setState({input_division:e.target.value});
        if(this.state.searching == 0){
            this.submitGit_FeedbackList();
        } else {
            this.submitGit_Search();
        }
    }
    sortChange(e){
        this.setState({sort:e.target.value});
        if(this.state.searching == 0){
            this.submitGit_FeedbackList();
        } else {
            this.submitGit_Search();
        }
    }
    division_numberChange(e){
        this.setState({division_number:e.target.id});
        this.setState({returned:2});
        this.submitGit_Contents();
    }
    search_selectChange(e){
        this.setState({search_select:e.target.value})
    }
    search_textChange(e){
        this.setState({search_text:e.target.value});
    }
    click_search_button(){
        this.setState({currentPage:''});

        if(this.state.search_text != ''){
            this.setState({searching: 1});
            this.submitGit_Search();
        } else {
            this.setState({searching: 0});
            this.submitGit_FeedbackList();
        }
    }

    //search
    setSearch(opts){
        fetch('/search_feedback_list', {
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
            this.setState({division:[]});
            this.setState({category:[]});
            this.setState({title:[]});
            this.setState({contents:[]});
            this.setState({timestamp:[]});        

            for(var count=0; this.state.result[count]!=null; count++){
                this.setState({id:this.state.id.concat(this.state.result[count]["id"])});
                this.setState({name:this.state.name.concat(this.state.result[count]["name"])});
                this.setState({email:this.state.email.concat(this.state.result[count]["email"])});
                this.setState({division:this.state.division.concat(this.state.result[count]["division"])});
                this.setState({category:this.state.category.concat(this.state.result[count]["category"])});
                this.setState({title:this.state.title.concat(this.state.result[count]["title"])});
                this.setState({contents:this.state.contents.concat(this.state.result[count]["contents"])});
                this.setState({timestamp:this.state.timestamp.concat(this.state.result[count]["timestamp"])});
                this.setState({total_page:this.state.result[0]["total_count"]});   
            }
        }.bind(this))
        .then(function(){
            if(this.state.test_number == 0){
                this.setState({test_number:1});
                this.submitGit_Search();
            }else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitGit_Search(){
        this.setSearch({
            currentPage: this.state.currentPage,
            division: this.state.input_division,
            category: this.state.input_category,
            sort: this.state.sort,
            search_text: this.state.search_text,
            search_select: this.state.search_select
        })
    }
    
    //contetns
    submitGit_Contents(){
        this.setContents({
            id: this.state.id[this.state.division_number],
            currentPage: this.state.comment_currentPage,
        })
    }
    setContents(opts){
        fetch('/feedback_list_comments', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({comment:[]});
            this.setState({admin:[]});        
            this.setState({comment_timestamp:[]});   

            for(var count=0; this.state.result[count]!=null; count++){
                this.setState({comment:this.state.comment.concat(this.state.result[count]["comment"])});
                this.setState({comment_timestamp:this.state.comment_timestamp.concat(this.state.result[count]["timestamp"])});
                this.setState({comment_total_page:this.state.result[0]["total_count"]});   
            
                if(this.state.result[count]["admin"] == 1){
                    this.setState({admin:this.state.admin.concat("관리자")});
                } else {
                    this.setState({admin:this.state.admin.concat("글쓴이")});
                }

                console.log("admin = ", this.state.admin);
            }
        }.bind(this))
        .then(function(){
            if(this.state.test_number == 0){
                this.setState({test_number:1});
                this.submitGit_Contents();
            }else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }

    backlist(){
        this.setState({returned:1});
    }
    
    //inser_comment
    submitGit_Insert_Comment(){
        this.setInsertComment({
            id: this.state.id[this.state.division_number],
            comment: this.state.input_comment,
        })
    }
    setInsertComment(opts){
        fetch('/admin_input_comment', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.submitGit_Contents();
        }.bind(this))
    }

    render(){
        //style
        const noneStyle = {
            display: 'none',
        }
        const blockStyle = {}

        //page_number
        const pageNumbers = [];

        for(let i = 1; i <= (Math.floor((this.state.total_page - 1) / 5)) + 1; i++){
            pageNumbers.push(i)
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick.bind(this)}>
                    {number}
                </li>
            )
        })

        //content_page
        const content_pageNumbers = [];
        
        for(let i = 1; i <= (Math.floor((this.state.comment_total_page - 1) / 5)) + 1; i++){
            content_pageNumbers.push(i)
        }
        
        const comment_renderPageNumbers = content_pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.comment_handleClick.bind(this)}>
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
                <tr key={number} id={number} style={this.state.title[number] == null? noneStyle : blockStyle} onClick={this.division_numberChange.bind(this)}>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.id[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.title[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.name[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.timestamp[number]}
                    </td>
                </tr>
            )
        })

        //comment_list
        const comment_impormation_number = [];
        for(let i = 0; i < 5; i++){
            comment_impormation_number.push(i);
        }

        const comment_feedback = comment_impormation_number.map(number => {
            return(
                <tr key={number} id={number}>
                    <th id={number}>
                        {this.state.admin[number]}
                    </th>
                    <td>
                        {this.state.comment[number]}
                    </td>
                </tr>
            )
        })

        let show_feedback_list = (
            <div>
                <div>
                    <label> 구분 </label>
                    <select onChange={this.input_divisionChange.bind(this)}>
                        <option value=""> 전체 </option>
                        <option value="차량"> 차량 </option>
                        <option value="사이트"> 사이트 </option>
                    </select>
                    <br />
                    <select onChange={this.input_categoryChange.bind(this)}>
                        <option value=""> 전체 </option> 
                        <option value="칭찬"> 칭찬 </option>
                        <option value="불만"> 불만 </option>
                    </select>
                    <br />
                    <select onChange={this.sortChange.bind(this)}>
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
                            <tr>
                                <th> </th>
                                <td> 
                                    <ul id="page-numbers">
                                        {renderPageNumbers}
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4}>   
                                    <select onChange={this.search_selectChange.bind(this)}>
                                        <option value={1}> 글 제목 </option>
                                        <option value={2}> 글 내용 </option>
                                    </select>
                                    &nbsp;
                                    <input type="text" onChange={this.search_textChange.bind(this)} />
                                    <button onClick={this.click_search_button.bind(this)}> 검색 </button>  
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )

        let feedback_Form = (
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
                                <button onClick={this.backlist.bind(this)}> 목록 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                글쓴이
                            </th>
                            <th>
                                댓글
                            </th>
                        </tr>
                        {comment_feedback}
                        <tr>
                            <th>
                                댓글
                            </th>
                            <td>
                                <textarea cols="20" rows="4" onChange={this.input_commentChange.bind(this)} />
                                <button onClick={this.submitGit_Insert_Comment.bind(this)}> 등록 </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ul id="page-numbers">
                                    {comment_renderPageNumbers}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

        if(this.state.returned==1){
            return show_feedback_list;
        }else if(this.state.returned==2){
            return feedback_Form;
        }
    }
}

export default Total_Feedback_List;