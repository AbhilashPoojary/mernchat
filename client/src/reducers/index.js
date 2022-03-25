import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";

export default combineReducers({
  loginReducer,
});

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

export const initialState = {
  loginReducer: { currentUser },
};
