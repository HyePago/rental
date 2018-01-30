import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'

class Main extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let main_Form = (
            <div>
                <table className="main_out_table">
                    <tbody>
                        <tr>
                            <td> 이미지 1 </td>
                            <td> 이미지 2 </td>
                            <td align="right"> <Login /> </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        )

        return main_Form;
    }
}

export default Main;