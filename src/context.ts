import React,{ createContext, Dispatch, ReducerAction } from "react";
import { fetchget } from "../src/utils/fetch"

//声明Context的泛型
type ContextType = [
    string,
    Dispatch<any>
];

//创建一个context上下文，并导出
 const MyContext = React.createContext(<any>[{}]);

 export default MyContext