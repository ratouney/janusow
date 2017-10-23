import { combineReducers } from 'redux';

const initialState = {
  value: true
};

function mockReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;  
  }
}

export default combineReducers({
  mockReducer,
});
