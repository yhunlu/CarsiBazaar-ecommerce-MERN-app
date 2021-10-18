import { combineReducers } from "redux";
import productsReducer from "./products";
import productDetailReducer from "./productDetail";

export default combineReducers({
  products: productsReducer,
  productDetail: productDetailReducer,
});
