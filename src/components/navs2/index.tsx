import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { NavBar,Icon} from 'antd-mobile';
import url from "url";

const Nav2:React.FC<RouteComponentProps>=(props)=>{
    const httpUrl = props.location.search;
    const query = url.parse(httpUrl, true).query;

    let index,title;

    if(query.title){
        index=query.title.lastIndexOf('/')
        title=query.title.slice(0,index)
    }

    return (<NavBar mode="dark"
    icon={<Icon type="left" />}
    onLeftClick={() => { props.history.go(-1) }}>{title}</NavBar>)
}

export default withRouter(Nav2);
