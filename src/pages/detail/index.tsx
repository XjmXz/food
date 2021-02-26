import React, { useState, useEffect } from "react"
import { fetchget } from "../../utils/fetch"
import { RouteComponentProps, Link } from 'react-router-dom'
import { Modal, List, Button, Carousel, Icon } from 'antd-mobile';
import "./detail.scss"
import { useDispatch, useSelector } from "react-redux";
import {listProductDetail} from '../../actions/productAction'

type ParamsProps = {
    id?: string | undefined
}

  
//   // TS infers type: (state: RootState) => boolean
//   const  selectIsOn  =  (state: RootState)  => state.isOn
  
//   // TS infers `isOn` is boolean
//   const isOn =  useSelector(selectIsOn)
const Detail: React.FC<RouteComponentProps<ParamsProps>> = ({ match }) => {
    const [product, setProduct] = useState({ id: 'id', title: 'title', thumbs: 'thumbs', content: '', subtitle: '', price: '', origin_price: '', dispatchprice: '', credit: '' })
    const [comments, setComments] = useState<any>([])
    const [modal, setModal] = useState(false);
    let [count,setConut]=useState(1)
    let [pageIndex, setPageIndex] = useState(1)

    const dispatch=useDispatch();
    // const  productDetail  =  (state: RootState)  => state.product
    // const productDetail=useSelector((state:any)=>{state.productDetail})
    // const isOn =  useSelector(productDetail)

    // console.log(productDetail,"777777777777777");
    
   
    const showModal = () => {
        setModal(true)
    }
    const showModal2 = () => {
        setModal(false)
    }
    useEffect(() => {
        dispatch(listProductDetail(match.params.id))
        getProductDetail();
        getComments();
    }, [dispatch,match])

    const getProductDetail = async () => {
        var { message } = await fetchget(`/api/detail/${match.params.id}`)
        setProduct(message[0])
        // console.log(message[0].thumbs.split(","), "ppppppppppppp");
        // console.log(message[0].thumbs, "pppppppp");
    }
    // console.log(product.thumbs.split(","), "8888888888888");

    const getComments = async () => {
        var { message: data } = await fetchget(`/api/comments/${match.params.id}`)
        setComments(data);
        console.log(data, "dddddddddd");
    }

    const addCount=()=>{
        setConut(++count)
    }
    const minusCount=()=>{
        if(count>1){
            setConut(--count)
        }
        
    }
    //console.log(comments[0].nickname,"666666666666");

    return (
        <div>
        <div className="top">
            <div>
                {product &&
                    <Carousel
                        infinite
                    >
                        {product.thumbs.split(",").map((item, idx) => (
                            <div className="home-category">
                                <img src={(item)} ></img>
                            </div>
                        ))}
                    </Carousel>
                }
            </div>
            <h3>{product.title}</h3>
            <p>{product.subtitle}</p>
            <div>
                <span className="small">￥{product.price}</span>
                <span className="big">￥{product.origin_price}</span>
                <div className="line"></div>
            </div>
            <span className="kuaidi">快递：{product.dispatchprice}</span>
        </div>
        <div className="activity" onClick={showModal}>
            <span className="ac-title">活动</span>
            <span className="ac-main">购买赠送{product.credit}积分</span>
        </div>
        <div className="activity" onClick={showModal}>
            <span className="ac-title">请选择数量（规格）{<Icon type="right" />}</span>
            {/* <span className="ac-main">购买赠送{product.credit}积分</span> */}
        </div>
        <div className="activity">
            <span className="comments-title">宝贝评价({comments.length})</span>
            {comments.length > 0 &&
                <div className="comments-user">
                    <Link to={`/comments/${comments.length > 0 && comments[0].id}`} className="comments-main">查看全部 {<Icon type="right" />}</Link>
                    <img src={comments[0].headimgurl} alt="" />
                    {/* {comments.length && comments[0].nickname} */}
                    <span className="comments-user-name">{comments[0].nickname}</span>
                    {/* {comments.map} */}
                    <p className="comments-user-content">{comments[0].content}</p>
                </div>
            }
            {
                comments.length == 0 &&
                <div className="comments-null">
                    <div className="comments-main">查看全部 {<Icon type="right" />}</div>
                    <div className="comments-none">暂无宝贝评价</div>
                </div>

            }
        </div>
        <Modal
            popup
            visible={modal}
            animationType="slide-up"
        >
            <List renderHeader={() => <div> <img src={product.thumbs.split(",")[0]}></img><span>￥{product.price}</span></div>} className="popup-list">
                {[(<div>
                    <div>数量</div>
                    <div>
                        <div className="jian" onClick={minusCount}>
                            <div style={{
                                fontFamily: "icomoon",
                                lineHeight:"30px"
                            }}
                                className="icon-minus"
                            />
                        </div>
                        <div className="count">{count}</div>
                        <div className="jia" onClick={addCount}>
                            <div style={{
                                fontFamily: "icomoon",
                                lineHeight:"30px"
                            }}
                                className="icon-plus"
                            />
                        </div>
                    </div>
                </div>)].map((i, index) => (
                    <List.Item key={index}>{i}</List.Item>
                ))}
                <List.Item>
                    <Button type="primary" onClick={showModal2}>确认</Button>
                </List.Item>
            </List>
        </Modal>
        <div className="xiangqing">——&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宝贝详情&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——</div>
        <div dangerouslySetInnerHTML={{ __html: product.content }}></div>
    </div>
    )
}

export default Detail