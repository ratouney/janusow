import { combineReducers } from 'redux';
import { accountModalReducer } from '../modules/AccountForm/ModalAccountForm/';
import accountReducer from './accounts';
import competitiveReducer from '../modules/CompetitiveProfile/duck-reducer';
import dashboardReducer from './dashboard';
import groupReducer from './groups';
import quickPlayReducer from '../modules/QuickPlayProfile/duck-reducer';
import settingsReducer from './settings';

export default combineReducers({
  accountModalReducer,
  accountReducer,
  competitiveReducer,
  dashboardReducer,
  groupReducer,
  quickPlayReducer,
  settingsReducer,
});
