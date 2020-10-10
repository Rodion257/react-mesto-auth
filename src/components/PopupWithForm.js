import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
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