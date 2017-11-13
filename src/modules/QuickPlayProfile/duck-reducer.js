const RESET = 'QuickPlayProfile/RESET';
const SET_SELECTED_HERO = 'QuickPlayProfile/SET_SELECTED_HERO';
const OPEN_MODAL = 'QuickPlayProfile/OPEN_MODAL';
const CLOSE_MODAL = 'QuickPlayProfile/CLOSE_MODAL';

const initialState = {
  selected:  {},
  showModal: false,
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

export const openModal = () => {
  return {
    type: OPEN_MODAL,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

const quickPlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        showModal: true,
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        showModal: false,
      };
    }

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
