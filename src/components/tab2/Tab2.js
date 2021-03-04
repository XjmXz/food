import {
  TabBar,
  Modal,
  List,
  Button,
  Carousel,
  Icon,
  Stepper,
} from "antd-mobile";
// import { Modal, List, Button, Carousel, Icon } from "antd-mobile";
import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import "./tabs2.scss";
import { fetchpost, fetchget } from "../../utils/fetch";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetail } from "../../actions/productAction";

const Tab2 = (props) => {
  let [hidden, setHidden] = useState(false);
  let [selectedTab, setSelectedTab] = useState(false);
  const [products, setProducts] = useState();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  let [color, setColor] = useState("icon-star-empty");
  const [modal, setModal] = useState(false);
  let [count, setConut] = useState(1);

  useEffect(() => {
    dispatch(listProductDetail(props.match.params.id));
    getProducts();
    addToCart();
  }, [dispatch, props.match]);

  const getProducts = async () => {
    var { message } = await fetchget(
      `/api/detail/${props.location.pathname.slice(-4)}`
    );
    setProducts(message[0]);
  };

  const showModal = () => {
    setModal(true);
  };
  const showModal2 = () => {
    setModal(false);
  };

  const onChange = (val) => {
    setConut(val);
  };

  const addToCart = async () => {
    var { message } = await fetchpost("/api/cart", products);
    console.log(products, "ppppppppppppp");
  };

  const addToCollect = async () => {
    var { message } = await fetchpost("/api/addCollect", products);
    console.log(products, "7777777777777");
  };

  const cutToCollect = async () => {
    var { message } = await fetchpost(
      `/api/cutCollect/${props.match.params.id}`,
      products
    );
    console.log(products, "oooooooooooo");
  };

  const judge = async () => {
    let { message } = await fetchget("/api/collectList");
    console.log(message, "messsagsae");
    let state = 0;
    var id = props.location.pathname.split("/")[2];
    console.log(id, "222222222222");
    for (let i = 0; i < message.length; i++) {
      if (message[i].id == id) {
        state = 1;
        break;
      } else {
        state = 0;
      }
      return state;
    }
  };

  const select = async () => {
    const state = await judge();
    console.log(state, "sssssssssss");
    state == 0 ? setColor("icon-star-full") : setColor("icon-star-empty");
    console.log(state, "eeeeeeeeeeee");
    if (state == 0) {
      addToCollect();
      console.log("添加成功");
    } else {
      cutToCollect();
      console.log("删除成功");
    }
  };

  return (
    <div className="tabs2">
      <div className="icon">
        <Link
          to="/cart/?title=购物车/1"
          style={{
            fontFamily: "icomoon",
            fontSize: "22px",
            width: "22px",
            height: "22px",
            marginTop: "14px",
            flex: "1",
          }}
          className="icon-cart1"
        ></Link>
        <div
          style={{
            fontFamily: "icomoon",
            fontSize: "22px",
            width: "22px",
            height: "22px",
            marginTop: "14px",
            flex: "1",
          }}
          className={color}
          onClick={select}
        ></div>
      </div>
      <div className="btn">
        <div className="btn_l" onClick={showModal}>
          加入购物车
        </div>
        <div className="btn_r"> 立即购买 </div>
      </div>
      <Modal popup visible={modal} animationType="slide-up">
        <List
          renderHeader={() => (
            <div>
              <img src={products.thumbs.split(",")[0]}></img>
              <span>￥{products.price}</span>
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
          <List.Item onClick={showModal2}>
            <Button type="primary" onClick={addToCart}>
              确认
            </Button>
          </List.Item>
        </List>
      </Modal>
    </div>
  );
};

export default withRouter(Tab2);
