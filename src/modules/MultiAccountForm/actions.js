import {
  ADD_GROUP,
  REMOVE_GROUP,
} from './types';

export const addGroup = (groupname, data) => {
  return {
    type: ADD_GROUP,
    groupname,
    data,
  };
};

export const removeGroup = (groupname) => {
  return {
    type: REMOVE_GROUP,
    groupname,
  };
};
