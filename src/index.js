import React from 'react';
import ReactDOM from 'react-dom';

import { createBrowserHistory } from 'history';

import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';

import {
  IntlProvider,
  addLocaleData,
} from 'react-intl';

import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
} from 'redux';

import { Router } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import localeData from './locales/data.json';
import App from './App';
import Routes from './Routes';
import AppReducer from './reducers/';
import ConnectedIntlProvider from './modules/ConnectedIntlProvider';
import './index.css';

const history = createBrowserHistory();
const loggerMiddleware = createLogger();
const routerMiddleware = createRouterMiddleware(history);

const store = createStore(
  AppReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware, routerMiddleware),
);

/*
            <Switch>
            <Route path="/select" exact component={SelectPage} />
            </Switch>
<LocaleProvider locale={enUS} >
</LocaleProvider>
*/


ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <Router history={history} >
        <App>
          <Routes />
        </App>
      </Router>
    </ConnectedIntlProvider>
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
