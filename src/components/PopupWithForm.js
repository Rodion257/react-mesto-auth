import React from 'react';
import classnames from 'classnames';

function PopupWithForm(props) {
  const popupOpenedClassName = classnames('popup', { 'popup_opened': props.isOpen });
  return (
    <section className={popupOpenedClassName}>
      <form onSubmit={props.onSubmit}
        name={props.name} className="popup__container" noValidate>
        <button onClick={props.onClose} type="reset" className="popup__close-button" />
        <h2 className="popup__header">{props.title}</h2>
        {props.children}
        <button type="submit"
          className={`popup__save-button ${props.isLoading ? 'popup__save-button_loading popup__save-button_disabled' : ''}`}
          disabled={props.isLoading ? true : ''}
        >{props.isLoading ? '. . .' : props.button}</button>
      </form>
    </section>
  )
}

export default PopupWithForm;