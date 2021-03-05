import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchget, fetchpost } from "../../utils/fetch";
import { login, listCart } from "../../actions/userAction";
import "./cart.scss";
import { Card, WingBlank, WhiteSpace, Checkbox } from "antd-mobile";
import { Link } from "react-router-dom";

const Cart = (props) => {
  let [price, setPrice] = useState(0);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartList);
  const { cartlist } = cartList;

  let [selectlist, setSelectList] = useState();
  let [isallchecked, setallChecked] = useState(false);
  let [isselect, setIsSelect] = useState(false);

  useEffect(() => {
    dispatch(listCart());
  }, [dispatch]);

  const redirect = props.location.search
    ? props.location.search.split("/")[1]
    : "/login/?title=登录/1";

  useEffect(() => {
    if (userInfo == null) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);
  var id = props.location.search.split("/")[1];

  useEffect(() => {
    delteCart();
  }, [cartList]);

  const delteCart = async () => {
    var { message } = await fetchpost(`/api/deletecart/${id}`, cartList);
  };

  let selectList = [];
  const getId = (e, item) => {
    console.log(e.target.id);
    if (e.target.checked) {
      // setIsSelect(true);
      // console.log(item);
      price = parseFloat(item.price) + parseFloat(price);
      setPrice(price);
    } else {
      // setIsSelect(false);
      price = parseFloat(price) - parseFloat(item.price);
      setPrice(price);
    }
    let sum = 0;
    if (cartlist) {
      for (let i = 0; i < cartlist.length; i++) {
        sum = sum + parseFloat(cartlist[i].price);
      }
    }
    console.log(sum, "sss");
    if (sum == price) {
      setallChecked(true);
    } else {
      setallChecked(false);
    }
    console.log(isallchecked, "aaaaaa");
  };

  const letAll = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setallChecked(true);
      setIsSelect(true);
    } else {
      setallChecked(false);
      setIsSelect(false);
    }
  };

  return (
    <div>
      {cartlist &&
        cartlist.map((item, index) => {
          return (
            <div key={item.id}>
              <Checkbox
                onChange={(e) => getId(e, item)}
                checked={isselect}
                id={index}
              ></Checkbox>
              <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                  <Card.Body>
                    <Link to={`/detail/${item.id}`}>
                      <img
                        src={item.thumbs.split(",")[0]}
                        alt=""
                        className="cart-img"
                      />
                      <div className="cart-right">
                        <p className="cart-title">{item.title}</p>
                        <p className="cart-price">￥{item.price}</p>
                      </div>
                    </Link>
                    <div
                      className="delete"
                      onClick={() => {
                        props.history.push(`/cart/?title=购物车/${item.id}`);
                      }}
                    >
                      删除
                    </div>
                  </Card.Body>
                </Card>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          );
        })}
      <div className="jiesuan">
        <div className="jiesuan-select">
          <Checkbox
            checked={isallchecked}
            onChange={(e) => letAll(e, cartlist)}
          ></Checkbox>
          <div className="jiesuan-title">全选</div>
        </div>
        <div className="jiesuan-all">合计:￥{price}</div>
        <div className="jiesuan-btn">去结算</div>
      </div>
    </div>
  );
};

export default Cart;
