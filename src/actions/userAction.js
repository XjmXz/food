import {
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGINOUT,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
} from "../contents/userContents";
import { fetchpost } from "../utils/fetch";

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