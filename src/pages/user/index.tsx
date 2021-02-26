import React, { useState, useEffect ,useReducer} from "react"
import { Link, RouteComponentProps } from 'react-router-dom';
import { fetchget } from "../../utils/fetch"
import reducer from "../../reducer/index"
import "./user.scss"
const User: React.FC<RouteComponentProps> = (props) => {

    const [headUrl, setHeadUrl] = useState()
    const [nickName, setNickName] = useState()
    const [notPayCount, setNotPayCount] = useState()
    const [notSendCount, setNotSendCount] = useState()
    const [takeCount, setTakeCount] = useState()
    const [finishCount, setFinishCount] = useState()
    let [name, setName] = useState("");
    let [pwd, setPwd] = useState("");
    let [img, setImg] = useState("");

    // let [city, dispatch] = useReducer(reducer, "宣城");
    
    let [users, setUser] = useState<any>([]);
    let [isLogin, setIsLogin] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.id == "name") {
            setName(e.target.value)
            return;
        }
        setPwd(e.target.value)
    }
    useEffect(() => {
        getUser();
    }, []);


    const getUser = async () => {
        var { message: user } = await fetchget('/api/user')
        console.log(user, "22222222222");
        setUser(user)
    }

    
    const handleSubmit = () => {
        if (name && pwd) {
            let obj = {
                name,
                pwd,
                img
            }
            // props.postComment(obj)
            console.log(obj, "uuuuuu");

        }
        //  let objs = [];
        if (users) {
            let fg = users.map((item: any) => {
                if (item.username === name) return true//用户名已存在
            })
            if (fg) {//fg为真找到用户名，接下里对密码判断
                //对存储数据遍历，比对用户名名与密码
                let f = false
                users.map((item: any) => {
                    if (item.username === name && item.pwd === pwd) {
                        img=item.img;
                        f = true;
                        return f;
                    }
                    console.log(img,"ooooooooooo");
                    
                })
                if (f) {//查询正确可以正常登录
                    console.log('登录成功')
                    setIsLogin(true)
                    props.history.push('/user/?title=我的')
                    console.log("ppppppppppp", isLogin);

                } else {
                    console.log('密码错误')
                }

            }
        }
    }

    const changeLogin = () => {
        // props.history.push("/login")
        setIsLogin(true)

    }

  

    return (
        <div>
            {isLogin &&
                <div>
                    <div className="my-header">
                        <img src="../m-images/my-header-bg.jpg" alt="" />
                        <a href="" className="person">
                            <img src={users[0].img} alt={name} />
                            <span>{name}</span>
                        </a>
                    </div>
                    <div className="my-order">
                        <div className="my-order-header">
                            <span>我的订单</span>
                            <Link to="order?type=0"><span className="see-all-order">查看全部订单</span><i className="com-right-tip"></i></Link>
                        </div>
                        <div className="my-header-con">
                            <Link to="order?type=1">
                                <div className="img-box">
                                    <img src="../m-images/order-1.png" alt="" />
                                    <span className="num">{notPayCount === 0 ? '' : notPayCount}</span>
                                </div>
                                <p>待付款</p>
                            </Link>
                            <Link to="order?type=2">
                                <div className="img-box">
                                    <img src="../m-images/order-2.png" alt="" />
                                    <span className="num">{notSendCount === 0 ? '' : notSendCount}</span>
                                </div>
                                <p>待发货</p>
                            </Link>
                            <Link to="order?type=3">
                                <div className="img-box">
                                    <img src="../m-images/order-3.png" alt="" />
                                    <span className="num">{takeCount === 0 ? '' : takeCount}</span>
                                </div>
                                <p>待收货</p>
                            </Link>
                            <Link to="order?type=4">
                                <div className="img-box">
                                    <img src="../m-images/order-4.png" alt="" />
                                    <span className="num">{finishCount === 0 ? '' : finishCount}</span>
                                </div>
                                <p>已完成</p>
                            </Link>
                        </div>
                    </div>
                    <div className="my-items">
                        <a href="/m-html/my/my-collection.html" className="items">
                            <div className="item-bg-2">
                                <span>我的收藏</span>
                            </div>
                            <div className="item-tips">
                                <i className="com-right-tip"></i>
                            </div>
                        </a>
                        <Link className="items" to="/address/?title=我的收获地址">
                            <div className="item-bg-3">
                                <span>地址管理</span>
                            </div>
                            <div className="item-tips">
                                <i className="com-right-tip"></i>
                            </div>
                        </Link>
                    </div>
                    <a href="" className="out-login" onClick={changeLogin}>退出登录</a>
                </div>
            }
            {!isLogin &&
                <div >
                    <h1>亲，欢迎登录</h1>
                    <div>
                        <input type="text" placeholder="用户名" value={name} id="name" onChange={handleChange} />
                    </div>
                    <div>
                        <input type="text" placeholder="密码" value={pwd} id="pwd" onChange={handleChange} />
                    </div>
                    <button className="address-btn" onClick={handleSubmit}>登录</button>
                </div>
            }
        </div>

    )
}

export default User