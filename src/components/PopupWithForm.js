import React from "react";

function PopupWithForm(props) {
  const popupClassName = `popup ${props.popupClassName} ${props.isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть попап" onClick={props.onClose}></button>
        <h3 className="popup__heading">{props.title}</h3>
        <form className="popup__form" id={props.name} name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__save-button" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
