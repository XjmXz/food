import React, { useEffect, useState } from "react";
import { fetchget } from "../../utils/fetch";
import { WingBlank, WhiteSpace, SwipeAction } from "antd-mobile";
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
            <WingBlank size="lg">
              <WhiteSpace size="lg" />
              <SwipeAction
                style={{ backgroundColor: "transparent" }}
                autoClose
                right={[
                  {
                    text: "取消",
                    onPress: () => console.log("取消"),
                    style: {
                      backgroundColor: "#ddd",
                      color: "white",
                    },
                  },
                  {
                    text: "删除",
                    onPress: () => console.log("删除"),
                    style: { backgroundColor: "#F4333C", color: "white" },
                  },
                ]}
                onOpen={(e) => console.log("global open")}
                onClose={() => console.log("global close")}
              >
                <div>
                  <Link to={`/detail/${item.id}`}>
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
                  </Link>
                </div>
              </SwipeAction>
              <WhiteSpace size="lg" />
            </WingBlank>
          );
        })}
    </div>
  );
};

export default Collect;
