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
    if (name && phone) {
      const user = {
        name: name,
        phone: phone,
        city: city,
        address: address,
      };
      console.log(user, "llllllllllllk");
      var { message } = await fetchpost(`/api/updateaddress/${id}`, user);
      props.history.push("/address/?title=收货地址/0");
    }
  };

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
                defaultValue={editaddress.name}
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
                defaultValue={editaddress.phone}
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
                defaultValue={editaddress.city}
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
                defaultValue={editaddress.address}
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
