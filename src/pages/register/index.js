import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchget, fetchpost } from "../../utils/fetch";

const Register = (props) => {
  let [username, setName] = useState("");
  let [pwd, setPwd] = useState("");
  let [img, setImg] = useState("");
  const handleChange = (e) => {
    if (e.target.id == "name") {
      setName(e.target.value);
      return;
    }
    if (e.target.id == "pwd") {
      setPwd(e.target.value);
      return;
    }
    setImg(e.target.value);
  };

  const handleSubmit = async () => {
    if (username && pwd) {
      const user = {
        username: username,
        pwd: pwd,
        img: img,
      };
      console.log(user, "llllllllllllk");
      var { message } = await fetchpost("/api/adduser", user);
      props.history.push("/login/?title=登录/1");
    }
  };

  return (
    <div className="login">
      <h1> 亲， 欢迎注册 </h1>
      <div>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          id="name"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="密码"
          value={pwd}
          id="pwd"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="头像"
          value={img}
          id="img"
          onChange={handleChange}
        />
      </div>
      <button className="address-btn" onClick={handleSubmit}>
        注册
      </button>
    </div>
  );
};

export default Register;
