import { combineReducers } from "redux";
import reducers from "./reducers";
import userReducer from "./User/user.reducer";

export default combineReducers({
  data: reducers,
  user: userReducer,
});
