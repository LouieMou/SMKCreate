import "./TextBox.css";

export default function TextBox(props) {
  return (
    <div className="textbox-container">
      <textarea
        className="input-text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        maxLength={1000}
      />
      <p className="small-text">{props.count} / 1000</p>
    </div>
  );
}
