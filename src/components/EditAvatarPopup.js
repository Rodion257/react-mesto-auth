import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm title='Обновить аватар' name="avatar_edit" button='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}>
      <input ref={avatarRef} autoComplete="off" id="avatar-url" type="url" name="link" placeholder="Ссылка на картинку"
        className="popup__input popup__input_place_image" required />
      <span id="avatar-url-error" className="popup__error popup__error_position_bottom"></span>
    </PopupWithForm>
  )
}