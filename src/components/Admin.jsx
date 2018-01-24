import React from 'react';
import ReactDOM from 'react-dom'

import InsertionCar from './InsertionCar.jsx'

import './Header.css'

class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            returned:'main',
        }
    }

    insert_car_Change(){
        this.setState({returned:'insert_car'})
    }
    car_impormation_Change(){
        this.setState({returned:'car_impormation'});
    }
    mamber_impormation_Change(){
        this.setState({returned:'member_impormation'});
    }

    render(){
        let main_Form = (
            <div>
                <div className="logo">
                    렌터카
                </div>
                <div className="menu">
                    <div className="menu-item"> 홈 </div>                                    
                    <div className="menu-item" onClick={this.insert_car_Change.bind(this)}> 신규 차량 등록 </div>
                    <div className="menu-item" onClick={this.car_impormation_Change.bind(this)}> 차량 정보 관리 </div>
                    <div className="menu-item" onClick={this.mamber_impormation_Change.bind(this)}> 고객 정보 관리 </div>
                </div>
            </div>
        )
        let inser_car_Form = (
            <div>
                <InsertionCar />
            </div>
        )

        if(this.state.returned == 'main'){
            return main_Form;
        } else if(this.state.returned == 'insert_car'){
            return inser_car_Form;
        } else if(this.state.returned == 'car_impormation'){

        } else if(this.state.returned == 'member_impormation'){

        }
    }
}

export default Admin;