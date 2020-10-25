import React from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import classnames from 'classnames';
import Header from './Header';

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailLength, setEmailLength] = React.useState(false);
  const [passLength, setPassLength] = React.useState(false);
  const history = useHistory();
  const loginButtonClassName = classnames('form__button', { 'form__button_disabled': (!passLength || !emailLength) });
  const disabledButton = classnames({ disabled: (!passLength || !emailLength) });

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    if (e.target.value.length > 3) {
      setEmailLength(true)
    } else {
      setEmailLength(false);
    };
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPassLength(true)
    } else {
      setPassLength(false);
    };
  }

  function resetForm() {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth.authorize(email, password)
      .then((res) => {
        resetForm();
        if (res.token) {
          props.onLogin();
          props.isOpen();
          history.push('/');
        }
        else {
          props.handleMessage(res.error || res.message);
          props.notLogin();
          props.isOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <div>
      <Header name={'Регистрация'} link={"/sign-up"} />
      <main className="main">
        <section className="form">
          <form className="form__container" onSubmit={handleSubmit}>
            <h1 className="form__header">Вход</h1>
            <input className="form__input form__input-email" type="email" name="email" onChange={handleChangeEmail} autoComplete="off" placeholder="Email"></input>
            <input className="form__input form__input-password" type="password" name="password" onChange={handleChangePassword} autoComplete="off" placeholder="Пароль"></input>
            <button type="submit" className={loginButtonClassName} disabled={disabledButton}>Войти</button>
            <p className="form__text">Ещё не зарегистрированы? <a className="form__link" href="/sign-up">Регистрация</a></p>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Login;