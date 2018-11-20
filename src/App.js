import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Nav from './views/nav'
import Hot from './views/hot'
import Talking from './views/talking'
import User from './views/my'

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
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
