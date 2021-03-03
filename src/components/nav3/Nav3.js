import React, { useContext, useEffect, useState } from "react";
import "./navs3.scss";
import { NavBar, Icon, SearchBar } from "antd-mobile";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { fetchget } from "../../utils/fetch";
const Nav3 = (props) => {
  //   const [keywords, setKeyword] = useState();
  //   const [products, setProducts] = useState();

  //   useEffect(() => {
  //     submitHandler();
  //   }, []);

  //   const submitHandler = async (e) => {
  //     var { message } = await fetchget(`/api/search/${e}`);
  //     setProducts(message);
  //     console.log(message, "mmmmmmmmmmm");
  //   };

  return (
    <NavBar
      mode="dark"
      icon={<Icon type="left" />}
      onLeftClick={() => {
        props.history.go(-1);
      }}
      rightContent={[
        <div
          style={{
            fontFamily: "icomoon",
            fontSize: "18px",
            width: "22px",
            height: "22px",
          }}
          className="icon-share2"
        />,
        <Icon key="1" type="ellipsis" />,
      ]}
    >
      <SearchBar
        placeholder="Search"
        maxLength={8}
        // onChange={(e) => setKeyword(e.target.value)}
      />
    </NavBar>
  );
};

export default withRouter(Nav3);
