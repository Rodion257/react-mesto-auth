import React from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './Main';
import PopupWithImage from './PopupWithImage';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [registered, setRegistered] = React.useState(false);
  const history = useHistory();



  React.useEffect(() => {
    api.getInitialCards()
      .then((result) => {
        setCards(result)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        // Обновляем стейт
        setCards(newCards)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.removeCard(card)
      .then(() => {
        const arrWithoutCard = cards.filter((i) => i !== card);
        setCards(arrWithoutCard);
      })

  }

  React.useEffect(() => {
    api.getInfoUser()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleImagePopupclick() {
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleRegisterPopup() {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  React.useEffect(() => {
    function handleESCclose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleESCclose);
    return () => {
      document.removeEventListener('keydown', handleESCclose);
    }
  }, [])

  function handleUpdateUser(user) {
    setIsLoading(true);
    api.sendInfoUser(user)
      .then((data) => {
        setCurrentUser(data)
      })
      .then(() => {
        closeAllPopups()
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.changeAvatar(avatar)
      .then((data) => {
        setCurrentUser(data)
      })
      .then(() => {
        closeAllPopups()
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.createCard(card)
      .then((newCard) => {
        setCards([...cards, newCard])
      })
      .then(() => {
        closeAllPopups();
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegister() {
    setRegistered(true);
  }

  function onUnregister() {
    setRegistered(false);
  }

  function handleLogin() {
    setLoggedIn(true);
  }
  React.useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt)
          .then((res) => {
            if (res.data) {
              setLoggedIn(true);
              setUserData({
                id: res.data._id,
                email: res.data.email,
              });
              history.push('/');
            }
          })
      }
    };


    tokenCheck();
  }, [loggedIn, history]);

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>

            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
              onCardClick={handleCardClick}
              onImagePopup={handleImagePopupclick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              signOut={signOut}
              userData={userData} />

            <Route path="/sign-up">
              <Register onRegister={onRegister} onUnregister={onUnregister} isOpen={handleRegisterPopup} onClose={closeAllPopups} />
            </Route>

            <Route path="/sign-in">
              <Login onLogin={handleLogin} onClose={closeAllPopups} />
            </Route>

            <Route path="/">
              {loggedIn ? <Redirect to={"/"} /> : <Redirect to={"/sign-in"} />}
            </Route>



          </Switch>
        </div>

        <EditProfilePopup isLoading={isLoading} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isLoading={isLoading} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithImage
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups} />

        <EditAvatarPopup isLoading={isLoading} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <InfoTooltip onRegister={registered} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} />

      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
