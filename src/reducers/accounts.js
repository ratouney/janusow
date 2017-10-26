import { message } from 'antd';
import _ from 'lodash';
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
  FETCH_COMPLETED,
  FETCH_CRASHED,
  FETCH_NONE,
  FETCH_STARTED,
} from '../utils/consts';
import DB from '../utils/DB/';

const initialState = {
  accountData:     [],
  isFetchingExist: false,
  isFetchingData:  false,
  searchStep:      0,
  searchError:     false,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
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

    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        searchStep:     4,
        searchError:    false,
      };

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
      if (!action.save) {
        message.warn(`User ${action.userData.username}#${action.userData.battletag} already exists`);
      } else {
        message.success(`User ${action.userData.username}#${action.userData.battletag} saved in list`);
      }
      return {
        ...state,
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
