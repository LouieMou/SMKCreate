import "./Overlay.css";
import { Fragment } from "react";

export default function Overlay(isOpen, onClose, children) {
  return (
    <Fragment>
      {isOpen && (
        <div className="overlay">
          <div className="overlay-background" onClick={onClose} />
          <div className="overlay-container">
            <div className="overlay-controls">
              <button
                className="overlay-close"
                type="button"
                onClick={onClose}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
}
