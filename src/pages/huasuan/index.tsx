import React, { useState,useEffect } from "react"
import { SearchBar} from 'antd-mobile';
import { Link } from 'react-router-dom'
import { fetchget } from "../../utils/fetch"

const HuaSuan:React.FC=(props)=>{
    let[title,setTitle]=useState();
    let [productList, setProductList] = useState<any>([]);
    let [pageIndex, setPageIndex] = useState(1)
    let [refreshing, setRefreshing] = useState(false);
    let [down, setDown] = useState(false)
    let [height, setHeight] = useState(document.documentElement.clientHeight)

    useEffect(() => {
        getProducts();
    }, [])

    console.log(props,"oooooooooo");
    const getProducts = async () => {
        var { message: products } = await fetchget('/api/huasuan')
        console.log(products, "ppppppppppppppppppppppppppppppp");
        setProductList(products)
    }

    return (<div>
        <div>
                {productList && productList.map((item:any) => {
                    return <div className="grid-item" >
                        <Link to={`/detail/${item.id}`} key={item.gid} >
                            <img src={item.url} alt="" />
                            <div className="grid-item-main">
                                <p className="grid-item-title">{item.title}</p>
                                <span>￥{item.price}</span>
                            </div>
                        </Link>
                    </div>
                })}
            </div>
    </div>)
}

export default HuaSuan