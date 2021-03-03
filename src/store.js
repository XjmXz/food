import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    adReducer,
    productDetailReducer,
    productListReducer,
} from "./reducer/productReducers";
import { userLoginReducer } from "./reducer/userReducers";
const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    adList: adReducer,
    userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) :
    null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;