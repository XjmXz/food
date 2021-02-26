import React, { useState, useEffect } from "react"
import { fetchget } from "../../utils/fetch"
import { RouteComponentProps } from 'react-router-dom'
import "./comments.scss"
type ParamsProps = {
    id?: string | undefined
}
const Comments: React.FC<RouteComponentProps<ParamsProps>> = ({ match }) => {
    const [comments, setComments] = useState<any>([])
    // console.log(props.list,"5555555555555");
    useEffect(() => {
        getComments();
    }, [match])

    const getComments = async () => {
        var { message: data } = await fetchget(`/api/comments/${match.params.id}`)
        setComments(data);
        console.log(data, "dddddddddd");
    }

    return (<div>
        <div>
        {comments.length > 0 && comments.map((item: any, index: any) => {
        var append_createtime = item.append_createtime.slice(-2)
        var createtime = item.createtime.slice(-2)
        var day = append_createtime - createtime;
        return (
            <div key={index}>
                <div className="comments-user">
                    <img src={item.headimgurl} />
                    <span className="comments-user-name">{item.nickname}</span>
                    <span className="comments-user-time">{item.createtime}</span>
                    <p className="comments-user-content">{item.content}</p>
                    {item.images && <img src={item.images} alt="" className="comments-img" />}
                    {item.append_content && <div>
                        <p className="append-comment">用户{day}天追评</p>
                        <p className="comments-user-content">{item.append_content}</p>
                    </div>}
                </div>
            </div>
        );
    })}
        </div>
        <div>已经到底了 </div>
        </div>
    )
}

export default Comments