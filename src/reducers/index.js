import { combineReducers } from 'redux';
import accountReducer from './accounts';
import settingsReducer from './settings';
import quickPlayReducer from '../modules/QuickPlayProfile/duck-reducer';
import competitiveReducer from '../modules/CompetitiveProfile/duck-reducer';
import { accountModalReducer } from '../modules/AccountForm/ModalAccountForm/';

export default combineReducers({
  accountReducer,
  accountModalReducer,
  competitiveReducer,
  quickPlayReducer,
  settingsReducer,
});
