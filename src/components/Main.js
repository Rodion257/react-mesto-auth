import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button onClick={props.onEditAvatar} type="button" className="profile__avatar-button">
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
        </button>
        <div className="profile__edit-info">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button"></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__button"></button>
      </section>

      <section className="cards">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onImageOpen={props.onImagePopup}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main;