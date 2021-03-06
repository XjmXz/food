import React from "react";
import { Link } from "react-router-dom";
import "./ad.scss";
import fenlei from "./images/分类.png";
const Ad = (props) => {
  console.log(props.list, "222222222222222222222222");

  return (
    <div id="home-ad">
      <h2>牛气冲天 福利多多</h2>
      <div className="ad-container clear-fix">
        <div className="ad-main">
          {props.list?.map((item, index) => {
            return (
              <div key={index} className="ad-item float-left">
                <Link to={`/${item.url}/?title=${item.title}/${index + 1}`}>
                  <img src={require(item.img + "").default} alt={item.title} />
                  <span>{item.title}</span>
                </Link>
              </div>
            );
          })}
          <div className="ad-item float-left">
            <Link to="/all/?title=其他分类/1">
              <img src={fenlei} alt="" />
              <span>其他分类</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ad;
