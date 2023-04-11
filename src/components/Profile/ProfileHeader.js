/* Styles */
import "./ProfileHeader.css";

export default function ProfileHeader(props) {
  function getFirstLetter() {
    const firstLetter = props.name.charAt(0);
    return firstLetter;
  }

  function handleNameChange(event) {
    props.setName(event.target.value);
  }

  return (
    <div className="profile-header">
      <div className="profile-circle">
        <h1 className="firstLetter">{getFirstLetter()}</h1>
      </div>
      <input
        className="profile-name"
        type="text"
        value={props.name}
        onChange={handleNameChange}
        required
      />
    </div>
  );
}
