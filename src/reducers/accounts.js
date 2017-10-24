const initialState = {
  accountNames: [],
  accountData:  [],
  isFetching:   false,
  hasData:      false,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default accountReducer;
