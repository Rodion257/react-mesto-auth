import React from 'react';

function PopupWithImage(props) {
    return (
        <section className={`popup popup_image_open ${props.isOpen ? 'popup_opened' : ''}`}>
            <figure className="popup__image-container">
                <button onClick={props.onClose} className="popup__close-button popup__close-button_image_close" />
                <img className="popup__image"
                    src={props.card.link}
                    alt={props.card.name} />
                <figcaption className="popup__caption">{props.card.name}</figcaption>
            </figure>
        </section>
    )
}

export default PopupWithImage;