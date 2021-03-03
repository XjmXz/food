import React, { useState } from "react";
import { List, TextareaItem } from "antd-mobile";
import "./addAddress.scss";

const AddAddress = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    if (e.target.id == "name") {
      setName(e.target.value);
      return;
    }
    if (e.target.id == "phone") {
      setPhone(e.target.value);
      return;
    }
    setAddress(e.target.value);
  };

  const handleSubmit = () => {
    if (name && phone && address) {
      const addressList = {
        name: name,
        phone: phone,
        address: address,
      };
      // 把数据从CmtBox传递给CmtList(子传父)
      // console.log("发表评论", comment)
      // 子传父第三步：在子组件的点击事件中触发父组件传递过来的方法
      console.log(addressList, "llllllllllllk");
      setName("");
      setAddress("");
      setPhone("");
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="收货人"
          value={name}
          id="name"
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="手机号码"
          value={phone}
          id="phone"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="详细地址"
          value={address}
          id="address"
          onChange={handleChange}
        />
      </div>
      <button className="address-btn" onClick={handleSubmit}>
        提交
      </button>
    </div>
  );
};

export default AddAddress;
