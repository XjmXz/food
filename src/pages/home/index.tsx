import React, { useEffect, useState,useContext} from "react"
import { fetchget } from "../../utils/fetch"
import Carousel from '../../components/home/carousel'
import Ad from '../../components/home/ad'
import ProductList from '../../components/home/productList'
import Context from '../../context'

const Home: React.FC = () => {
    let [lunboList, setLunboList] = useState<any>([]);
    let [adList, setAdList] = useState<any>([]);
    let [productList, setProductList] = useState<any>([]);
    let [pageIndex, setPageIndex] = useState(1)
    // let[city,dispatch]=useContext(Context)

    useEffect(() => {
        getLunbo();
        getAds();

    }, [])

    useEffect(() => {
        getProducts();
    }, [pageIndex])
    const getLunbo = async () => {
        var { message } = await fetchget("/api/lunbo")
        setLunboList(message)
    }

    const getAds = async () => {
        var { message: ads } = await fetchget("/api/ads")
        setAdList(ads)
    }

    const getProducts = async () => {
        var { message: products } = await fetchget(`/api/products/${pageIndex}`)
        setProductList([...productList, ...products])
        console.log(productList, "111111111111111");
    }
    const changePageIndex = () => {
        setPageIndex(++pageIndex);
    }
    

    console.log(pageIndex, "333333333333333333333333333333333");
//    //新加入
//     let [products, dispatch] = useReducer(reducer, productList);
//     //
    return (
        
            <div>
                <Carousel list={lunboList}></Carousel>
                <Ad list={adList}></Ad>
                {/* {pageIndex} */}
                <ProductList list={productList} changePageIndex={changePageIndex}></ProductList>
                {/* <button onClick={changePageIndex}>点我改变pageIndex</button> */}
            </div>
        )
}

export default Home