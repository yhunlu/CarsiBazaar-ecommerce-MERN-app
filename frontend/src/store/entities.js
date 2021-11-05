import { combineReducers } from "redux";
import productsReducer from "./products";
import productDetailReducer from "./productDetail";
import cartReducer from "./cart";
import userLoginReducer from "./users";
import userDetailsReducer from "./userDetails";
import shippingReducer from "./shipping";
import paymentReducer from "./payment";
import orderReducer from "./order";
import orderDetailsReducer from "./orderDetails";

export default combineReducers({
  products: productsReducer,
  productDetail: productDetailReducer,
  cartItem: cartReducer,
  users: userLoginReducer,
  userDetails: userDetailsReducer,
  shipping: shippingReducer,
  payment: paymentReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
});
