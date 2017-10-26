import { message } from 'antd';
import _ from 'lodash';
import {
  ADD_NEW_USER_FAILURE,
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  FETCH_FULL_DATA_REQUEST,
  FETCH_FULL_DATA_SUCCESS,
  FETCH_FULL_DATA_FAILURE,
} from '../modules/SelectUser/types';
import DB from '../utils/DB/';

const LOADING_STEP = (key, description = '') => {
  return {
    title: 'is loading',
    icon:  'loading',
    description,
    key,
  };
};

const FAILED_STEP = (key, description = '') => {
  return {
    title: 'error',
    icon:  'error',
    description,
    key,
  };
};

const INITIAL_STEPS = [
  { key: 1, title: 'User', icon: 'user' },
  { key: 2, title: 'Saving', icon: 'save' },
];

const failedStep = (steps, current) => {
  steps.map((s) => { return (s.key === current ? FAILED_STEP(s.key, s.description) : s); });
};

const initialState = {
  accountData: [],
  isFetching:  false,
  hasFound:    false,
  hasLoaded:   false,
  progress:    0,
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
        progress:   3,
      };

    case FETCH_FULL_DATA_SUCCESS: {
      const {
        accountData,
      } = state;

      const fulltag = getBtag(action.data.name, action.userData.battletag);

      const found = DB.get('users')
        .find({ ...action.userData })
        .value();

      if (found) {
        message.error(`User ${fulltag} already saved`);
        return {
          ...state,
          accountData,
          hasFound:   true,
          hasLoaded:  false,
          progress:   -4,
          isFetching: false,
        };
      }

      DB.get('users')
        .push({ ...action.userData, icon: action.data.icon })
        .write();
      accountData.push({ ...action.data, fullname: fulltag, key: fulltag });
      message.success(`User ${fulltag} successfully loaded`);
      return {
        ...state,
        accountData,
        hasFound:   true,
        hasLoaded:  true,
        progress:   4,
        isFetching: false,
      };
    }

    case FETCH_FULL_DATA_FAILURE:
      message.error(action.error.toString());
      return {
        ...state,
        hasFound:   true,
        hasLoaded:  false,
        progress:   -4,
        isFetching: false,
      };

    case ADD_NEW_USER_FAILURE:
      message.error(action.error.toString());
      return {
        ...state,
        hasFound:   false,
        isFetching: false,
        progress:   -2,
        steps:      failedStep(state.steps, state.currentStep),
      };

    case ADD_NEW_USER_REQUEST:
      return {
        ...state,
        hasFound:    false,
        isFetching:  true,
        progress:    1,
        steps:       INITIAL_STEPS,
        currentStep: 1,
      };

    case ADD_NEW_USER_SUCCESS:
      return {
        ...state,
        hasFound:   true,
        isFetching: false,
        progress:   2,
      };

    default:
      return state;
  }
}

export default accountReducer;
