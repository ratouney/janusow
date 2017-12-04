import DB from '../utils/DB/';
import { EDIT_SETTINGS } from '../modules/Settings/types';

const loadSettingsFromLocalStorage = () => {
  return DB.get('settings')
    .value();
};

const initialValues = {
  ...loadSettingsFromLocalStorage(),
};

const settingsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case EDIT_SETTINGS: {
      DB.set('settings', { ...action.newSettings })
        .write();

      return {
        ...state,
        ...action.newSettings,
      };
    }

    default:
      return state;
  }
};

export default settingsReducer;
