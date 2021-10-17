import { combineReducers } from "redux";
import productsReducer from "./products";

export default combineReducers({
  products: productsReducer,
});
