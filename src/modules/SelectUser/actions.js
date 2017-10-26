import {
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  ADD_NEW_USER_FAILURE,
  FETCH_FULL_DATA_REQUEST,
  FETCH_FULL_DATA_SUCCESS,
  FETCH_FULL_DATA_FAILURE,
} from './types';
import fetch from 'isomorphic-fetch';

const API_URL = 'https://ow-api.com/v1/stats';

const fetchFullDataRequest = (userData) => {
  return {
    type: FETCH_FULL_DATA_REQUEST,
    userData,
  };
};

const fetchFullDataSuccess = (data, userData) => {
  return {
    type: FETCH_FULL_DATA_SUCCESS,
    data,
    userData,
  };
};

const fetchFullDataFailure = (error) => {
  return {
    type: FETCH_FULL_DATA_FAILURE,
    error,
  };
};

const fetchFullData = (userData) => {
  const url = `${API_URL}/${userData.platform}/${userData.region}/${userData.username}-${userData.battletag}/complete`;
  const params = {
    method: 'GET',
    mode:   'cors',
  };

  return (dispatch) => {
    dispatch(fetchFullDataRequest(userData));
    fetch(url, params)
      .then((response) => {
        return response.json();
      }).then((data) => {
        if (data.error) {
          dispatch(fetchFullDataFailure(data.error));
        } else {
          dispatch(fetchFullDataSuccess(data, userData));
        }
      })
      .catch((error) => {
        console.log('FUCK OFF : ', error.toString());
      });
  };
};

const addNewUserRequest = (userData) => {
  return {
    type: ADD_NEW_USER_REQUEST,
    userData,
  };
};

const addNewUserSuccess = (data) => {
  return {
    type: ADD_NEW_USER_SUCCESS,
    data,
  };
};

const addNewUserFailure = (error) => {
  return {
    type: ADD_NEW_USER_FAILURE,
    error,
  };
};

const addNewUser = (userData) => {
  const url = `${API_URL}/${userData.platform}/${userData.region}/${userData.username}-${userData.battletag}/profile`;
  const params = {
    method: 'GET',
    mode:   'cors',
  };

  return (dispatch) => {
    dispatch(addNewUserRequest(userData));
    fetch(url, params)
      .then((response) => {
        return response.json();
      }).then((data) => {
        if (data.error) {
          dispatch(addNewUserFailure(data.error));
        } else {
          dispatch(addNewUserSuccess(data));
          dispatch(fetchFullData(userData));
        }
      })
      .catch((error) => {
        console.log('FUCK OFF : ', error.toString());
      });
  };
};

export {
  fetchFullData,
  addNewUser,
};
