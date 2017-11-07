import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { Router, Route, Switch } from 'react-router-dom';
import {
  IntlProvider,
} from 'react-intl';
import { LocaleProvider } from 'antd';
import { createBrowserHistory } from 'history';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import AppReducer from './reducers/';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SelectPage from './pages/Select/';
import Homepage from './pages/Home/';
import NotFound from './pages/NotFound';
import AccountDisplay from './pages/Account/';
import Settings from './pages/Settings/';

const history = createBrowserHistory();
const loggerMiddleware = createLogger();
const routerMiddleware = createRouterMiddleware(history);

const store = createStore(
  AppReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware, routerMiddleware),
);

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider >
      <IntlProvider >
        <Router history={history} >
          <App>
            <Switch>
              <Route path="/select" exact component={SelectPage} />
              <Route path="/account/:id" exact component={AccountDisplay} />
              <Route path="/settings" exact component={Settings} />
              <Route path="/" exact component={Homepage} />
              <Route component={NotFound} />
            </Switch>
          </App>
        </Router>
      </IntlProvider>
    </LocaleProvider>
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
