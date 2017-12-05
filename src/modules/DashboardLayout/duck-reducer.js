const OPEN_ADD_MODAL = 'Dashboard/OPEN_ADD_MODAL';
const CLOSE_ADD_MODAL = 'Dashboard/CLOSE_ADD_MODAL';
const OPEN_FUSE_MODAL = 'Dashboard/OPEN_FUSE_MODAL';
const CLOSE_FUSE_MODAL = 'Dashboard/CLOSE_FUSE_MODAL';
const OPEN_SIDEMENU = 'Dashboard/Sidemenu/OPEN';
const CLOSE_SIDEMENU = 'Dashboard/Sidemenu/CLOSE';

const TOGGLE_TYPE_FILTER = 'Dashboard/Sidemenu/TOGGLE_FILTER';
const SET_FILTER_SEARCH = 'Dashboard/Sidemenu/SET_FILTER_SEARCH';

const toggleTypeFilter = () => {
  return {
    type: TOGGLE_TYPE_FILTER,
  };
};

const setFilterSearch = (search) => {
  return {
    type: SET_FILTER_SEARCH,
    search,
  };
};

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

const openFuseModal = () => {
  return {
    type: OPEN_FUSE_MODAL,
  };
};

const closeFuseModal = () => {
  return {
    type: CLOSE_FUSE_MODAL,
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
  showSidemenu:       true,
  showAddModal:       false,
  showFuseModal:      false,
  filterShowAccounts: true,
  filterSearch:       '',
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case SET_FILTER_SEARCH:
      return {
        ...state,
        filterSearch: action.search,
      };

    case TOGGLE_TYPE_FILTER:
      return {
        ...state,
        filterShowAccounts: !state.filterShowAccounts,
      };

    case OPEN_FUSE_MODAL:
      return {
        ...state,
        showFuseModal: true,
        showAddModal:  false,
      };

    case CLOSE_FUSE_MODAL:
      return {
        ...state,
        showFuseModal: false,
      };

    case OPEN_ADD_MODAL:
      return {
        ...state,
        showAddModal:  true,
        showFuseModal: false,
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
  openFuseModal,
  closeAddModal,
  closeFuseModal,
  closeSidemenu,
  toggleTypeFilter,
  setFilterSearch,
};
