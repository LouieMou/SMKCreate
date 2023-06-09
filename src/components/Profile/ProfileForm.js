/* Components */
import LabelButton from "../LabelButton/LabelButton";
/* Styles */
import "./ProfileForm.css";

export default function ProfileForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <label className="label-text">E-mail</label>
      <input
        className="label-text"
        type="email"
        onChange={(event) => props.setUsername(event.target.value)}
        defaultValue={props.username}
        autoCapitalize="none"
        required
      />
      <label className="label-text">Password</label>
      <input
        className="label-text"
        type="password"
        autoCapitalize="none"
        curetextentry="true"
        onChange={(event) => props.setPassword(event.target.value)}
        defaultValue={props.password}
        required
      />
      <div className="submit-button">
        <LabelButton
          type="submit"
          label_text={props.label_text}
          button_size={"large"}
        />
      </div>
    </form>
  );
}
