/* eslint-disable no-tabs */
const initialState = {
  data: false,
  loading: false,
  activo: false,
  err: false,
  user: {},
  mylist: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_FAVORITE":
      return {
        ...state,
        mylist: [...state.mylist, action.payload],
      };

    case "DELETE_FAVORITE":
      return {
        ...state,
        mylist: state.mylist.filter((items) => items.id !== action.payload),
      };

    case "LOGIN_REQUEST":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT_REQUEST":
      return {
        ...state,
        user: action.payload,
      };

    case "REGISTER_REQUEST":
      return {
        ...state,
        user: action.payload,
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
    case "USER_ERROR":
      return { ...initialState };
    case "USER_EXITO":
      return {
        ...state,
        loading: false,
        activo: true,
        user: action.payload.user,
      };
    case "CERRAR_SESION":
      return { ...initialState };

    default:
      return state;
  }
}
