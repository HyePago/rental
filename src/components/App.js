import React from 'react';
import ReactDOM from 'react-dom';
//import { Link, Switch } from 'react-router'
// import { Switch, Route } from 'react-router-dom'
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header.js'
import SignInForm from './SignInForm.jsx'
import SignUpForm from './SignUpForm.jsx'
import FindId from './FindId.jsx'
import FindPwd from './FindPwd.jsx'
import Non_Member_reservation from './Non_Member_reservation.jsx'
import history from './history';

class App extends React.Component {

    render(){
        let Main_Form = (
            <div>
                <Header />
                <div>
                    <main>
                        <Switch>
                            <Route exact path='/' />
                            <Route path='/signin' component={SignInForm} />
                            <Route path='/signup' component={SignUpForm} />
                            <Route path='/find_id' component={FindId} />
                            <Route path='/find_password' component={FindPwd} />
                            <Route path='/reservation_non_member' component={Non_Member_reservation} />
                        </Switch>   
                    </main>
                </div>
            </div>
        )

        return Main_Form;
    }
}

// const App = () => {
//     let Main_Form = (
//         <div>
//             <Header />
//             {this.props.children}
//         </div>
//     )

//     return Main_Form;
// }

export default App;
