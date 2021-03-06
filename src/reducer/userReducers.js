import {
    USER_ADDRESS_FAIL,
    USER_ADDRESS_REQUEST,
    USER_ADDRESS_SUCCESS,
    USER_CART_FAIL,
    USER_CART_REQUEST,
    USER_CART_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGINOUT,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
} from "../contents/userContents";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, err: action.payload };
        case USER_LOGIN_LOGINOUT:
            return {};
        default:
            return state;
    }
};

export const addressReducer = (state = { addresss: {} }, action) => {
    switch (action.type) {
        case USER_ADDRESS_REQUEST:
            return { loading: true, ...state };
        case USER_ADDRESS_SUCCESS:
            return { loading: false, addresss: action.payload };
        case USER_ADDRESS_FAIL:
            return { loading: false, err: action.payload };
        default:
            return state;
    }
};

export const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CART_REQUEST:
            return { loading: true, ...state };
        case USER_CART_SUCCESS:
            return { loading: false, cartlist: action.payload };
        case USER_CART_FAIL:
            return { loading: false, err: action.payload };
        default:
            return state;
    }
};