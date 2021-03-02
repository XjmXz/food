import React, { useState } from "react";
import "./tabs.scss";
import { TabBar } from "antd-mobile";
import { withRouter, RouteComponentProps } from "react-router-dom";

const Tab = (props) => {
  let [hidden, setHidden] = useState(false);
  let [selectedTab, setSelectedTab] = useState("home");

  return (
    <div className="tab">
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={hidden}
      >
        <TabBar.Item
          title="首页"
          key="Life"
          icon={
            <div
              style={{
                fontFamily: "icomoon",
                fontSize: "18px",
                width: "22px",
                height: "22px",
              }}
              className="icon-home"
            />
          }
          selectedIcon={
            <div
              style={{
                fontFamily: "icomoon",
                fontSize: "18px",
                width: "22px",
                height: "22px",
              }}
              className="icon-home"
            />
          }
          selected={selectedTab === "home"}
          onPress={() => {
            setSelectedTab("home");
            props.history.push("/");
          }}
          data-seed="logId"
        ></TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                fontFamily: "icomoon",
                fontSize: "18px",
                width: "22px",
                height: "22px",
              }}
              className="icon-coin-yen"
            />
          }
          selectedIcon={
            <div
              style={{
                fontFamily: "icomoon",
                fontSize: "18px",
                width: "22px",
                height: "22px",
              }}
              className="icon-coin-yen"
            />
          }
          title="聚划算"
          key="Koubei"
          selected={selectedTab === "huasuan"}
          onPress={() => {
            setSelectedTab("huasuan");
            props.history.push("/huasuan/?title=聚划算/7");
          }}
          data-seed="logId1"
        ></TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                fontFamily: "icomoon",
                fontSize: "18px",
                width: "22px",
                height: "22px",
              }}
              className="icon-cart"
            />
          }
          selectedIcon={
            <div
              style={{
                fontFamily: "icomoon",
                fontSize: "18px",
                width: "22px",
                height: "22px",
              }}
              className="icon-cart"
            />
          }
          title="购物车"
          key="Friend"
          selected={selectedTab === "cart"}
          onPress={() => {
            setSelectedTab("cart");
            props.history.push("/cart/?title=购物车/1");
          }}
        ></TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                fontFamily: "icomoon",
                fontSize: "18px",
                width: "22px",
                height: "22px",
              }}
              className="icon-user"
            />
          }
          selectedIcon={
            <div
              style={{
                fontFamily: "icomoon",
                fontSize: "18px",
                width: "22px",
                height: "22px",
              }}
              className="icon-user"
            />
          }
          title="我的"
          key="my"
          selected={selectedTab === "user"}
          onPress={() => {
            setSelectedTab("user");
            props.history.push("/user/?title=登录/1");
          }}
        ></TabBar.Item>
      </TabBar>
    </div>
  );
};

export default withRouter(Tab);
