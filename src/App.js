import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import Nav from './views/nav'
import Hot from './views/hot'
import Talking from './views/talking'
import User from './views/my'
import Logs from './views/logs'
import './static/less/app.less'
import axios from 'axios'
class App extends Component {
  
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
@withRouter
class PrivateRoute extends Component{
  constructor ({ component: Component, ...rest }) {
    super()
    var sessionId = ''
    return (
      <Route
        {...rest}
        render={props =>
          sessionId? (
            <Component {...props} />
          ) : (
            this.props.history.replace('/auth/login')
          )
        }
      />
    );
  }
}

export default App;
