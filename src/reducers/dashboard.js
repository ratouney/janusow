import {
  OPEN_ADD_MODAL,
  OPEN_FUSE_MODAL,
  OPEN_SIDEMENU,
  CLOSE_ADD_MODAL,
  CLOSE_FUSE_MODAL,
  CLOSE_SIDEMENU,
} from '../modules/DashboardLayout/types';

const initialState = {
  menuCollapsed: false,
  addModalOpen:  false,
  fuseModalOpen: false,
};

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ADD_MODAL:
      return {
        ...state,
        addModalOpen: true,
      };

    case OPEN_FUSE_MODAL:
      return {
        ...state,
        fuseModalOpen: true,
      };

    case OPEN_SIDEMENU:
      return {
        ...state,
        menuCollapsed: false,
      };

    case CLOSE_ADD_MODAL:
      return {
        ...state,
        addModalOpen: false,
      };

    case CLOSE_FUSE_MODAL:
      return {
        ...state,
        fuseModalOpen: false,
      };

    case CLOSE_SIDEMENU:
      return {
        ...state,
        menuCollapsed: true,
      };

    default:
      return state;
  }
}

export default dashboardReducer;
