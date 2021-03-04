import React from "react";
import { Carousel, WingBlank } from "antd-mobile";
import "./carousel.scss";

const MyCarousel = (props) => {
  console.log(props.list, "888888888");

  return (
    <div>
      <Carousel autoplay infinite autoplayInterval={1000}>
        {props.list.map((item, idx) => (
          <div className="home-category" key={item.id}>
            <img src={item.url} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
