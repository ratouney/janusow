import fetch from 'isomorphic-fetch';
import {
  FETCH_USER_DATA_FAILURE,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_EXIST_FAILURE,
  FETCH_USER_EXIST_REQUEST,
  FETCH_USER_EXIST_SUCCESS,
  RESET_SEARCH_STEPS,
  FETCH_ERROR_STEP,
} from './types';
import { API_URL } from '../../utils/consts';
import DB from '../../utils/DB/';

const settings =
  DB.get('settings')
    .value();


const resetSearchSteps = () => {
  return {
    type: RESET_SEARCH_STEPS,
  };
};

const fetchErrorStep = (step) => {
  return {
    type: FETCH_ERROR_STEP,
    step,
  };
};

const fetchUserDataRequest = (userData) => {
  return {
    type: FETCH_USER_DATA_REQUEST,
    userData,
  };
};

const fetchUserDataSuccess = (data, userData) => {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    data,
    userData,
  };
};

const fetchUserDataFailure = (error) => {
  return {
    type: FETCH_USER_DATA_FAILURE,
    error,
  };
};

const fetchUserData = (userData) => {
  const url = `${API_URL}/${userData.platform}/${userData.region}/${userData.username}-${userData.battletag}/complete`;
  const params = {
    method: 'GET',
    mode:   'cors',
  };

  return (dispatch) => {
    dispatch(fetchUserDataRequest(userData));
    fetch(url, params)
      .then((response) => {
        return response.json();
      }).then((data) => {
        if (data.error) {
          dispatch(fetchUserDataFailure(data.error));
        } else {
          dispatch(fetchUserDataSuccess(data, userData));
        }
      })
      .catch((error) => {
        console.log('FUCK OFF : ', error.toString());
        dispatch(fetchErrorStep(3));
      });
  };
};

const fetchUserExistRequest = (userData) => {
  return {
    type: FETCH_USER_EXIST_REQUEST,
    userData,
  };
};

const fetchUserExistSuccess = (data, userData, save) => {
  return {
    type: FETCH_USER_EXIST_SUCCESS,
    data,
    userData,
    save,
  };
};

const fetchUserExistFailure = (error) => {
  return {
    type: FETCH_USER_EXIST_FAILURE,
    error,
  };
};

const fetchUserExist = (userData) => {
  let url;

  if (userData.platform === 'pc') {
    url = `${API_URL}/${userData.platform}/${userData.region}/${userData.username}-${userData.battletag}/profile`;
  } else {
    url = `${API_URL}/${userData.platform}/${userData.region}/${userData.username}/profile`;
  }
  const params = {
    method: 'GET',
    mode:   'cors',
  };


  // TODO : Refactor this, it's unreadable
  return (dispatch) => {
    dispatch(fetchUserExistRequest(userData));
    fetch(url, params)
      .then((response) => {
        return response.json();
      }).then((data) => {
        if (data.error) {
          dispatch(fetchUserExistFailure(data.error));
        } else {
          const found =
            DB.get('users')
              .find({ ...userData })
              .value();

          if (!found) {
            DB.get('users')
              .push({ ...userData, icon: data.icon })
              .write();

            dispatch(fetchUserExistSuccess(data, userData, true));
            if (settings.autoLoad) {
              dispatch(fetchUserData(userData));
            }
          } else {
            dispatch(fetchUserExistSuccess(data, userData, false));
          }
        }
      })
      .catch((error) => {
        console.log('Response.Json failed: ', error.toString());
        dispatch(fetchErrorStep(1));
      });
  };
};

export {
  fetchUserExist,
  fetchUserData,
  fetchErrorStep,
  resetSearchSteps,
};
