import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { fetchget } from "../../utils/fetch";
import "./category.scss";

const Category = (props) => {
  const [category, setCategory] = useState();

  useEffect(() => {
    getCategory();
  }, []);

  //   console.log(props.history.location.search, "2222222222222222222");

  let id = props.history.location.search.slice(-1);
  const getCategory = async () => {
    var { message } = await fetchget(`/api/daily/${id}`);
    setCategory(message.datas);
  };

  console.log(category, "ccccccccccccccccc");

  return (
    <div>
      {category &&
        category.map((item) => {
          return (
            <Link to={`/detail/${item.id}`}>
              <div className="category-list">
                <img src={item.thumb} alt="" className="category-img" />
                <span className="category-price">￥{item.price}</span>
                <span className="category-sales">{item.sales}人付款</span>
                <p className="category-title">{item.title}</p>
                <div className="category-detail">去详情</div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Category;
