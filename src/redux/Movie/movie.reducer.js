import movieTypes from "./movie.types";

const INITIAL_STATE = {
  data: false,
  loading: false,
  activo: false,
  err: false,
  mylist: [],
};

const movieReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case movieTypes.SET_FAVORITE:
      return {
        ...state,
        mylist: action.payload,
      };

    case movieTypes.DELETE_FAVORITE:
      return {
        ...state,
        mylist: state.mylist.filter((item) => item.id !== action.payload),
      };

    case movieTypes.FETCH_CUSTOMER:
      return {
        ...state,
        data: action.payload,
      };
    case movieTypes.LOADING_CUSTOMER:
      return {
        ...state,
        loading: action.payload,
      };
    case movieTypes.ERROR_CUSTOMER:
      return {
        ...state,
        err: action.payload,
      };
    case movieTypes.LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default movieReducer;
