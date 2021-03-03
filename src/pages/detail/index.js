import React, { useState, useEffect } from "react";
import { fetchget } from "../../utils/fetch";
import { RouteComponentProps, Link } from "react-router-dom";
import { Modal, List, Button, Carousel, Icon, Stepper } from "antd-mobile";
import "./detail.scss";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetail } from "../../actions/productAction";
import Tab2 from "../../components/tab2/Tab2";

const Detail = ({ match }) => {
  const [product, setProduct] = useState({
    id: "id",
    title: "title",
    thumbs: "thumbs",
    content: "",
    subtitle: "",
    price: "",
    origin_price: "",
    dispatchprice: "",
    credit: "",
  });
  const [comments, setComments] = useState([]);
  const [modal, setModal] = useState(false);
  let [count, setConut] = useState(1);
  // const[key,setKey]=useState(true);
  let [pageIndex, setPageIndex] = useState(1);

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, products } = productDetail;

  useEffect(() => {
    dispatch(listProductDetail(match.params.id));
  }, [dispatch, match]);

  const showModal = () => {
    setModal(true);
  };
  const showModal2 = () => {
    setModal(false);
  };
  useEffect(() => {
    getProductDetail();
    getComments();
  }, [match]);

  const getProductDetail = async () => {
    var { message } = await fetchget(`/api/detail/${match.params.id}`);
    setProduct(message[0]);
  };

  const getComments = async () => {
    var { message: data } = await fetchget(`/api/comments/${match.params.id}`);
    setComments(data);
    console.log(data, "dddddddddd");
  };

  const onChange = (val) => {
    // console.log(val);
    setConut(val);
  };

  return (
    <div>
      <div className="top">
        <div>
          {product.thumbs && (
            <Carousel infinite>
              {product.thumbs.split(",").map((item, idx) => (
                <div className="home-category">
                  <img src={item}></img>
                </div>
              ))}
            </Carousel>
          )}
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
        <span className="ac-title">
          请选择数量（规格）{<Icon type="right" />}
        </span>
        {/* <span className="ac-main">购买赠送{product.credit}积分</span> */}
      </div>
      <div className="activity">
        <span className="comments-title">宝贝评价({comments.length})</span>
        {comments.length > 0 && (
          <div className="comments-user">
            <Link
              to={`/comments/${comments.length > 0 && comments[0].id}`}
              className="comments-main"
            >
              查看全部 {<Icon type="right" />}
            </Link>
            <img src={comments[0].headimgurl} alt="" />
            <span className="comments-user-name">{comments[0].nickname}</span>
            <p className="comments-user-content">{comments[0].content}</p>
          </div>
        )}
        {comments.length == 0 && (
          <div className="comments-null">
            <div className="comments-main">
              查看全部 {<Icon type="right" />}
            </div>
            <div className="comments-none">暂无宝贝评价</div>
          </div>
        )}
      </div>
      <Modal popup visible={modal} animationType="slide-up">
        <List
          renderHeader={() => (
            <div>
              <img src={product.thumbs.split(",")[0]}></img>
              <span>￥{product.price}</span>
            </div>
          )}
          className="popup-list"
        >
          {[
            <div>
              <div>数量</div>
              <div>
                <Stepper
                  style={{ width: "100%", minWidth: "100px" }}
                  showNumber
                  max={10}
                  min={1}
                  value={count}
                  onChange={onChange}
                />
              </div>
            </div>,
          ].map((i, index) => (
            <List.Item key={index}>{i}</List.Item>
          ))}
          <List.Item>
            <Button type="primary" onClick={showModal2}>
              确认
            </Button>
          </List.Item>
        </List>
      </Modal>
      <div className="xiangqing">
        ——&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宝贝详情&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——
      </div>
      <div dangerouslySetInnerHTML={{ __html: product.content }}></div>
      <Tab2></Tab2>
    </div>
  );
};

export default Detail;
