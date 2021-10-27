import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import api from "./middleware/api";

const cartItemFromStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : { Items: [] };

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  entities: {
    cartItem: cartItemFromStorage,
    users: { userInfo: userInfoFromStorage },
  },
};

const middleware = [thunk, api];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
