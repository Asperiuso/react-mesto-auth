import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import { authApi } from "../utils/AuthApi.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isInfoTolltipSuccess, setIsInfoTolltipSuccess] = useState(false);
  const [email, setEmail] = useState("");
  
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
    setIsSuccessPopupOpen(false);
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isSuccessPopupOpen ||
    selectedImage;

  useEffect(() => {
    if (!isLoggedIn) return;
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEsc);
      return () => {
        document.removeEventListener("keydown", closeByEsc);
      };
    }
  }, [isOpen]);

  const handleUpdateAvatar = ({ avatar }) => {
    api.setUserAvatar({ avatar })
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(error => {
        console.error("Ошибка при обновлении аватара:", error);
      })
      .finally(() => setIsLoading(false));
    setIsLoading(true);
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
      .catch((err) => console.log("Ошибка при обновлении данных пользователя", err))
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  };

  const handleAddPlaceSubmit = (data) => {
    console.log(data);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.error("Ошибка при добавлении карточки:", error)
      })
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  };

  function handleRegister(email, password) {
    authApi
      .registerUser({ email, password })
      .then((result) => {
        setEmail(result.data.email);
        setIsInfoTolltipSuccess(true);
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsSuccessPopupOpen(true));
  }

  function handleLogin(email, password) {
    authApi
      .loginUser({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setEmail(email);
      })
      .then(() => setIsLoggedIn(true))
      .catch(console.log);
  }

  useEffect(() => {
    async function checkAuth() {
      if (!localStorage.getItem('jwt')) return;
      try {
        const res = await authApi.checkToken(localStorage.getItem('jwt'));
        if (res.data) {
          setEmail(res.data.email);
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
        console.log(err);
      }
    }
    checkAuth();
  }, []);

  function onSignOut() {
    localStorage.removeItem('jwt');
    setEmail("");
    setIsLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <div className="page">
          <Header 
          isLoggedIn={isLoggedIn} 
          email={email}
          onSignOut={onSignOut} />
            <Routes>
              <Route path='/' element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  isLoggedIn={isLoggedIn}
                  onSignOut={onSignOut} />}
              />

              <Route
                path="sign-up"
                element={
                  <Register
                    onRegister={handleRegister}
                    isLoggedIn={isLoggedIn} />}
              />

              <Route
                path='sign-in'
                element={
                  <Login
                    onLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                  />}
              />

              <Route
                path='*'
                element={isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />}
              />
            </Routes>
            <Footer />

            {/* Редактировать профиль */}
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />

            {/* Новое место */}
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onSubmit={handleAddPlaceSubmit}
              isLoading={isLoading}
            />

            {/* Обновить аватар */}
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
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

            <InfoTooltip
              name={"success"}
              onClose={closeAllPopups}
              isOpen={isSuccessPopupOpen}
              isSuccess={isInfoTolltipSuccess}
            />

          </div>
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
