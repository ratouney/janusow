import {
  REMOVE_USER,
} from './types';

const removeUser = (userData) => {
  return {
    type: REMOVE_USER,
    userData,
  };
};

export {
  removeUser,
};
