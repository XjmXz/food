import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import { fetchget, fetchpost } from "../../utils/fetch";
import { login } from "../../actions/userAction";
import { Link } from "react-router-dom";

const Login = (props) => {
  let [username, setName] = useState("");
  let [pwd, setPwd] = useState("");

  let [users, setUser] = useState([]);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = props.location.search
    ? props.location.search.split("/")[1]
    : "/user/?title=我的/1";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  const handleChange = (e) => {
    if (e.target.id == "name") {
      setName(e.target.value);
      return;
    }
    setPwd(e.target.value);
  };
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    var { message } = await fetchget("/api/users");
    console.log(message, "22222222222");
    setUser(message);
  };

  const handleSubmit = () => {
    if (users) {
      let fg = users.map((item) => {
        if (item.username === username) return true; //用户名已存在
      });
      if (fg) {
        //fg为真找到用户名，接下里对密码判断
        //对存储数据遍历，比对用户名名与密码
        let f = false;
        users.map((item) => {
          if (item.username === username && item.pwd === pwd) {
            f = true;
            return f;
          }
        });
        if (f) {
          //查询正确可以正常登录
          dispatch(login(username, pwd));
          console.log("登录成功");
        } else {
          alert("用户名或密码错误");
        }
      }
    }
  };
  return (
    <div className="login">
      <h1> 亲， 欢迎登录 </h1>
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
      <button className="address-btn" onClick={handleSubmit}>
        登录
      </button>
      <Link to="/register/?title=注册/1">还没有账号？去注册</Link>
    </div>
  );
};

export default Login;
