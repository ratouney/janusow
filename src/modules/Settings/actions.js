import {
  EDIT_SETTINGS,
} from './types';

const editSettings = (newSettings) => {
  return {
    type: EDIT_SETTINGS,
    newSettings,
  };
};

const TMP = '';

export {
  TMP,
  editSettings,
};
