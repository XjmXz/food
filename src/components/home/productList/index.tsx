import React, { useState, useEffect } from "react"
import { PullToRefresh } from 'antd-mobile';
import { Link } from 'react-router-dom'
import "./product.scss"

type IProps = Readonly<{
    list: any[];
}>

const ProductList: React.FC<IProps> = (props) => {
    let [refreshing, setRefreshing] = useState(false);
    let [down, setDown] = useState(false)
    let [height, setHeight] = useState(document.documentElement.clientHeight)

    useEffect(() => {
        setRefreshing(false)
    }, [props.list])

    const getProductId = () => {
        console.log(props.list, "555555555555555");

    }
    return (
        <div>
            <h2>猜你喜欢</h2>
            <div>
                    {props.list.map(item => {
                        return <div className="grid-item" >
                            <Link to={`/detail/${item.gid}`} key={item.gid} >
                                <img src={item.thumb} alt="" />
                                <div className="grid-item-main">
                                    <p className="grid-item-title">{item.title}</p>
                                    <p className="gird-item-p">原价：￥{item.productprice}</p>
                                    <span>￥{item.price}</span>
                                </div>
                            </Link>
                            <span className="shopping" onClick={getProductId}>购买</span>
                        </div>
                    })}
                </div>
        </div>)
}

export default ProductList