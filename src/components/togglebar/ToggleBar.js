import React, { useEffect, useState } from "react";
import Tab from "../tab/Tab";
import Tab2 from "../tab2/Tab2";
import { RouteComponentProps, withRouter } from "react-router-dom";

const ToggleBar = (props) => {
  console.log(props, "oooooooooo");
  let [barType, setBarType] = useState("tab2");
  //每当路由地址发生变化就会执行effect
  useEffect(() => {
    const path = props.history.location.pathname;
    console.log(path, "ppppppppppppppaaaaaaaaaaaahhhhhhhhh");
    let rootArr = ["/", "/cart/", "/user/", "/huasuan/", "/collect"];
    if (rootArr.includes(path)) {
      setBarType("tab");
    }
  }, [props.history.location.pathname]);

  return <React.Fragment>{barType === "tab" && <Tab></Tab>}</React.Fragment>;
};

export default withRouter(ToggleBar);
