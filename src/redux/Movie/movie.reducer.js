import userTypes from "./movie.types";

const INITIAL_STATE = {
  data: false,
  loading: false,
  activo: false,
  err: false,
  mylist: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_FAVORITE":
      return {
        ...state,
        mylist: action.payload,
      };

    case "DELETE_FAVORITE":
      return {
        ...state,
        mylist: state.mylist.filter((items) => items.id !== action.payload),
      };

    case "FETCH_CUSTOMER":
      return {
        ...state,
        data: action.payload,
      };
    case "LOADING_CUSTOMER":
      return {
        ...state,
        loading: action.payload,
      };
    case "ERROR_CUSTOMER":
      return {
        ...state,
        err: action.payload,
      };
    case "LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default userReducer;
