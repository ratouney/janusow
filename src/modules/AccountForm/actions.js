import { isEmpty } from 'lodash';
import { EDIT_USER } from './types';
import DB from '../../utils/DB/';

const editUser = (before, after) => {
  let valid = true;

  const localExist = DB.get('users')
    .find({ username: after.username, battletag: after.battletag, platform: after.platform })
    .value();

  if (!isEmpty(localExist)) {
    valid = false;
  }

  return {
    type:    EDIT_USER,
    initial: before,
    current: after,
    valid,
  };
};

const TMP = '';

export {
  TMP,
  editUser,
};
