import { message } from 'antd';
import { isEmpty } from 'lodash';
import {
  FETCH_USER_DATA_FAILURE,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_EXIST_FAILURE,
  FETCH_USER_EXIST_REQUEST,
  FETCH_USER_EXIST_SUCCESS,
  RESET_SEARCH_STEPS,
  FETCH_ERROR_STEP,
} from '../modules/SelectUser/types';
import {
  REMOVE_USER,
} from '../modules/AccountList/types';
import {
  EDIT_USER,
} from '../modules/AccountForm/types';
import {
  OPEN as ACCOUNT_MODAL_OPEN,
} from '../modules/AccountForm/ModalAccountForm/reducer';

import DB from '../utils/DB/';

const fulltagGen = (userData) => {
  if (userData.platform === 'pc') {
    return `${userData.username}#${userData.battletag}`;
  }
  return userData.username;
};

const accountsFromLocalStorage = () => {
  return DB.get('users')
    .value();
};

const accountListFromLocalStorage = accountsFromLocalStorage()
  .map((elem) => {
    return { ...elem, loaded: false, key: fulltagGen(elem) };
  });

const initialState = {
  accountData:     [],
  accountList:     accountListFromLocalStorage,
  errors:          [],
  isFetchingExist: false,
  isFetchingData:  false,
  searchStep:      0,
  searchError:     false,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_MODAL_OPEN: {
      return {
        ...state,
        errors: [],
      };
    }

    case EDIT_USER: {
      if (!action.valid) {
        return {
          ...state,
          errors: [...state.errors, `${fulltagGen(action.current)} already exists in the saved accounts`],
        };
      }

      DB.get('users')
        .find({
          username:  action.initial.username,
          battletag: action.initial.battletag,
          platform:  action.initial.platform,
        })
        .assign({ ...action.initial, ...action.current })
        .write();

      const newAccountData = state.accountData.filter((elem) => {
        return elem.fullname !== fulltagGen(action.initial);
      });

      const newAccountList = state.accountList.map((elem) => {
        return elem.username === action.initial.username &&
        elem.battletag === action.initial.battletag &&
          elem.platform === action.initial.platform
          ? { ...elem, ...action.current, key: fulltagGen(action.current) }
          : elem;
      });

      return {
        ...state,
        accountData: newAccountData,
        accountList: newAccountList,
      };
    }

    case REMOVE_USER: {
      const {
        userData,
      } = action;

      DB.get('users')
        .remove({ username: action.userData.username, battletag: action.userData.battletag })
        .write();

      const newAccountList = state.accountList.filter((elem) => {
        return !(elem.username === userData.username &&
          elem.battletag === userData.battletag &&
          elem.platform === userData.platform);
      });

      const newAccountData = state.accountData.filter((elem) => {
        return elem.fullname !== fulltagGen(userData);
      });

      return {
        ...state,
        accountData: newAccountData,
        accountList: newAccountList,
      };
    }

    case FETCH_ERROR_STEP:
      return {
        ...state,
        searchStep:  action.step,
        searchError: true,
      };

    case RESET_SEARCH_STEPS:
      if (!state.isFetchingData && !state.isFetchingExist) {
        return {
          ...state,
          searchError: false,
          searchStep:  0,
        };
      } return state;

    case FETCH_USER_DATA_REQUEST:
      return {
        ...state,
        isFetchingData: true,
        searchStep:     3,
        searchError:    false,
      };

    case FETCH_USER_DATA_SUCCESS: {
      const currentTag = fulltagGen(action.userData);
      const accountData = [...state.accountData, { ...action.data, fullname: fulltagGen(action.userData) }];
      const accountList = state.accountList.map((elem) => {
        if (fulltagGen(elem) === currentTag) {
          return { ...elem, loaded: true, icon: action.data.icon };
        } return elem;
      });
      const val = DB.get('users')
        .find({ ...action.userData })
        .assign({ icon: action.data.icon })
        .write();

      const fd = DB.get('users')
        .find({ username: action.userData.username, battletag: action.userData.battletag })
        .assign({ icon: action.data.icon })
        .value();

      return {
        ...state,
        accountData,
        accountList,
        isFetchingData: false,
        searchStep:     4,
        searchError:    false,
      };
    }

    case FETCH_USER_DATA_FAILURE:
      return {
        ...state,
        isFetchingData: false,
        searchStep:     4,
        searchError:    true,
      };

    case FETCH_USER_EXIST_REQUEST:
      return {
        ...state,
        isFetchingExist: true,
        searchStep:      1,
        searchError:     false,
      };

    case FETCH_USER_EXIST_SUCCESS: {
      const { accountList } = state;

      if (!action.save) {
        message.warn(`User ${action.userData.username}#${action.userData.battletag} already exists`);
      } else {
        message.success(`User ${action.userData.username}#${action.userData.battletag} saved in list`);
        accountList.push({ ...action.userData, loaded: false });
      }
      return {
        ...state,
        accountList,
        isFetchingExist: false,
        searchStep:      2,
        searchError:     false,
      };
    }

    case FETCH_USER_EXIST_FAILURE:
      return {
        ...state,
        isFetchingExist: false,
        searchStep:      2,
        searchError:     true,
      };

    default:
      return state;
  }
}

export default accountReducer;
