import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        if (currentUser !== '') {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser]);

    return (
        <PopupWithForm title='Редактировать профиль' name="profile_edit" button='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isLoading={props.isLoading} >
            <input value={name} onChange={handleChangeName} autoComplete="off" id="user-name" type="text" name="userName" className="popup__input popup__input_value_name"
                minLength="2" maxLength="40" required />
            <span id="user-name-error" className="popup__error popup__error_position_top"></span>
            <input value={description} onChange={handleChangeDescription} autoComplete="off" id="user-description" type="text" name="userDescription"
                className="popup__input popup__input_value_description" minLength="2" maxLength="200" required />
            <span id="user-description-error" className="popup__error popup__error_position_bottom"></span>
        </PopupWithForm>
    )
}