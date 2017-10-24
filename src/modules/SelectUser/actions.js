import {
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  ADD_NEW_USER_FAILURE,
} from './types';
import axios from 'axios';
import fetch from 'isomorphic-fetch';

const API_URL = 'https://ow-api.com/v1/stats';

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

const headers = {
  Accept:         'application/json',
  'Content-Type': 'application/json',
};

const addNewUser = (userData) => {
  const url = `${API_URL}/${userData.platform}/${userData.region}/${userData.username}-${userData.battletag}/profile`;
  const params = {
    method: 'GET',
    headers,
  };

  return (dispatch) => {
    dispatch(addNewUserRequest());
    axios.get(url, { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then((response) => {
        debugger;
        dispatch(addNewUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(addNewUserFailure(error));
      });
  };
};

export {
  addNewUser,
};
