const RESET = 'CompetitiveProfile/RESET';
const SET_SELECTED_HERO = 'CompetitiveProfile/SET_SELECTED_HERO';
const OPEN_MODAL = 'CompetitiveProfile/OPEN_MODAL';
const CLOSE_MODAL = 'CompetitiveProfile/CLOSE_MODAL';

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

const competitiveReducer = (state = initialState, action) => {
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

export default competitiveReducer;
