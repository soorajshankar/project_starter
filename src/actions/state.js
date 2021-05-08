export const SET_ERROR = "SET_ERROR";

export const initialState = { errors: false };

export const reducer = (state, action) => {
  console.log("<><><><>",action)
  switch (action.type) {
    case SET_ERROR:
      return { errors: action.payload };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};
