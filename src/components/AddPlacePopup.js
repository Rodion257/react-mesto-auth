import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        })
    }

    return (
        <PopupWithForm title='Новое место' name="card_add" button='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isLoading={props.isLoading}>
            <input value={name} onChange={handleChangeName} autoComplete="off" id="card-name" type="text" name="name" placeholder="Название"
                className="popup__input popup__input_place_name" minLength="1" maxLength="30" required />
            <span id="card-name-error" className="popup__error popup__error_position_top"></span>
            <input value={link} onChange={handleChangeLink} autoComplete="off" id="card-url" type="url" name="link" placeholder="Ссылка на картинку"
                className="popup__input popup__input_place_image" required />
            <span id="card-url-error" className="popup__error popup__error_position_bottom"></span>
        </PopupWithForm>
    )
}