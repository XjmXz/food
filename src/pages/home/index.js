import React, { useEffect, useState } from "react";
import { fetchget } from "../../utils/fetch";
import Carousel from "../../components/home/carousel";
import Ad from "../../components/home/ad";
import ProductList from "../../components/home/productList";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productAction";
const Home = () => {
  let [lunboList, setLunboList] = useState([]);
  let [adList, setAdList] = useState([]);
  // let [productList, setProductList] = useState([]);
  let [pageIndex, setPageIndex] = useState(1);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // const products = [];

  useEffect(() => {
    getLunbo();
    getAds();
  }, []);

  // useEffect(() => {
  //   getProducts();
  // }, [pageIndex]);

  const getLunbo = async () => {
    var { message } = await fetchget("/api/lunbo");
    setLunboList(message);
  };

  const getAds = async () => {
    var { message: ads } = await fetchget("/api/ads");
    setAdList(ads);
  };

  // const getProducts = async() => {
  //     var { message: products } = await fetchget(`/api/products/${pageIndex}`);
  //     setProductList([...productList, ...products]);
  //     console.log(productList, "111111111111111");
  // };
  // const changePageIndex = () => {
  //     setPageIndex(++pageIndex);
  // };

  return (
    <div>
      <Carousel list={lunboList}> </Carousel>
      <Ad list={adList}> </Ad>
      <ProductList list={products}></ProductList>
    </div>
  );
};

export default Home;
