import {
  ADD_NEW_USER_FAILURE,
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  FETCH_FULL_DATA_REQUEST,
  FETCH_FULL_DATA_SUCCESS,
  FETCH_FULL_DATA_FAILURE,
} from '../modules/SelectUser/types';

const initialState = {
  accountNames: [],
  accountData:  [],
  isFetching:   false,
  hasFound:     false,
  hasLoaded:    false,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FULL_DATA_REQUEST:
      return {
        ...state,
        hasFound:   false,
        hasLoaded:  false,
        isFetching: true,
      };

    case FETCH_FULL_DATA_SUCCESS:
      console.log('User loaded : ', action.data);
      return {
        ...state,
        hasFound:   true,
        hasLoaded:  true,
        isFetching: false,
      };

    case FETCH_FULL_DATA_FAILURE:
      return {
        ...state,
        hasFound:   true,
        hasLoaded:  false,
        isFetching: false,
      };

    case ADD_NEW_USER_FAILURE:
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
      console.log('User found : ', action.data);
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
