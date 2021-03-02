import React, { useState, useEffect } from "react";
import { SearchBar, NavBar } from "antd-mobile";
import { Link } from "react-router-dom";
import { fetchget } from "../../utils/fetch";
import Nav from "../../components/nav/Nav";

const Huasuan = (props) => {
  let [title, setTitle] = useState();
  let [productList, setProductList] = useState([]);
  let [pageIndex, setPageIndex] = useState(1);
  let [refreshing, setRefreshing] = useState(false);
  let [down, setDown] = useState(false);
  let [height, setHeight] = useState(document.documentElement.clientHeight);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    var { message: products } = await fetchget("/api/huasuan");
    console.log(products, "ppppppppppppppppppppppppppppppp");
    setProductList(products);
  };
  return (
    <div>
      <Nav></Nav>
      <div>
        {productList &&
          productList.map((item) => {
            return (
              <div className="grid-item">
                <Link to={`/detail/${item.id}`} key={item.gid}>
                  <img src={item.url} alt="" />
                  <div className="grid-item-main">
                    <p className="grid-item-title">{item.title}</p>
                    <span>￥{item.price}</span>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Huasuan;
