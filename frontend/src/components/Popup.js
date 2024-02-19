// Popup.js
import React from 'react';

const Popup = ({ isOpen, onClose, content }) => {
  if (!isOpen) {
    return null;
  }

  const closePopup = () => {
    onClose(); // Call the onClose function to close the popup
  };

  return (
    <div className={`popup ${isOpen ? 'show' : ''}`}>
      <div className="popup-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Popup;
