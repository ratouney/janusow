const OPEN_ADD_MODAL = 'Dashboard/OPEN_ADD_MODAL';
const CLOSE_ADD_MODAL = 'Dashboard/CLOSE_ADD_MODAL';
const OPEN_SIDEMENU = 'Dashboard/OPEN_SIDEMENU';
const CLOSE_SIDEMENU = 'Dashboard/CLOSE_SIDEMENU';

const openAddModal = () => {
  return {
    type: OPEN_ADD_MODAL,
  };
};

const closeAddModal = () => {
  return {
    type: CLOSE_ADD_MODAL,
  };
};

const openSidemenu = () => {
  return {
    type: OPEN_SIDEMENU,
  };
};

const closeSidemenu = () => {
  return {
    type: CLOSE_SIDEMENU,
  };
};


const initialState = {
  showSidemenu: true,
  showAddModal: false,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case OPEN_ADD_MODAL:
      return {
        ...state,
        showAddModal: true,
      };

    case CLOSE_ADD_MODAL:
      return {
        ...state,
        showAddModal: false,
      };

    case OPEN_SIDEMENU:
      return {
        ...state,
        showSidemenu: true,
      };

    case CLOSE_SIDEMENU:
      return {
        ...state,
        showSidemenu: false,
      };
  }
};

export default dashboardReducer;
export {
  openAddModal,
  openSidemenu,
  closeAddModal,
  closeSidemenu,
};
