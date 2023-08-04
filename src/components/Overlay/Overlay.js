import "./Overlay.css";

export default function Overlay({ isOpen, onClick, children }) {
  return (
    <>
      {isOpen && (
        <div className="overlay-overlay">
          <div className="overlay-background" onClick={onClick} />
          <div className="overlay-container">
            <div className="overlay-controls">
              <button
                className="overlay-close"
                type="button"
                onClick={onClick}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
