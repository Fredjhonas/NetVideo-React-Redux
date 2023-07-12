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


