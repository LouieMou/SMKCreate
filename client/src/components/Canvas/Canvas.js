import "./Canvas.css";

export default function Canvas(props) {
  return (
    <div className="canvas-container">
      <canvas id={props.id} className="canvas-area" ref={props.canvasRef}>
        {props.children}
      </canvas>
    </div>
  );
}
