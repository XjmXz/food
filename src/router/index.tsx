import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home'
import City from '../pages/city'
import Detail from '../pages/detail'
import Login from '../pages/user/login'
import User from '../pages/user'
import Cart from '../pages/cart'
import HuaSuan from '../pages/huasuan'
import Youpin from '../pages/youpin'
import All from '../pages/all'
import Hot from '../pages/hot'
import Jifen from '../pages/jifen'
import Pintuan from '../pages/pintuan'
import Qinghuo from '../pages/qinghuo'
import Comments from '../pages/comments'
import Address from '../pages/address'
import addAddress from '../pages/addAddress'

const RouterMap: React.FC = () => {
    return <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/city" component={City}></Route>
        <Route path="/detail/:id" component={Detail}></Route>
        <Route path="/login" component={Login} ></Route>
        <Route path="/user" component={User}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/huasuan" component={HuaSuan}></Route>
        <Route path="/youpin" component={Youpin}></Route>
        <Route path="/all" component={All}></Route>
        <Route path="/hot" component={Hot}></Route>
        <Route path="/jifen" component={Jifen}></Route>
        <Route path="/pintuan" component={Pintuan}></Route>
        <Route path="/qinghuo" component={Qinghuo}></Route>
        <Route path="/comments/:id" component={Comments}></Route>
        <Route path="/address" component={Address}></Route>
        <Route path="/addAddress" component={addAddress}></Route>
    </Switch>
}

export default RouterMap;