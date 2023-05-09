import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./ImageSlider.css";

export default function ImageSlider(props) {
  return (
    <Slider autoplay={2000} dots={true} previousButton={<div></div>}>
      {props.content.map((item, index) => (
        <div
          key={index}
          style={{
            background: `url('${item.link}') no-repeat center center`,
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <div className="center">
            <img
              src={item.src}
              alt={item.alt}
              style={{
                cursor: "pointer",
                height: "395px",
              }}
              onClick={() => props.handleSliderClick(item.link)}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}
