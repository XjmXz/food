import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchget } from "../../utils/fetch";
import Carousel from "../../components/home/carousel";
import Ad from "../../components/home/ad";
import ProductList from "../../components/home/productList";
import { listProducts } from "../../actions/productAction";

const Home: React.FC = () => {
  const dispatch = useDispatch();
//   const productList = useSelector((state) => state.productList);

  let [lunboList, setLunboList] = useState<any>([]);
  let [adList, setAdList] = useState<any>([]);
  let [productList, setProductList] = useState<any>([]);
  let [pageIndex, setPageIndex] = useState(1);
  // let[city,dispatch]=useContext(Context)

  useEffect(() => {
    getLunbo();
    getAds();
    getProducts();
  }, []);

  // useEffect(() => {
  //   dispatch(listProducts());
  // }, [dispatch]);

  const getLunbo = async () => {
    var { message } = await fetchget("/api/lunbo");
    setLunboList(message);
  };

  const getAds = async () => {
    var { message: ads } = await fetchget("/api/ads");
    setAdList(ads);
  };

  const getProducts = async () => {
      var { message: products } = await fetchget('/api/products')
      setProductList([...productList, ...products])
      console.log(productList, "111111111111111");
  }


  return (
    <div>
      <Carousel list={lunboList}></Carousel>
      <Ad list={adList}></Ad>
      {/* {pageIndex} */}
      <ProductList
        list={productList}
      ></ProductList>
    </div>
  );
};

export default Home;
