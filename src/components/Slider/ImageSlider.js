import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./ImageSlider.css";

export default function ImageSlider(props) {
  return (
    <Slider autoplay={100000} dots={true}>
      {props.content.map((item, index) => (
        <div
          key={index}
          style={{
            background: `url('${item.link}') no-repeat center center`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="center">
            <img
              src={item.src}
              alt={item.alt}
              style={{
                height: "395px",
                cursor: "pointer",
              }}
              onClick={() => props.handleSliderClick(item.link)}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}
