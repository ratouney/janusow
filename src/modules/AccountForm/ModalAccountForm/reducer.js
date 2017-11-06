import { EDIT_USER } from '../../AccountForm/types';

const OPEN = 'AccountForm/ModalAccountForm/OPEN';
const CLOSE = 'AccountForm/ModalAccountForm/CLOSE';

const initialState = {
  visible:  false,
  userData: {},
};

const accountModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER:
      return {
        ...state,
        visible: !action.valid,
      };

    case OPEN: {
      return {
        ...state,
        visible:  true,
        userData: action.userData,
      };
    }

    case CLOSE: {
      return {
        ...state,
        visible: false,
      };
    }

    default:
      return state;
  }
};

const open = (userData) => {
  return {
    type: OPEN,
    userData,
  };
};

const close = () => {
  return {
    type: CLOSE,
  };
};

export {
  accountModalReducer,
  open,
  close,
  OPEN,
  CLOSE,
};
