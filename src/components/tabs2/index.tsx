import { TabBar } from 'antd-mobile'
import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import './tabs2.scss'

const Tab2: React.FC<RouteComponentProps> = (props) => {
    let [hidden, setHidden] = useState(false)
    let [selectedTab, setSelectedTab] = useState("home")
    return (<div className="tabs2">
        <div className="icon">
            <TabBar>
                <TabBar.Item
                    title="购物车"
                    key="Life"
                    icon={<div style={{
                        fontFamily: "icomoon",
                        fontSize: "20px",
                        width: "22px",
                        height: "22px",
                    }}
                        className="icon-cart1"
                    />
                    }
                    selectedIcon={<div style={{
                        fontFamily: "icomoon",
                        fontSize: "20px",
                        width: "22px",
                        height: "22px",
                    }}
                        className="icon-cart1"
                    />
                    }
                    selected={selectedTab === 'cart1'}
                    onPress={() => {
                        setSelectedTab("cart1")
                        props.history.push("/cart")

                    }}
                    data-seed="logId"
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            fontFamily: "icomoon",
                            fontSize: "20px",
                            width: "22px",
                            height: "22px",
                        }}
                            className="icon-star-empty"
                        />
                    }
                    selectedIcon={
                        <div style={{
                            fontFamily: "icomoon",
                            fontSize: "20px",
                            width: "22px",
                            height: "22px",
                        }}
                            className="icon-star-full"
                        />
                    }
                    title="收藏"
                    key="Koubei"
                    selected={selectedTab === 'huasuan'}
                    onPress={() => {
                        setSelectedTab("huasuan")
                    }}
                    data-seed="logId1"
                >
                </TabBar.Item>
            </TabBar>
            {/* <div style={{
                fontFamily: "icomoon",
                fontSize: "20px",
                width: "22px",
                height: "22px",
            }}
                className="icon-cart1"
            />

            <div style={{
                fontFamily: "icomoon",
                fontSize: "20px",
                width: "22px",
                height: "22px",
            }}
                className="icon-star-empty"
            />
            收藏 */}
        </div>
        <div className="btn">
            <div className="btn_l" >加入购物车</div>
            <div className="btn_r">立即购买</div>
        </div>

    </div>)
}

export default withRouter(Tab2);