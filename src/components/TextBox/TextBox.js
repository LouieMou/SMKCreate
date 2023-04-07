import "./TextBox.css";

export default function TextBox(props) {
  return (
    <div className="textbox-container">
      <input
        type="text"
        className="input-text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
