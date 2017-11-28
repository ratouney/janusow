import {
  ADD_GROUP,
  REMOVE_GROUP,
} from './types';

export const addGroup = (data, name) => {
  return {
    type: ADD_GROUP,
    data,
    name,
  };
};

export const removeGroup = (name) => {
  return {
    type: REMOVE_GROUP,
    name,
  };
};
