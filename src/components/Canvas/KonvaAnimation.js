import { Circle, Text } from "react-konva";
import { useState, useEffect } from "react";

export default function KonvaAnimation(props) {
  const [circleRadius, setCircleRadius] = useState(0);

  useEffect(() => {
    let animationFrame;
    let radiusStep = 2;
    const animate = () => {
      setCircleRadius((prevRadius) => {
        let newRadius = prevRadius + radiusStep;
        if (newRadius > 100 || newRadius < 0) {
          radiusStep = -radiusStep;
          newRadius = Math.max(0, prevRadius + radiusStep);
        }
        return newRadius;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    if (props.loading) {
      animate();
    } else {
      cancelAnimationFrame(animationFrame);
    }
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [props.loading]);

  return (
    <>
      <Circle
        x={props.dimensions.width / 2}
        y={props.dimensions.height / 2}
        radius={circleRadius}
        stroke={"black"}
        strokeWidth={5}
        opacity={1}
      />
      <Text
        x={props.dimensions.width / 2}
        y={props.dimensions.height / 2}
        text="Generating your artwork"
        fontSize={18}
        fontFamily="Open Sans"
        fill="black"
        fontStyle="bold"
        offsetX={120}
        offsetY={150}
      />
    </>
  );
}
