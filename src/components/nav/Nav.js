import React from "react";
import "./navs.scss";
import { NavBar, Icon, SearchBar } from "antd-mobile";
import { Link, withRouter } from "react-router-dom";

const Nav = ({ history }) => {
  const goSearch = () => {
    history.push("/search");
  };
  return (
    <div>
      <NavBar
        mode="dark"
        leftContent={
          <div>
            <Link to="/city">{/* {city} */}</Link>
          </div>
        }
        rightContent={[
          <span
            key="1"
            style={{ fontFamily: "icomoon" }}
            className="icon-user"
          ></span>,
        ]}
      >
        <SearchBar placeholder="您想搜点啥" maxLength={8} onFocus={goSearch} />
      </NavBar>
    </div>
  );
};

export default withRouter(Nav);
