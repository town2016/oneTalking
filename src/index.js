import React from 'react';
import ReactDOM from 'react-dom';
import './static/less/index.less'
import App from './App';
import Register from './register';
import Login from './login';
import './config'
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware} from 'redux'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import thunk from 'redux-thunk' // 处理异步action
import reducers from './store/index.redux'
import { Provider } from 'react-redux'
import 'antd-mobile/dist/antd-mobile.css';
import { Modal } from 'antd-mobile'
const alert = Modal.alert
const store = createStore(reducers, applyMiddleware(thunk))
class Index extends React.Component {
  constructor () {
    super()
  }
  render () {
    const getConfirmation = (message,callback) => {
      alert('提示', message, [
        { text: '否', onPress: () => { callback(false) } },
        { text: '是', onPress: () => { callback(true) } },
      ])
    }
    return (
      <BrowserRouter getUserConfirmation={getConfirmation}>
        <div className="wrapper">
          <Switch>
            <Route exact path='/:name'  component={App}></Route>
            <Route path='/auth/register' component={Register}></Route>
            <Route path='/auth/login' component={Login}></Route>
            <Redirect to='/hot'></Redirect>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
ReactDOM.render(
  (<Provider store={store}>
    <Index/>
  </Provider>),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
