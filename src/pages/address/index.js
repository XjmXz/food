import React, { useState } from "react";
import "./address.scss";
import address from "../../static/images/邮寄地址.png";
import { Link } from "react-router-dom";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";

const Address = () => {
  let [addressList, setAddressList] = useState([]);
  return (
    <div>
      {addressList.length < 1 && (
        <div className="address-none">
          <img src={address} alt="" />
          <p className="p1">一个地址也没有</p>
          <p className="p2">"赶快添加收获地址，买买买吧"</p>
        </div>
      )}
      {addressList.length > 0 && (
        <div>
          <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header
                title="This is title"
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                extra={<span>this is extra</span>}
              />
              <Card.Body>
                <div>This is content of `Card`</div>
              </Card.Body>
              <Card.Footer
                content="footer content"
                extra={<div>extra footer content</div>}
              />
            </Card>
            <WhiteSpace size="lg" />
          </WingBlank>
        </div>
      )}
      <Link to="/addAddress/?title=添加收获地址/1">
        <button className="address-btn">添加收获地址</button>
      </Link>
    </div>
  );
};

export default Address;
