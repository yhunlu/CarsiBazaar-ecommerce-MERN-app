import { combineReducers } from "redux";
import productsReducer from "./products";
import productDetailReducer from "./productDetail";
import cartReducer from "./cart";
import userLoginReducer from "./users";

export default combineReducers({
  products: productsReducer,
  productDetail: productDetailReducer,
  cartItem: cartReducer,
  users: userLoginReducer,
});
