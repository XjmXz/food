import React from "react"
import { Carousel, WingBlank } from 'antd-mobile';
import './carousel.scss'

import MyContext from '../../../context'

type IProps = Readonly<{
    list: any[]
}>


const MyCarousel:React.FC<IProps>=(props)=>{

    console.log(props.list,"888888888");
    
    
    return (<div>
        <Carousel
          autoplay
          infinite
          autoplayInterval={1000}
        >
          {props.list.map((item,idx) => (
            //   JSON.stringify(item.url)
              
            <div className="home-category" key={item.id}>
                <img src={(item.url)} ></img>
            </div>
          ))}
        </Carousel>
    </div>)
}

export default MyCarousel