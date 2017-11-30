import {
  OPEN_ADD_MODAL,
  OPEN_FUSE_MODAL,
  OPEN_SIDEMENU,
  CLOSE_ADD_MODAL,
  CLOSE_FUSE_MODAL,
  CLOSE_SIDEMENU,
} from './types';

const openAddModal = () => {
  return {
    type: OPEN_ADD_MODAL,
  };
};

const openFuseModal = () => {
  return {
    type: OPEN_FUSE_MODAL,
  };
};

const openSidemenu = () => {
  return {
    type: OPEN_SIDEMENU,
  };
};

const closeAddModal = () => {
  return {
    type: CLOSE_ADD_MODAL,
  };
};

const closeFuseModal = () => {
  return {
    type: CLOSE_FUSE_MODAL,
  };
};

const closeSidemenu = () => {
  return {
    type: CLOSE_SIDEMENU,
  };
};

export {
  openAddModal,
  openFuseModal,
  openSidemenu,
  closeAddModal,
  closeFuseModal,
  closeSidemenu,
};
