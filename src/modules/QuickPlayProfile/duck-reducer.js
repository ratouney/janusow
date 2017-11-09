const RESET = 'QuickPlayProfile/RESET';
const SET_SELECTED_HERO = 'QuickPlayProfile/SET_SELECTED_HERO';

const initialState = {
  selected: {},
};

export const setSelectedHero = (selected) => {
  return {
    type: SET_SELECTED_HERO,
    selected,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

const quickPlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }

    case SET_SELECTED_HERO: {
      return {
        ...state,
        selected: action.selected,
      };
    }

    default:
      return state;
  }
};

export default quickPlayReducer;
