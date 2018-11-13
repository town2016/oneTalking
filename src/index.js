import React from 'react';
import ReactDOM from 'react-dom';
import './static/less/index.less'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk' // 处理异步action
import reducers from './store/index.redux'
import { Provider } from 'react-redux'
const store = createStore(reducers, applyMiddleware(thunk))
ReactDOM.render(
  (<Provider store={store}>
    <App/>
  </Provider>),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
