import React from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import Header from './Header';

function Login(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    // const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(true);
    const history = useHistory();

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // props.isOpen(true);
        auth.authorize(email, password)
            .then((res) => {
                resetForm();
                if (!res.token) {
                    return;
                }
                props.onLogin();
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div>
            <Header name={'Регистрация'} link={"/sign-up"}/>
            <main className="main">
                <section className="form">
                    <form className="form__container" onSubmit={handleSubmit}>
                        <h1 className="form__header">Вход</h1>
                        <input className="form__input form__input-email" type="email" name="email" onChange={handleChangeEmail} autoComplete="off" placeholder="Email"></input>
                        <input className="form__input form__input-password" type="password" name="password" onChange={handleChangePassword} autoComplete="off" placeholder="Пароль"></input>
                        <button type="submit" className="form__button">Войти</button>
                        <p className="form__text">Ещё не зарегистрированы? <a className="form__link" href="/sign-up">Регистрация</a></p>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default Login;