import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchget, fetchpost } from "../../utils/fetch";
import { listOrder, listAddress } from "../../actions/userAction";
import "./order.scss";
import orderAddress from "../../static/images/地址.png";

import { Card, WingBlank, WhiteSpace } from "antd-mobile";

const Order = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orderlist } = orderList;

  const addressList = useSelector((state) => state.addressList);
  const { addresss } = addressList;

  useEffect(() => {
    dispatch(listOrder());
    dispatch(listAddress());
  }, [dispatch]);

  console.log(orderlist);

  let price = 0;
  if (orderlist) {
    for (let i = 0; i < orderlist.length; i++) {
      price = price + parseFloat(orderlist[i].price * orderlist[i].count);
    }
  }

  //   for(){

  //   }

  return (
    <div>
      <div>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <div className="order">
            <img src={orderAddress} alt="" />
            {addresss && (
              <div className="order-address">
                <div>
                  <span className="order-name">{addresss[0].name}</span>
                  <span className="order-phone">{addresss[0].phone}</span>
                </div>
                <div className="order-city">
                  <span>{addresss[0].city}</span>
                  <span>{addresss[0].address}</span>
                </div>
                <div className="service">收货不便时，可选择暂存服务</div>
              </div>
            )}
          </div>
          <WhiteSpace size="lg" />
        </WingBlank>
      </div>
      <div>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <div className="orderlist">
            {orderlist &&
              orderlist.map((item) => {
                return (
                  <div>
                    <img
                      src={item.thumbs.split(",")[0]}
                      alt=""
                      className="orderlist-img"
                    />
                    <div className="order-detail">
                      <div className="order-title">{item.title}</div>
                      <div className="order-price">{item.price}</div>
                      <div className="order-count">x{item.count}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          <WhiteSpace size="lg" />
        </WingBlank>
      </div>
      <div className="order-submit">
        {orderlist && <div className="count">共{orderlist.length}件,</div>}
        <div className="all-price">
          合计:<span>￥{price}</span>
        </div>
        <div className="submit">提交订单</div>
      </div>
    </div>
  );
};

export default Order;
