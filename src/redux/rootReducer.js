import { combineReducers } from "redux";
import movieReducer from "./Movie/movie.reducer";
import userReducer from "./User/user.reducer";

export default combineReducers({
  movie: movieReducer,
  user: userReducer,
});
