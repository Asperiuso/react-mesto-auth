import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = ''; 
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      buttonText="Сохранить"
      name="edit-avatar"
      form="form-avatar"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input">
        <label htmlFor="avatar" className="popup__label">
          <input
            required
            ref={avatarRef}
            className="popup__input-item popup__input-item_avatar"
            type="url"
            id="avatar"
            minLength="2"
            placeholder="Ссылка на аватар"
          />
          <span className="popup__input-error-message" id="avatar-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
