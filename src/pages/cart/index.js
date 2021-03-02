import React, { useState, useEffect } from "react";
import { fetchget } from "../../utils/fetch";
import "./cart.scss";
import {
  Card,
  WingBlank,
  WhiteSpace,
  Checkbox,
  SwipeAction,
} from "antd-mobile";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartList, setCartList] = useState();

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    var { message } = await fetchget("/api/cartList");
    console.log(message);
    setCartList(message);
  };
  return (
    <div>
      {/* {cartList.length < 1 && <div>购物车空</div>} */}
      {cartList &&
        cartList.map((item) => {
          return (
            <div>
              <Checkbox></Checkbox>
              <Link to={`/detail/${item.id}`}>
                <WingBlank size="lg">
                  <WhiteSpace size="lg" />
                  <SwipeAction
                    // style={{ backgroundColor: "gray" }}
                    autoClose
                    right={[
                      {
                        text: "取消删除",
                        onPress: () => console.log("取消删除"),
                        style: { backgroundColor: "#ddd", color: "white" },
                      },
                      {
                        text: "删除",
                        onPress: () => console.log("删除成功"),
                        style: { backgroundColor: "orangered", color: "white" },
                      },
                    ]}
                    onOpen={() => console.log("global open")}
                    onClose={() => console.log("global close")}
                  >
                    <Card>
                      <Card.Body>
                        <img
                          src={item.thumbs.split(",")[0]}
                          alt=""
                          className="cart-img"
                        />
                        <div className="cart-right">
                          <p className="cart-title">{item.title}</p>
                          <p className="cart-price">￥{item.price}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </SwipeAction>

                  <WhiteSpace size="lg" />
                </WingBlank>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Cart;
