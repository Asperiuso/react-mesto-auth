import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onSubmit, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

 const  handleLinkChange = (e) => {
    setLink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
   
    onSubmit({
      name: name,
      link: link,
    });
  }
  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      popupClassName="popup-add"
      buttonText="Создать"
      name={"cards"}
      form={"cards-form"}
    >
      <fieldset className="popup__input">
        <label className="popup__label">
          <input
            required
            className="popup__input-item popup__input-item_cardTitle"
            id="placetitle"
            name="name"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            onChange={handleNameChange}
            value={name}
          />
          <span className="popup__input-error-message" id="placetitle-error"></span>
        </label>
        <label className="popup__label">
          <input
            required
            className="popup__input-item popup__input-item_cardLink"
            id="placelink"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            minLength="2"
            onChange={handleLinkChange}
            value={link}
          />
          <span className="popup__input-error-message" id="placelink-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
