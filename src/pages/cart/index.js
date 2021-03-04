import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchget } from "../../utils/fetch";
import { login } from "../../actions/userAction";

import "./cart.scss";
import { Card, WingBlank, WhiteSpace, Checkbox } from "antd-mobile";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const [cartList, setCartList] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = props.location.search
    ? props.location.search.split("/")[1]
    : "/login/?title=登录/1";

  useEffect(() => {
    if (userInfo == null) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

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
