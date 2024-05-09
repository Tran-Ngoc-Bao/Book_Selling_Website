import React from 'react';
import './PopUp.css';

function Popup({ isOpen, onClose, children }) {
  // Render nothing if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
