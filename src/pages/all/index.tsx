import React, { useState, useEffect } from "react"
import { Tabs } from 'antd-mobile';
import { fetchget } from "../../utils/fetch"
import { RouteComponentProps } from 'react-router-dom'
import "./all.scss"

type ParamsProps = {
    id?: string | undefined
}

const All: React.FC<RouteComponentProps<ParamsProps>> = (props) => {
    let [category, setCategory] = useState<any>();
    let [categorys, setCatesgory] = useState<any>();
    let [productList, setProductList] = useState<any>([]);
    useEffect(() => {
        getAllcate();
        getCateProduct();
    }, [])


    useEffect(() => {
        getAllcates();
    }, [props.location.search])
    const goFenlei = (product: any) => {
        props.history.push(`/all/?title=全部分类/${product.id}`)

    }

    const getAllcate = async () => {
        var { message } = await fetchget('/api/category')
        setCategory(message)

    }
    var gid = props.location.search.slice(-1)
    console.log(gid);
    const getCateProduct = async () => {
        var { message: products } = await fetchget(`/api/daily/${props.match.params.id}`)
        setProductList(products)
    }

    const getAllcates = async () => {

        var { message } = await fetchget(`/api/category/${gid}`)
        setCatesgory(message)
        console.log(message, "gggggggggg")
    }


    return (<div>
        <div>
            <Tabs tabs={category} onTabClick={goFenlei} onChange={(onChange) => {
                console.log(onChange.id, "ddddddd")
            }} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}>
                <div style={{ display: 'flex', height: '750px' }}>
                    <div className="category">
                        <div className="category-item">
                            {categorys && categorys.items.products.map((item: any, index: any) => {
                                return <div key={item.gid} className="grid-item" >
                                    <img src={item.img} alt="" />
                                    <div>
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    </div>)
}

export default All