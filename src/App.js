import React, { Component } from 'react';
import {Route, Switch, Redirect, history} from 'react-router-dom'
import Nav from './views/nav'
import Hot from './views/hot'
import Talking from './views/talking'
import User from './views/my'
import Logs from './views/logs'
import './static/less/app.less'
import axios from 'axios'
class App extends Component {
  constructor (props) {
    super(props)
    axios.interceptors.response.use(function (res) {
      if (res.data.code === 401) {
        return res
      } else {
        return res
      }
    })
  }
  
  render() {

    return (
      <div className="App">
        <Nav/>
        <div className='mainContent'>
          <Switch>
            <Route exact path='/hot' component={Hot}></Route>
            <Route path='/talking' component={Talking}></Route>
            <Route path='/account' component={User}></Route>
            <Route path='/logs' component={Logs}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
