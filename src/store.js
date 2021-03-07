import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    adReducer,
    productDetailReducer,
    productListReducer,
} from "./reducer/productReducers";
import {
    userLoginReducer,
    addressReducer,
    cartReducer,
    orderReducer,
} from "./reducer/userReducers";
const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    adList: adReducer,
    userLogin: userLoginReducer,
    addressList: addressReducer,
    cartList: cartReducer,
    orderList: orderReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) :
    null;

const addressInfoFromStorage = localStorage.getItem("userAddress") ?
    JSON.parse(localStorage.getItem("userAddress")) :
    null;

const orderInfoFromStorage = localStorage.getItem("useroder") ?
    JSON.parse(localStorage.getItem("useroder")) :
    null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    addressList: { userAddress: addressInfoFromStorage },
    orderList: { useroder: orderInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;