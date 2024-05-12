import React from "react";
import popup from "./PopUp.module.css";

function Popup({ isOpen, onClose, children }) {
  // Render nothing if the modal is not open
  if (!isOpen) return null;

  return (
    <div className={popup.popup_overlay} onClick={onClose}>
      <div className={popup.popup_content} onClick={(e) => e.stopPropagation()}>
        <button className={popup.popup_close} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
