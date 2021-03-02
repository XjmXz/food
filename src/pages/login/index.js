import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import { fetchpost } from "../../utils/fetch";
import { login } from "../../actions/userAction";

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
    var { message } = await fetchpost("/api/user", users);
    console.log(message, "22222222222");
    setUser(message);
  };

  const handleSubmit = () => {
    dispatch(login(username, pwd));
    // if (username && pwd) {
    //   let obj = {
    //     username,
    //     pwd,
    //   };
    //   console.log(obj, "uuuuuu");
    // }
    // if (users) {
    //   let fg = users.map((item) => {
    //     if (item.username === username) return true; //用户名已存在
    //   });
    //   if (fg) {
    //     let f = false;
    //     users.map((item) => {
    //       if (item.username === username && item.pwd === pwd) {
    //         f = true;
    //         return f;
    //       }
    //     });
    //     if (f) {
    //       //查询正确可以正常登录
    //       console.log("登录成功");
    //       props.history.push("/user/?title=我的/1");
    //     } else {
    //       console.log("密码错误");
    //     }
    //   }
    // }
  };
  return (
    <div>
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
    </div>
  );
};

export default Login;
