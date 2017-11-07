import { combineReducers } from 'redux';
import accountReducer from './accounts';
import settingsReducer from './settings';
import { accountModalReducer } from '../modules/AccountForm/ModalAccountForm/';

export default combineReducers({
  accountReducer,
  accountModalReducer,
  settingsReducer,
});
