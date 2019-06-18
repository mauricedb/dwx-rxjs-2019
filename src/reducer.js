const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };

    case "DECREMENT":
      return { ...state, count: state.count - 1 };

    case "RENAME":
      return { ...state, firstName: action.payload };

    default:
      return state;
  }
};

export default reducer;
