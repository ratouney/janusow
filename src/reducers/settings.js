import languages from '../consts/languages';

const initialState = {
  language: languages[0],
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'settings/SET_LANGUAGE':
      return {
        ...state,
        language: action.code,
      };

    default:
      return state;
  }
};

export default settingsReducer;
