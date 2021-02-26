import React, { useState, useEffect } from "react"
import { SearchBar,PullToRefresh } from 'antd-mobile';
import { Link } from 'react-router-dom'
import { fetchget } from "../../utils/fetch"
type IProps = Readonly<{
    item: any;
    changePageIndex?(): void
}>

const Youpin: React.FC<IProps> = (props) => {
    let [productList, setProductList] = useState<any>([]);
    let [pageIndex, setPageIndex] = useState(1)
    let [refreshing, setRefreshing] = useState(false);
    let [down, setDown] = useState(false)
    let [height, setHeight] = useState(document.documentElement.clientHeight)

    useEffect(() => {
        setRefreshing(false)
    }, [productList])
    useEffect(() => {
        getProducts();
    }, [pageIndex])

    const getProducts = async () => {
        var { message: products } = await fetchget(`/api/yanxuan/${pageIndex}`)
        console.log(products, "ppppppppppppppppppppppppppppppp");

        setProductList([...productList, ...products])
    }

    return (<div>
        <SearchBar placeholder="您想搜点啥" maxLength={8} />
        <PullToRefresh
            distanceToRefresh={30}
            style={{
                height: height - 100,
                overflow: 'auto',
            }}
            indicator={down ? {} : { deactivate: '' }}
            direction={down ? 'down' : 'up'}
            refreshing={refreshing}
            onRefresh={() => {
                console.log("正在刷新")
                setRefreshing(true)
                setTimeout(() => {
                    setPageIndex(++pageIndex);
                    setRefreshing(false)
                }, 1000);
               // props.changePageIndex && props.changePageIndex();
            }}
            getScrollContainer={() => (undefined)}
        >
            <div>
                {productList && productList.map((item: { gid: string | number | null | undefined; thumb: string | undefined; title: React.ReactNode; productprice: React.ReactNode; min_price: React.ReactNode; }) => {
                    return <div className="grid-item" >
                        <Link to={`/detail/${item.gid}`} key={item.gid} >
                            <img src={item.thumb} alt="" />
                            <div className="grid-item-main">
                                <p className="grid-item-title">{item.title}</p>
                                <p className="gird-item-p">原价：￥{item.productprice}</p>
                                <span>￥{item.min_price}</span>
                            </div>
                        </Link>
                    </div>
                })}
            </div>
        </PullToRefresh>
    </div>)
}

export default Youpin