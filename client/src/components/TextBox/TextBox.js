import "./TextBox.css";

export default function TextBox(props) {
  return (
    <div className="textbox-container">
      <textarea
        className="input-text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
