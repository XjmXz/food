import React, { useEffect, useState } from "react";
import { fetchget } from "../../utils/fetch";
import { WingBlank, WhiteSpace } from "antd-mobile";
import { Link } from "react-router-dom";
import "./collect.scss";

const Collect = () => {
  const [collectList, setCollect] = useState();

  useEffect(() => {
    getCollectList();
  }, []);

  const getCollectList = async () => {
    var { message } = await fetchget("/api/collectList");
    setCollect(message);
  };

  return (
    <div>
      {collectList &&
        collectList.map((item) => {
          return (
            <Link to={`/detail/${item.id}`}>
              <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <div className="collect">
                  <img
                    src={item.thumbs.split(",")[0]}
                    alt=""
                    className="collect-img"
                  />
                  <div className="collect-right">
                    <p className="collect-title">{item.title}</p>
                    <p className="collect-price">￥{item.price}</p>
                  </div>
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </Link>
          );
        })}
    </div>
  );
};

export default Collect;
