import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Nav from './views/nav'
import Hot from './views/hot'
import Talking from './views/talking'
import User from './views/user'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav/>
          <div className='mainContent'>
            <Route exact path='/' redirect ='/hot' component={Hot}></Route>
            <Route exact path='/hot' component={Hot}></Route>
            <Route path='/talking' component={Talking}></Route>
            <Route path='/account' component={User}></Route>
          </div>
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
