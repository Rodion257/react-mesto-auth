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
import LoginPopup from './LoginPopup';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isLoginTooltipPopupOpen, setIsLoginTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [message, setMessage] = React.useState();
  const history = useHistory();

  // React.useEffect(() => {
  //   console.log('hi');
  //   Promise.all([api.getInitialCards(), api.getInfoUser()])
  //     .then((result) => {
  //       setCards(result[0]);
  //       setCurrentUser(result[1].data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
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

  function handleMessage(message) {
    setMessage(message);
  }

  function handleCardDelete(card) {
    api.removeCard(card)
      .then(() => {
        const arrWithoutCard = cards.filter((i) => i !== card);
        setCards(arrWithoutCard);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  function handleLoginPopup() {
    setIsLoginTooltipPopupOpen(!isLoginTooltipPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setIsLoginTooltipPopupOpen(false);
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

  function onLogin() {
    setLoggedIn(true);
  }

  function notLogin() {
    setLoggedIn(false)
  }

  React.useEffect(() => {
    const tokenCheck = () => {
      api.handleToken();
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        api.getInfoUser()
          .then((res) => {
            if (res.data) {
              setLoggedIn(true);
              setCurrentUser(res.data);
              history.push('/');
              api.getInitialCards()
                .then((result) => {
                  setCards(result);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
      } else {
        localStorage.removeItem('jwt');
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

            <ProtectedRoute exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onCardClick={handleCardClick}
              onImagePopup={handleImagePopupclick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              signOut={signOut}
              userData={currentUser} />

            <Route path="/sign-up">
              <Register handleMessage={handleMessage} onRegister={onRegister} onUnregister={onUnregister} isOpen={handleRegisterPopup} onClose={closeAllPopups} />
            </Route>

            <Route path="/sign-in">
              <Login handleMessage={handleMessage} isOpen={handleLoginPopup} onLogin={onLogin} notLogin={notLogin} onClose={closeAllPopups} />
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
        <InfoTooltip onRegister={registered} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} message={message} />
        <LoginPopup onLogin={loggedIn} isOpen={isLoginTooltipPopupOpen} onClose={closeAllPopups} message={message} />

      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
