import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/home";
import User from "../pages/user";
import Huasuan from "../pages/huasuan";
import Cart from "../pages/cart";
import Detail from "../pages/detail";
import Youpin from "../pages/youpin";
import All from "../pages/all";
import Comments from "../pages/comments";
import Address from "../pages/address";
import addAddress from "../pages/addAddress";
import Category from "../pages/category";
import Search from "../pages/search";
import Collect from "../pages/collect";

const RouterMap = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/user" component={User}></Route>
      <Route path="/cart" component={Cart}></Route>
      <Route path="/huasuan" component={Huasuan}></Route>
      <Route path="/detail/:id" component={Detail}></Route>
      <Route path="/all" component={All}></Route>
      <Route path="/comments/:id" component={Comments}></Route>
      <Route path="/address" component={Address}></Route>
      <Route path="/addAddress" component={addAddress}></Route>
      <Route path="/category" component={Category}></Route>
      <Route path="/collect" component={Collect}></Route>
      <Route path="/search/:keywords?" component={Search}></Route>
      <Route path="/:youpin/:title?" component={Youpin}></Route>

      {/* <Route path="/hot" component={Hot}></Route>
      <Route path="/jifen" component={Jifen}></Route>
      <Route path="/pintuan" component={pinTuan}></Route>
      <Route path="/qinghuo" component={Qinghuo}></Route> */}
    </Switch>
  );
};

export default RouterMap;
