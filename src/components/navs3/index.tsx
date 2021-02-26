import React, { useContext } from 'react'
import './navs3.scss'
import { NavBar, Icon, SearchBar } from 'antd-mobile';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Context from "../../context"

const Nav3: React.FC<RouteComponentProps> = (props) => {
  let [city, dispatch] = useContext(Context)
  console.log(city, "11111111111111");

  return (<NavBar
    mode="dark"
    icon={<Icon type="left" />}
    onLeftClick={() => { props.history.go(-1) }}
     rightContent={[
      <div style={{
        fontFamily: "icomoon",
        fontSize: "18px",
        width: "22px",
        height: "22px",
    }}
    className="icon-share2"
      />,
      <Icon key="1" type="ellipsis" />,
    ]}
  > <SearchBar placeholder="Search" maxLength={8} /></NavBar>)
}

export default withRouter(Nav3)
