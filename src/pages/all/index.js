import React, { useState, useEffect } from "react";
import { Tabs } from "antd-mobile";
import { fetchget } from "../../utils/fetch";
import { Link, RouteComponentProps } from "react-router-dom";
import "./all.scss";

const ALl = (props) => {
  let [category, setCategory] = useState();
  let [categorys, setCatesgory] = useState();
  let [productList, setProductList] = useState([]);
  useEffect(() => {
    getAllcate();
    getCateProduct();
  }, []);

  useEffect(() => {
    getAllcates();
  }, [props.location.search]);

  const goFenlei = (product) => {
    props.history.push(`/all/?title=其他分类/${product.id}`);
  };

  const getAllcate = async () => {
    var { message } = await fetchget("/api/category");
    setCategory(message);
  };
  var gid = props.location.search.slice(-1);
  console.log(gid, "55555555555555555");
  const getCateProduct = async () => {
    var { message: products } = await fetchget(
      `/api/daily/${props.match.params.id}`
    );
    setProductList(products);
  };

  const getAllcates = async () => {
    var { message } = await fetchget(`/api/category/${gid}`);
    setCatesgory(message);
    console.log(message, "gggggggggg");
  };
  return (
    <div>
      <div>
        <Tabs
          tabs={category}
          onTabClick={goFenlei}
          onChange={(onChange) => {
            console.log(onChange.id, "ddddddd");
          }}
          renderTabBar={(props) => <Tabs.DefaultTabBar {...props} page={5} />}
        >
          <div style={{ display: "flex", height: "750px" }}>
            <div className="category">
              <div className="category-item">
                {categorys &&
                  categorys.items.products.map((item, index) => {
                    return (
                      <div key={item.gid} className="grid-item">
                        {
                          <Link
                            to={`/category/?title=${item.title}/${item.gid}`}
                          >
                            <img src={item.img} alt="" />
                            <div>
                              <p>{item.title}</p>
                            </div>
                          </Link>
                        }
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ALl;
