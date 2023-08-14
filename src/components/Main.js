import React, { useContext } from "react";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар профиля"
            />
            <button
              className="profile__avatar-edit-button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Изменить профиль"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="Добавить карточку"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="area">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike} 
              onCardDelete={props.onCardDelete} 
            />
          ))}
        </section>
      </main>
      <ImagePopup card={props.selectedCard} onClose={props.onCloseAllPopups} />
    </div>
  );
}

export default Main;
