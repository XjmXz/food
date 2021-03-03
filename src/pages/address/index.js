import React, { useState, useEffect } from "react";
import "./address.scss";
import address from "../../static/images/邮寄地址.png";
import { Link } from "react-router-dom";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";
import { fetchget, fetchpost } from "../../utils/fetch";

const Address = (props) => {
  let [addressList, setAddressList] = useState([]);

  const getAddressList = async () => {
    var { message } = await fetchget("/api/address");
    setAddressList(message);
    console.log(message);
  };

  useEffect(() => {
    getAddressList();
    cut();
  }, [props.location.search]);

  var id = props.location.search.split("/")[1];

  const cut = async () => {
    var { message } = await fetchpost(`/api/deleteAddress/${id}`, addressList);
  };

  // const deleteAddress = (e) => {
  //   cut();
  // };

  return (
    <div>
      {addressList.length < 1 && (
        <div className="address-none">
          <img src={address} alt="" />
          <p className="p1">一个地址也没有</p>
          <p className="p2">"赶快添加收获地址，买买买吧"</p>
        </div>
      )}
      {addressList.length > 0 &&
        addressList.map((item, index) => {
          return (
            <div>
              <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                  <Card.Body>
                    <div className="address-top">
                      <div className="address-img">
                        <div className="address-img-title">{item.name}</div>
                      </div>
                      <div className="address-main">
                        <span className="main-name">{item.name}</span>
                        <span className="main-phone">{item.phone}</span>
                        <div className="address-address">
                          {item.city}
                          {item.address}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer
                    extra={
                      <div
                        className="address-cut"
                        onClick={(deleteAddress) => {
                          props.history.push(
                            `/address/?title=我的收获地址/${item.id}`
                          );
                        }}
                      >
                        删除
                      </div>
                    }
                  />
                </Card>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          );
        })}
      <Link to="/addAddress/?title=添加收获地址/1" className="btn">
        <button className="address-btn">添加收获地址</button>
      </Link>
    </div>
  );
};

export default Address;
