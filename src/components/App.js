import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setImagePopupOpen(true);
    setSelectedImage(card);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((error) => console.log("Ошибка при загрузке информации", error));
  }, []);

  const handleUpdateAvatar = ({ avatar }) => {
    api.setUserAvatar({ avatar })
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(error => {
        console.error("Ошибка при обновлении аватара:", error);
      });
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(error => {
        console.error("Ошибка при удалении карточки:", error);
      });
  };

  const handleCardLike = (card, isLiked) => {
    const method = isLiked ? 'dislike' : 'like';

    api[method](card._id)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(error => {
        console.error("Ошибка при обновлении лайка карточки:", error);
      });
  };

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка при обновлении данных пользователя", err));
  };

  const handleAddPlaceSubmit = (data) => {
    console.log(data);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.error("Ошибка при добавлении карточки:", error);
      });
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          {/* Редактировать профиль */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />


          {/* Новое место */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
          />

          {/* Обновить аватар */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />


          {/* Попап с изображением */}
          {isImagePopupOpen && selectedImage && (
            <ImagePopup card={selectedImage} onClose={closeAllPopups} />
          )}

          {/* Попап для подтверждения удаления */}
          {isDeletePopupOpen && (
            <PopupWithForm title="Вы уверены?" popupClassName="popup-delete" isOpen={isDeletePopupOpen} onClose={closeAllPopups} buttonText="Да">
            </PopupWithForm>
          )}

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
