import userTypes from "./user.types";
import movieTypes from "../Movie/movie.types";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const loginRequest = (payload) => ({
  type: userTypes.LOGIN_REQUEST,
  payload,
});
export const logoutRequest = (payload) => ({
  type: userTypes.LOGOUT_REQUEST,
  payload,
});

export const registerRequest = (payload) => ({
  type: userTypes.REGISTER_REQUEST,
  payload,
});

export const accederAccion = () => async (dispatch) => {
  // dispatch({
  //   type: "LOADING",
  // });

  try {
  } catch (error) {
    console.log(error);
    dispatch({
      type: userTypes.USER_ERROR,
    });
  }
};
export const leerUsuarioAccion = () => async (dispatch) => {
  if (localStorage.getItem("usuario")) {
    dispatch({
      type: userTypes.USER_EXITO,
      payload: {
        user: JSON.parse(localStorage.getItem("usuario")),
      },
    });
  }
};

export const cerrarSesionAccion = () => (dispatch) => {
  dispatch({
    type: userTypes.SET_CURRENT_USER,
    payload: null
  });
  dispatch({
    type: movieTypes.SET_FAVORITE,
    payload: [],
  });
  localStorage.removeItem("usuario");
};
