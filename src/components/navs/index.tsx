import React, { useContext } from 'react'
import './navs.scss'
import { NavBar, Icon, SearchBar } from 'antd-mobile';
import Context from "../../context"
import { Link } from "react-router-dom"

const Nav: React.FC = () => {
  // let [city, dispatch] = useContext(Context)
  // console.log(city, "11111111111111");

  return (<NavBar
    mode="dark"
    leftContent={<div>
      <Link to="/city">
        {/* {city} */}
      </Link>
    </div>}
    rightContent={[
      <span key="1" style={{ fontFamily: "icomoon" }} className="icon-user"></span>
    ]}
  > <SearchBar placeholder="Search" maxLength={8} /></NavBar>)
}

export default Nav
