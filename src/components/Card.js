import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import classnames from 'classnames';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления

  const cardDeleteButtonClassName = classnames('cards__delete-button', { 'cards__delete-button_active': isOwn });

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = classnames('cards__like-button', { 'cards__like-button_active': isLiked });

  function handleClick() {
    props.onImageOpen();
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <figure className="cards__item">
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={`${props.card.name}`}
        className="cards__image" />
      <button type='button' onClick={handleDeleteClick} className={cardDeleteButtonClassName} />
      <figcaption className="cards__name">
        <p className="cards__name-caption">{props.card.name}</p>
        <div className="cards__like">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} />
          <p className="cards__like-counter">{props.card.likes.length}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;
