import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);

  const handleLikeClick = () => {
    onCardLike(card, isLiked);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const cardLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_active" : ""}`;
  const cardDeleteButtonClassName = `card__del-button ${isOwn ? "card__del-button_active" : ""}`;

  return (
    <div className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>}
    </div>
  );
}

export default Card;
