import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAddress } from "../../actions/userAction";
import { List, TextareaItem } from "antd-mobile";
import { fetchget, fetchpost } from "../../utils/fetch";

const EditAddress = (props) => {
  let [name, setName] = useState("");
  let [address, setAddress] = useState("");
  let [city, setCity] = useState("");
  let [phone, setPhone] = useState("");
  let [editaddress, setEditAddress] = useState();

  //   const dispatch = useDispatch();
  //   const addressList = useSelector((state) => state.addressList);
  //   const { loading, error, addresss } = addressList;
  var id = props.location.search.split("/")[1];
  console.log(id);

  //   useEffect(() => {
  //     dispatch(listAddress());
  //   }, [dispatch]);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    var { message } = await fetchget(`/api/address/${id}`);
    setEditAddress(...message);
  };
  //   if (editaddress) {
  //
  //     phone = editaddress.phone;
  //     city = editaddress.city;
  //     address = editaddress.address;
  //   }

  const handleChange = (e) => {
    setName(e.target.value);
    setPhone(e.target.value);
    setCity(e.target.value);
    setAddress(e.target.value);
  };

  const handleSubmit = () => {};

  return (
    <div>
      {editaddress && (
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
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          <div className="addaddress">
            <label htmlFor="phone">
              手机号码
              <input
                type="text"
                placeholder="手机号"
                value={editaddress.phone}
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
                value={editaddress.city}
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
                value={editaddress.address}
                id="address"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      )}
      <button className="address-btn" onClick={handleSubmit}>
        提交
      </button>
    </div>
  );
};

export default EditAddress;
