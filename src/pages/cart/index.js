import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchget, fetchpost } from "../../utils/fetch";
import { login, listCart } from "../../actions/userAction";
import "./cart.scss";
import { Card, WingBlank, WhiteSpace, Checkbox, Stepper } from "antd-mobile";
import { Link } from "react-router-dom";

const Cart = (props) => {
  let [sumPrice, setPrice] = useState(0);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartList);
  const { cartlist } = cartList;

  let [selectlist, setSelectList] = useState();
  let [isallchecked, setallChecked] = useState(false);
  let [isselect, setIsSelect] = useState(false);
  let [count, setCount] = useState();
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
    getSumPrice();
    getSumCount();
  }, [cartlist]);
  let sum = 0;
  const delteCart = async () => {
    var { message } = await fetchpost(`/api/deletecart/${id}`, cartList);
  };
  const getSumPrice = async () => {
    var { message } = await fetchget("/api/sumPrice");
    setPrice(message[0].sum);
  };
  let selectList = [];
  const getSumCount = async () => {
    var { message } = await fetchget("/api/sumCount");
    if (cartlist) {
      if (message[0].sumCount == cartlist.length) {
        setallChecked(true);
      } else {
        setallChecked(false);
      }
    }
  };

  const click = async (e, id) => {
    let flag = 0;
    for (let i = 0; i < cartlist.length; i++) {
      console.log(i, "aaa");
      if (cartlist[i].isXuan == 1) {
        console.log(i);
        flag = flag + 1;
      }
      if (flag + 1 == cartlist.length) {
        setallChecked(true);
      } else {
        setallChecked(false);
      }

      if (cartlist[i].id == id && cartlist[i].isXuan == 0) {
        var result = await fetchpost("/api/updateXuan", { id: id });
        dispatch(listCart());
      } else if (cartlist[i].id == id && cartlist[i].isXuan == 1) {
        var result = await fetchpost("/api/updateNoXuan", { id: id });
        dispatch(listCart());
      }
    }
  };
  const select = async (e) => {
    console.log(e.target.checked, "pppp");
    if (e.target.checked) {
      setallChecked(true);
      for (let i = 0; i < cartlist.length; i++) {
        var result = await fetchpost("/api/updateXuan", { id: cartlist[i].id });
        // sum = sum + cartlist[i].price * cartlist[i].count;
        dispatch(listCart());
      }
    } else {
      setallChecked(false);
      for (let i = 0; i < cartlist.length; i++) {
        var result = await fetchpost("/api/updateNoXuan", {
          id: cartlist[i].id,
        });
        dispatch(listCart());
      }
    }
  };

  const onChange = async (count, item) => {
    // console.log(item, "val");
    // console.log(e, "kkk");
    setCount(count);
    var result = await fetchpost("/api/updateCount", {
      count: count,
      id: item.id,
    });
    getSumPrice();
  };
  return (
    <div>
      {cartlist &&
        cartlist.map((item, index) => {
          return (
            <div key={item.id}>
              <Checkbox
                checked={item.isXuan == 0 ? false : true}
                onClick={(e) => click(e, item.id)}
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

                        {/* <p className="cart-price">{item.count}</p> */}
                      </div>
                    </Link>
                    <Stepper
                      style={{
                        width: "100px",
                        minWidth: "50px",
                        marginTop: "-40px",
                        marginLeft: "190px",
                      }}
                      showNumber
                      max={10}
                      min={1}
                      defaultValue={item.count}
                      onChange={(count) => onChange(count, item)}
                    />
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
            onClick={(e) => {
              select(e);
            }}
          ></Checkbox>
          <div className="jiesuan-title">全选</div>
        </div>
        <div className="jiesuan-all">合计:￥{sumPrice || 0}</div>
        <Link className="jiesuan-btn" to="/order/?title=确认订单/0">
          去结算
        </Link>
      </div>
    </div>
  );
};

export default Cart;
