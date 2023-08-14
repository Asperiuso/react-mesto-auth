import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ onUpdateUser, closeAllPopups, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about } = currentUser;
  const [profileName, setProfileName] = useState("");
  const [profileAbout, setProfileAbout] = useState("");

  function handleNameChange(evt) {
    setProfileName(evt.target.value); 
  }

  function handleDescriptionChange(evt) {
    setProfileAbout(evt.target.value);
  }
  
  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: profileName,
      about: profileAbout,
    });
  }

  // Обновляем значения полей при открытии попапа и при изменении контекста
  useEffect(() => {
    if (isOpen) {
      setProfileName(name);
      setProfileAbout(about);
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      buttonText="Сохранить"
      name="edit"
      form="form-data"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input">
        <label className="popup__label">
          <input
            required
            className="popup__input-item popup__input-item_profile_name"
            id="profilename"
            name="name"
            type="text"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            value={profileName}
            onChange={handleNameChange}
          />
          <span className="popup__input-error-message" id="profilename-error"></span>
        </label>
        <label className="popup__label">
          <input
            required
            className="popup__input-item popup__input-item_profile_profission"
            id="profileprofession"
            name="about"
            type="text"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            value={profileAbout}
            onChange={handleDescriptionChange}
          />
          <span className="popup__input-error-message" id="profileprofession-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
