import "./Step.css";

export default function Step(props) {
  return (
    <div className={`step ${props.isCompleted ? "completed" : ""}`}>
      <div className="step-circle">
        {props.isCompleted ? (
          <img
            src="/icons/check_white.png"
            alt="Checkmark"
            className="step-checkmark"
          />
        ) : (
          <div className="step-number">{props.number}</div>
        )}
      </div>
      <div className="step-text">{props.text}</div>
    </div>
  );
}
