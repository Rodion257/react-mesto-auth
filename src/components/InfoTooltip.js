import React from 'react';
import loginImage from '../images/Union.png';
import declineImage from '../images/Union_decline.png';


function InfoTooltip(props) {
    return (
        <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <figure className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__close-button" />
                <img className="popup__image popup_image_position"
                    src={props.onRegister ? loginImage : declineImage}
                    alt={props.onRegister ? 'Correct' : 'Incorrect'} />
                <figcaption className="popup__image-caption">
                    {props.onRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </figcaption>
            </figure>
        </section>
    )
}

export default InfoTooltip;