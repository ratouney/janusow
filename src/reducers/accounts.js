import {
  ADD_NEW_USER_FAILURE,
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  FETCH_FULL_DATA_REQUEST,
  FETCH_FULL_DATA_SUCCESS,
  FETCH_FULL_DATA_FAILURE,
} from '../modules/SelectUser/types';
import { message } from 'antd';

const initialState = {
  accountData: [],
  isFetching:  false,
  hasFound:    false,
  hasLoaded:   false,
};

function getBtag(username, btag) {
  return `${username}#${btag}`;
}

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FULL_DATA_REQUEST:
      return {
        ...state,
        hasFound:   false,
        hasLoaded:  false,
        isFetching: true,
      };

    case FETCH_FULL_DATA_SUCCESS: {
      const {
        accountData,
      } = state;

      const fulltag = getBtag(action.data.name, action.btag);
      accountData.push({ ...action.data, fullname: fulltag, key: fulltag });

      message.success(`User ${fulltag} successfully loaded`);
      return {
        ...state,
        accountData,
        hasFound:   true,
        hasLoaded:  true,
        isFetching: false,
      };
    }

    case FETCH_FULL_DATA_FAILURE:
      message.error(action.error.toString());
      return {
        ...state,
        hasFound:   true,
        hasLoaded:  false,
        isFetching: false,
      };

    case ADD_NEW_USER_FAILURE:
      message.error(action.error.toString());
      return {
        ...state,
        hasFound:   false,
        isFetching: false,
      };

    case ADD_NEW_USER_REQUEST:
      return {
        ...state,
        hasFound:   false,
        isFetching: true,
      };

    case ADD_NEW_USER_SUCCESS:
      return {
        ...state,
        hasFound:   true,
        isFetching: false,
      };

    default:
      return state;
  }
}

export default accountReducer;
