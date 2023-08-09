export default function InformationLink(props) {
  return (
    <div className="information-link-container">
      <p className="information-link" style={{fontStyle: 'italic'}} onClick={props.handleClick}>
        {props.text}
      </p>
    </div>
  );
}
