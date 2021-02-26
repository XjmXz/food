import React,{useReducer,useState,useEffect} from 'react';
import RouteMap from './router'
import { HashRouter } from 'react-router-dom'
import './App.scss';
import ToggleNav from './components/togglenav'
import ToggleBar from './components/togglebar'
import Tab from "./components/tabs"
import MyContext from "./context"
import reducer from "./reducer/index"
import { fetchget } from "./utils/fetch"

function App(props: any) {
  let [productList, setProductList] = useState<any>([]);
  let [pageIndex, setPageIndex] = useState(1)
  useEffect(() => {
    getProducts();
}, [pageIndex])

const getProducts = async () => {
  var { message: products } = await fetchget(`/api/products/${pageIndex}`)
  setProductList([...productList, ...products])
  console.log(productList, "111111111111111");
}
  //useReducer 接收一个纯函数和一个初始值，返回state和dispatch(派发器)
  let [productLists, dispatch] = useReducer(reducer, productList);
  return (
    <MyContext.Provider value={[productLists, dispatch]}>
      <HashRouter>
        <ToggleNav></ToggleNav>
        <RouteMap></RouteMap>
        <ToggleBar></ToggleBar>
      </HashRouter>
    </MyContext.Provider>
  );
}

export default App;
