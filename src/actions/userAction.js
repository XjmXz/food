import {
    USER_ADDRESS_FAIL,
    USER_ADDRESS_REQUEST,
    USER_ADDRESS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGINOUT,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
} from "../contents/userContents";
import { fetchget, fetchpost } from "../utils/fetch";

//用户登录
export const login = (username, pwd) => async(dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { message } = await fetchpost("/api/user", { username, pwd });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: message });
        localStorage.setItem("userInfo", JSON.stringify(message));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.reponse && error.reponse.message.message ?
                error.reponse.message.message :
                error.message,
        });
    }
};

//退出登录
export const loginOut = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGIN_LOGINOUT });
};

//收货地址
export const listAddress = () => async(dispatch) => {
    try {
        dispatch({ type: USER_ADDRESS_REQUEST });
        const { message } = await fetchget("/api/address");
        dispatch({ type: USER_ADDRESS_SUCCESS, payload: message });
    } catch (error) {
        dispatch({
            type: USER_ADDRESS_FAIL,
            payload: error.reponse && error.reponse.message.message ?
                error.reponse.message.message :
                error.message,
        });
    }
};