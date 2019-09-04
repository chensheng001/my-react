import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Redirect, Switch} from './react-router-dom';
import Home from "./components/Home";
import Profile from "./components/Profile";
import User from "./components/User";
import 'bootstrap/dist/css/bootstrap.css'

export default class App extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Router>
        <div>
          <div className="navbar navbar-inverse">
            <div className='container-fluid'>
              <div className='navbar-heading'>
                <div className='navbar-brand'>hello</div>
              </div>
              <div className='nav navbar-nav'>
                <li><Link to={'/home'}>首页</Link></li>
                <li><Link to={'/profile'}>个人中心</Link></li>
                <li><Link to={'/user'}>用户</Link></li>
              </div>
            </div>

          </div>
          <div className='route'>
            <Route path='/home' exact component={Home} ></Route>
            <Route path='/home/123' component={Home} ></Route>
            <Route path='/profile' component={Profile} ></Route>
            <Route path='/user' component={User} ></Route>
            <Redirect to={'/home'} />
          </div>
        </div>
      </Router>
    )
  }

}
ReactDOM.render(<App/>, window.root)
