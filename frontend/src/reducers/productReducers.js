import * as productConst from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productConst.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case productConst.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case productConst.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
