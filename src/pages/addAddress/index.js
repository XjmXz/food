import React, { useEffect, useState } from "react";
import { List, TextareaItem } from "antd-mobile";
import "./addAddress.scss";
import { fetchpost } from "../../utils/fetch";

const AddAddress = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  // const [addressList, setAddressList] = useState();

  useEffect(() => {}, []);
  const handleChange = (e) => {
    if (e.target.id == "name") {
      setName(e.target.value);
      return;
    }
    if (e.target.id == "phone") {
      setPhone(e.target.value);
      return;
    }
    if (e.target.id == "city") {
      setCity(e.target.value);
      return;
    }
    setAddress(e.target.value);
  };

  const handleSubmit = async () => {
    if (name && phone && address) {
      const addressList = {
        name: name,
        phone: phone,
        city: city,
        address: address,
      };
      console.log(addressList, "llllllllllllk");
      var { message } = await fetchpost("/api/addaddress", addressList);
      props.history.push("/address/?title=收货地址/1");
      // setName("");
      // setAddress("");
      // setPhone("");
    }
  };

  return (
    <div>
      <div className="addaddress">
        <label htmlFor="name">
          收货人
          <input
            type="text"
            placeholder="名字"
            value={name}
            className="name"
            id="name"
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="addaddress">
        <label htmlFor="phone">
          手机号码
          <input
            type="text"
            placeholder="手机号"
            value={phone}
            id="phone"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="addaddress">
        <label htmlFor="address">
          选择地区
          <input
            type="text"
            placeholder="省、市、区、街道"
            value={city}
            id="city"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="addaddress">
        <label htmlFor="address">
          详细地址
          <input
            type="text"
            placeholder="小区楼栋/乡村名称"
            value={address}
            id="address"
            onChange={handleChange}
          />
        </label>
      </div>
      <button className="address-btn" onClick={handleSubmit}>
        提交
      </button>
    </div>
  );
};

export default AddAddress;
