import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginOut } from "../../actions/userAction";
import Tab from "../../components/tab/Tab";
import { fetchpost } from "../../utils/fetch";
import "./user.scss";
const User = (props) => {
  const [notPayCount, setNotPayCount] = useState();
  const [notSendCount, setNotSendCount] = useState();
  const [takeCount, setTakeCount] = useState();
  const [finishCount, setFinishCount] = useState();
  // let [username, setName] = useState("");
  let [pwd, setPwd] = useState("");
  let [img, setImg] = useState("");

  let [users, setUser] = useState([]);
  let [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin;
  console.log(userInfo, "uuuuuuuuuuuuuuuu");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    var { message } = await fetchpost("/api/user", users);
    console.log(message, "22222222222");
    setUser(message);
  };

  const changeLogin = () => {
    dispatch(loginOut());
    props.history.push("/");
  };

  return (
    <div>
      <div>
        <div className="my-header">
          <img src="../m-images/my-header-bg.jpg" alt="" />
          <a href="" className="person">
            <img src={userInfo.userInfo[0].img} />
            {userInfo && <span> {userInfo.userInfo[0].username} </span>}
          </a>
        </div>
        <div className="my-order">
          <div className="my-order-header">
            <span> 我的订单 </span>
            <Link to="order?type=0">
              <span className="see-all-order"> 查看全部订单 </span>
              <i className="com-right-tip"> </i>
            </Link>
          </div>
          <div className="my-header-con">
            <Link to="order?type=1">
              <div className="img-box">
                <img src="../m-images/order-1.png" alt="" />
                <span className="num">
                  {notPayCount === 0 ? "" : notPayCount}
                </span>
              </div>
              <p> 待付款 </p>
            </Link>
            <Link to="order?type=2">
              <div className="img-box">
                <img src="../m-images/order-2.png" alt="" />
                <span className="num">
                  {notSendCount === 0 ? "" : notSendCount}
                </span>
              </div>
              <p> 待发货 </p>
            </Link>
            <Link to="order?type=3">
              <div className="img-box">
                <img src="../m-images/order-3.png" alt="" />
                <span className="num">{takeCount === 0 ? "" : takeCount}</span>
              </div>
              <p> 待收货 </p>
            </Link>
            <Link to="order?type=4">
              <div className="img-box">
                <img src="../m-images/order-4.png" alt="" />
                <span className="num">
                  {finishCount === 0 ? "" : finishCount}
                </span>
              </div>
              <p> 已完成 </p>
            </Link>
          </div>
        </div>
        <div className="my-items">
          <Link to="/collect" className="items">
            <div className="item-bg-2">
              <span> 我的收藏 </span>
            </div>
            <div className="item-tips">
              <i className="com-right-tip"> </i>
            </div>
          </Link>
          <Link className="items" to="/address/?title=我的收获地址/1">
            <div className="item-bg-3">
              <span> 地址管理 </span>
            </div>
            <div className="item-tips">
              <i className="com-right-tip"> </i>
            </div>
          </Link>
        </div>
        <a href="" className="out-login" onClick={changeLogin}>
          退出登录
        </a>
      </div>
    </div>
  );
};

export default User;
