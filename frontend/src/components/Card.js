import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `places__delete ${isOwn ? 'places__delete_active' : ''}`
  );  

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `places__like ${isLiked ? 'places__like_active' : ''}`
  ); 

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="places__item">
      <img className="places__foto" src={card.link} alt={card.name} onClick={handleClick}/>
      <h2 className="places__name">{card.name}</h2>
      <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
      <span className="places__counter-like">{card.likes.length}</span>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
    </div>
  )
}

export default Card;