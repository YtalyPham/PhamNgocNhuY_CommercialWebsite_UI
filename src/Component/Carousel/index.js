import React, { useState, useEffect } from "react";
import { Carousel } from 'antd';

import ImagePhone from '../../assets/image/phone1.jpg';

const CarouselComponent = (props) => {
  const onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <Carousel afterChange={onChange}>
      <div>
        <img src={ImagePhone} alt="" />
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
