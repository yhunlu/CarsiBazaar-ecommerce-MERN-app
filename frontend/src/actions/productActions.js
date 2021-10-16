import axios from "axios";
import * as productConst from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productConst.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: productConst.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productConst.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
