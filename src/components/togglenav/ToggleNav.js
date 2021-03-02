import React, { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import Nav2 from "../nav2/Nav2";
import Nav3 from "../nav3/Nav3";
import { RouteComponentProps, withRouter } from "react-router-dom";

const ToggleNav = (props) => {
  let [navType, setNavType] = useState("nav");
  //每当路由地址发生变化就会执行effect
  useEffect(() => {
    const path = props.history.location.pathname;
    let id = path.slice(-4);
    let rootRouteArr = ["/"];
    let Arr = [`/detail/${id}`, `/comments/${id}`, "/search"];
    if (rootRouteArr.includes(path)) {
      setNavType("nav");
    } else {
      setNavType("nav2");
    }
    if (Arr.includes(path)) {
      setNavType("nav3");
    }
  }, [props.history.location.pathname]);

  return (
    <React.Fragment>
      {navType === "nav" ? (
        <Nav> </Nav>
      ) : navType === "nav2" ? (
        <Nav2> </Nav2>
      ) : (
        <Nav3> </Nav3>
      )}
    </React.Fragment>
  );
};

export default withRouter(ToggleNav);
