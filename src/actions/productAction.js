import {
    PRODUCT_AD_FAIL,
    PRODUCT_AD_REQUEST,
    PRODUCT_AD_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "../contents/productContents";
import { fetchget } from "../utils/fetch";

export const listProducts = () => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { message } = await fetchget("/api/products");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: message });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.reponse && error.reponse.message.message ?
                error.reponse.message.message :
                error.message,
        });
    }
};

export const listProductDetail = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        const { message } = await fetchget(`/api/detail/${id}`);
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: message });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.reponse && error.reponse.message.message ?
                error.reponse.message.message :
                error.message,
        });
    }
};

export const listAd = () => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_AD_REQUEST });
        const { message } = await fetchget("/api/ads");
        dispatch({ type: PRODUCT_AD_SUCCESS, payload: message });
    } catch (error) {
        dispatch({
            type: PRODUCT_AD_FAIL,
            payload: error.reponse && error.reponse.message.message ?
                error.reponse.message.message :
                error.message,
        });
    }
};