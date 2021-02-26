import React, { useEffect, useState } from 'react'
import Tab from '../tabs'
import Tab2 from '../tabs2'
import { RouteComponentProps, withRouter } from 'react-router-dom'
type ParamsProps = {
    id?: string | undefined
}
const ToggleBar: React.FC<RouteComponentProps<ParamsProps>> = (props) => {
    console.log(props,"oooooooooo");
    let [barType, setBarType] = useState("tab2")
    //每当路由地址发生变化就会执行effect
    useEffect(() => {
        const path = props.history.location.pathname;
        let id=path.slice(-4)
        let rootArr=['/','/cart','/user','/huasuan']
        let rootRouteArr = [`/detail/${id}`,`/comments/${id}`]
        if (rootRouteArr.includes(path)) {
            setBarType("tab2")
        }
        if (rootArr.includes(path)) {
            setBarType("tab")
        }
    }, [props.history.location.pathname])

    return <React.Fragment>
        {barType === "tab2" ? <Tab2></Tab2> : <Tab></Tab>}
    </React.Fragment>
}

export default withRouter(ToggleBar);