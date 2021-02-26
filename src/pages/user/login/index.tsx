import React, { useEffect, useState } from "react"
import './login.scss'
import { fetchget } from "../../../utils/fetch"
import { Link, RouteComponentProps } from 'react-router-dom';


const Login: React.FC<RouteComponentProps> = (props) => {
    let [name, setName] = useState("");
    let [pwd, setPwd] = useState("");
    let[users,setUser]=useState<any>([]);
    let [isLogin, setIsLogin] = useState(true);

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
       console.log(user,"22222222222");
       setUser(user)
    }
    const handleSubmit = () => {
        if (name && pwd) {
            let obj = {
                name,
                pwd
            }
            // props.postComment(obj)
            console.log(obj, "uuuuuu");

        }
        //  let objs = [];
        if(users)
        {
            let fg = users.map ((item:any)=> {
            if(item.username===name) return true//用户名已存在
         }) 
         if(fg){//fg为真找到用户名，接下里对密码判断
            //对存储数据遍历，比对用户名名与密码
            let f=false
            users.map((item:any) => {
               if(item.username===name&&item.pwd===pwd){
                  f=true; 
                  return f;
               }     
            })
            if(f){//查询正确可以正常登录
               console.log('登录成功')
               props.history.push('/user/?title=我的')
               console.log("ppppppppppp",isLogin);
            }else{
                console.log('密码错误')
            }

         }
        }
        
    }

    return (<div>
        <h1>亲，欢迎登录</h1>
        <div>
            <input type="text" placeholder="用户名" value={name} id="name" onChange={handleChange} />
        </div>
        <div>
            <input type="text" placeholder="密码" value={pwd} id="pwd" onChange={handleChange} />
        </div>
        <button className="address-btn" onClick={handleSubmit}>登录</button>
    </div>)
}

export default Login