export default function InformationLink(props) {
  return (
    <div className="informationLinkContainer">
      <p onClick={props.handleClick}>{props.text}</p>
    </div>
  );
}
