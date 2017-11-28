import { message } from 'antd';
import {
  ADD_GROUP,
} from '../modules/MultiAccountForm/types';

import DB from '../utils/DB/';

const fulltagGen = (userData) => {
  if (userData.platform === 'pc') {
    return `${userData.username}#${userData.battletag}`;
  }
  return userData.username;
};

const groupsFromLocalStorage = () => {
  return DB.get('groups')
    .value();
};

const groupListFromLocalStorage = groupsFromLocalStorage()
  .map((elem) => {
    return {
      ...elem,
      keys: elem.children.map((acc) => { return fulltagGen(acc); }),
    };
  });

const initialState = {
  groupData: [],
  groupList: groupListFromLocalStorage,
  errors:    [],
};

function groupReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GROUP: {
      debugger;
      return state;
    }

    default:
      return state;
  }
}

export default groupReducer;
