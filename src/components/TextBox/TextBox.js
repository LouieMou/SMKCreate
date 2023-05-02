import "./TextBox.css";

export default function TextBox(props) {
  return (
    <textarea
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      maxLength={1000}
    />
  );
}
