import { message } from 'antd';
import _, {  } from 'lodash';
import { ADD_GROUP, REMOVE_GROUP } from '../modules/MultiAccountForm/types';
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
      loaded: false,
      keys:   elem.children.map((acc) => { return fulltagGen(acc); }),
    };
  });

const initialState = {
  groupList: groupListFromLocalStorage,
  groupData: [],
  errors:    [],
  success:   false,
};

function groupReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GROUP: {
      if (!_.find(state.groupList, { groupname: action.groupname })) {
        DB.get('groups')
          .push({ ...action.data })
          .write();

        message.success(`Group ${action.groupname} successfully created`);
        return {
          ...state,
          groupList: [...state.groupList, { ...action.data }],
          success:   true,
        };
      }
      message.error('Groupname is already taken');
      return state;
    }

    case REMOVE_GROUP: {
      return state;
    }

    default:
      return state;
  }
}

export default groupReducer;
