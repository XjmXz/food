import {
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