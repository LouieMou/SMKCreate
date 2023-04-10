import "./Canvas.css";

export default function Canvas(props) {
  return (
    <div className="canvas-container">
      <p>Halløj</p>
      <canvas id={props.id} className="canvas-area" ref={props.canvasRef}>
        {props.children}
      </canvas>
    </div>
  );
}
