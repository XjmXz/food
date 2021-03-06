import React, { useState, useEffect } from "react";
import { SearchBar } from "antd-mobile";
import { Link } from "react-router-dom";
import { fetchget } from "../../utils/fetch";

const Qinghuo = ({ location }) => {
  let [productList, setProductList] = useState([]);

  console.log(location.search.slice(-1), "ssssssssssss");
  const ctype = location.search.slice(-1);

  useEffect(() => {
    getProducts();
  }, [ctype]);

  const getProducts = async () => {
    var { message } = await fetchget(`/api/products/${ctype}`);
    console.log(message, "ppppppppppppppppppppppppppppppp");
    setProductList(message);
  };

  return (
    <div>
      <SearchBar placeholder="您想搜点啥" maxLength={8} />
      <div>
        {productList &&
          productList.map((item) => {
            return (
              <div className="grid-item">
                <Link to={`/detail/${item.gid}`} key={item.gid}>
                  <img src={item.thumb} alt="" />
                  <div className="grid-item-main">
                    <p className="grid-item-title">{item.title}</p>
                    <p className="gird-item-p">原价：￥{item.productprice}</p>
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

export default Qinghuo;
