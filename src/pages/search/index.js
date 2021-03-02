import React, { useContext, useEffect, useState } from "react";
import { NavBar, Icon, SearchBar } from "antd-mobile";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { fetchget } from "../../utils/fetch";
const Search = (props) => {
  const [keywords, setKeyword] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    submitHandler();
  }, []);

  const submitHandler = async (e) => {
    var { message } = await fetchget(`/api/search/${e}`);
    setProducts(message);
    console.log(message, "mmmmmmmmmmm");
  };

  return (
    <div>
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
          onSubmit={submitHandler}
        />
      </NavBar>
      <div>
        {products &&
          products.map((item) => {
            return (
              <div className="grid-item">
                <Link to={`/detail/${item.gid}`} key={item.gid}>
                  <img src={item.thumb} alt="" />
                  <div className="grid-item-main">
                    <p className="grid-item-title">{item.title}</p>
                    <p className="gird-item-p">原价：￥ {item.productprice}</p>
                    <span>￥{item.price}</span>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
