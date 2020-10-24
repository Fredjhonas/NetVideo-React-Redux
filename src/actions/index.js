export const actions = {
  setFavorite: 'SET_FAVORITE',
  deleteFavorite: 'DELETE_FAVORITE',
  loginRequest: 'LOGIN_REQUEST',
  logoutRequest: 'LOGOUT_REQUEST',
  registerRequest: 'REGISTER_REQUEST',
  FETCH_CUSTOMER: 'FETCH_CUSTOMER',
  LOADING_CUSTOMER: 'LOADING_CUSTOMER',
  ERROR_CUSTOMER: 'ERROR_CUSTOMER',
};

export const setFavorite = (payload) => ({
  type: actions.setFavorite,
  payload,
});

export const deleteFavorite = (payload) => ({
  type: actions.deleteFavorite,
  payload,
});

export const loginRequest = (payload) => ({
  type: actions.loginRequest,
  payload,
});
export const logoutRequest = (payload) => ({
  type: actions.logoutRequest,
  payload,
});

export const registerRequest = (payload) => ({
  type: actions.registerRequest,
  payload,
});

export const searchFetchApi = (search) => {
  return async function (dispatch) {

    if (search === '') {
      const errorTexto = 'Usted no escribio nada';
      dispatch({ type: actions.ERROR_CUSTOMER, payload: errorTexto });
      return;
    }

    const keyApi = '1e6296feeb7565b54f1f8ea079f7e70e';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${keyApi}&language=es&query=${search}`;

    const loadingTrue = true;
    dispatch({ type: actions.LOADING_CUSTOMER, payload: loadingTrue });

    const response = await fetch(apiUrl);
    const data = await response.json();
    const filterData = data.results.slice(0, 10).map((movie) => movie);

    const loandigFalse = false;
    if (filterData === undefined) {

      const errorTexto = 'La pelicula no se encontro';
      dispatch({ type: actions.ERROR_CUSTOMER, payload: errorTexto });
      dispatch({ type: actions.LOADING_CUSTOMER, payload: loandigFalse });

    } else {

      dispatch({ type: actions.FETCH_CUSTOMER, payload: filterData });
      dispatch({ type: actions.LOADING_CUSTOMER, payload: loandigFalse });
      dispatch({ type: actions.ERROR_CUSTOMER, payload: false });

    }

  };
};
