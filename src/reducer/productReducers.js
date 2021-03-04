// export default function city(state = "宣城", action:any) {
//   switch (action.type) {
//     case "CHOOSECITY":
//       return action.city;
//     default:
//       return state;
//   }
// }
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_AD_REQUEST,
    PRODUCT_AD_SUCCESS,
    PRODUCT_AD_FAIL,
} from "../contents/productContents";

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, err: action.payload };
        default:
            return state;
    }
};

export const adReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_AD_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_AD_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_AD_FAIL:
            return { loading: false, err: action.payload };
        default:
            return state;
    }
};

export const productDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAIL_FAIL:
            return { loading: false, err: action.payload };
        default:
            return state;
    }
};