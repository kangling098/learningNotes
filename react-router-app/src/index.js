import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route} from 'react-router-dom';
import Home from './components/Home.js';
import User from './components/User.js';
import Profile from './components/Profile.js';

class App extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <React.Fragment>
                <Router>
                    <div>
                        <Route exact path="/" component={Home} /> 
                        <Route exact path="/user" component={User} /> 
                        <Route exact path="/profile" component={Profile} /> 
                    </div>
                </Router>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App />,window.root)