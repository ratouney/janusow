import {
  REMOVE_USER,
  SET_FILTERED_USER,
} from './types';

const removeUser = (userData) => {
  return {
    type: REMOVE_USER,
    userData,
  };
};

const setFiltered = (filtered) => {
  return {
    type: SET_FILTERED_USER,
    filtered,
  };
};

export {
  removeUser,
  setFiltered,
};
