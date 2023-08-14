import React from "react";

function ImagePopup(props) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div className={`popup ${props.card ? "popup_opened" : ""}`} onClick={handleOverlayClick}>
      {props.card && (
        <div className="popup__content popup__card-image">
          <button
            className="popup__close-button"
            type="button"
            aria-label="Закрыть"
            onClick={props.onClose}
          ></button>
          <img
            className=" popup__card-image"
            src={props.card.link}
            alt={props.card.name}
          />
          <h3 className="popup__card-title">{props.card.name}</h3>
        </div>
      )}
    </div>
  );
}

export default ImagePopup;
