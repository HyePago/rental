import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import { Switch, Route } from 'react-router-dom'

import Header from './Header.js'
import SignInForm from './SignInForm.jsx'
import SignUpForm from './SignUpForm.jsx'
import FindId from './FindId.jsx'
import FindPwd from './FindPwd.jsx'

class App extends React.Component {

    render(){
        let Main_Form = (
            <div>
                <Header />
                <div>
                    <main>
                        <Switch>
                            <Route exact path='/' />
                            <Route path='/api/v1/signin' component={SignInForm} />
                            <Route path='/api/v1/signup' component={SignUpForm} />
                            <Route path='/api/v1/find_id' component={FindId} />
                            <Route path='api/vi/find_password' component={FindPwd} />
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
