import "./Konva.css";
import { Stage, Layer, Text } from "react-konva";
export default function Konva(props) {
  return (
    <Stage className="konva-container" ref={props.stageRef}>
      <Layer ref={props.layerRef}>{props.children}</Layer>
    </Stage>
  );
}
