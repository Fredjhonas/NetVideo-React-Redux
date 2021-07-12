import movieTypes from "./movie.types";
import { auth, firestore } from "../../firebase/utils";

export const setFavorite = (payload) => (dispatch) => {
  const timestamp = new Date();
  const movieUserId = auth.currentUser.uid;

  payload.movieUserId = movieUserId;
  payload.createdDate = timestamp;

  new Promise((resolve, reject) => {
    firestore
      .collection("movies")
      .doc()
      .set(payload)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });

  dispatch(fetchFavorites());
};

export const fetchFavorites = () => (dispatch) => {
  const movieUserId = auth.currentUser.uid;

  new Promise((resolve, reject) => {
    firestore
      .collection("movies")
      .where("movieUserId", "==", movieUserId)
      .get()
      .then((snapshot) => {
        const movieArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(movieArray);
        var movies = movieArray;
        dispatch({
          type: movieTypes.SET_FAVORITE,
          payload: movies,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteFavorite = (documentID) => (dispatch) => {
  new Promise((resolve, reject) => {
    firestore
      .collection("movies")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });

  dispatch(fetchFavorites());
};

export const searchFetchApi = (search) => {
  return async function (dispatch) {
    if (search === "") {
      const errorTexto = "Usted no escribió nada";
      dispatch({ type: movieTypes.ERROR_CUSTOMER, payload: errorTexto });
      dispatch({ type: movieTypes.FETCH_CUSTOMER, payload: filterData });
      return;
    }

    const keyApi = "1e6296feeb7565b54f1f8ea079f7e70e";
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${keyApi}&language=es&query=${search}`;

    const loadingTrue = true;
    dispatch({ type: movieTypes.LOADING_CUSTOMER, payload: loadingTrue });

    const response = await fetch(apiUrl);
    const data = await response.json();
    const filterData = data.results.slice(0, 10).map((movie) => movie);

    const loadigFalse = false;
    if (data.total_results === 0) {
      const errorTexto = "La película no se encontró";
      //console.log('Error', errorTexto);
      dispatch({ type: movieTypes.ERROR_CUSTOMER, payload: errorTexto });
      dispatch({ type: movieTypes.LOADING_CUSTOMER, payload: loadigFalse });
      dispatch({ type: movieTypes.FETCH_CUSTOMER, payload: filterData });
    } else {
      dispatch({ type: movieTypes.FETCH_CUSTOMER, payload: filterData });
      dispatch({ type: movieTypes.LOADING_CUSTOMER, payload: loadigFalse });
      dispatch({ type: movieTypes.ERROR_CUSTOMER, payload: false });
    }
  };
};
