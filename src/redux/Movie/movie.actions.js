import movieTypes from "./movie.types";
import { auth, db } from "../../firebase/utils";
import { query, where, setDoc, collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export const setFavorite = (payload) => (dispatch) => {
  const timestamp = new Date();
  const movieUserId = auth.currentUser.uid;

  payload.movieUserId = movieUserId;
  payload.createdDate = timestamp;

  new Promise((resolve, reject) => {

    setDoc(doc(db, "movies", payload.id.toString()), payload).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    })
  });

  dispatch(fetchFavorites());
};

export const fetchFavorites = () => (dispatch) => {
  const movieUserId = auth.currentUser.uid;

  new Promise((resolve, reject) => {

    const q = query(collection(db, "movies"), where("movieUserId", "==", movieUserId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const movieArray = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          documentID: doc.id,
        };
      });
      resolve(movieArray)
      let movies = movieArray || [];
      dispatch({
        type: movieTypes.SET_FAVORITE,
        payload: movies,
      })
    });

    return unsubscribe;
  });
};

export const deleteFavorite = (documentID) => (dispatch) => {
  new Promise((resolve, reject) => {

    deleteDoc(doc(db, "movies", documentID)).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    });
  });

  dispatch(fetchFavorites());
};


