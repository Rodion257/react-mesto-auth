import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import classnames from 'classnames';
import * as auth from '../utils/auth';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailLength, setEmailLength] = React.useState(false);
  const [passLength, setPassLength] = React.useState(false);

  const history = useHistory();
  const registerButtonClassName = classnames('form__button', { 'form__button_disabled': (!passLength || !emailLength) });
  const disabledButton = classnames({ disabled: (!passLength || !emailLength) });

  function handleChangeEmail(e) {
    setEmail(e.target.value)
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
    auth.register(email, password)
      .then((res) => {
        if (res.data) {
          resetForm();
          props.onRegister();
          props.isOpen();
          history.push('/sign-in');
        }
        else {
          props.handleMessage(res.error || res.message);
          props.onUnregister();
          props.isOpen();
        }
      })
  }
  return (
    <div>
      <Header name={'Войти'} link={"/sign-in"} />
      <main className="main">
        <section className="form">
          <form className="form__container" onSubmit={handleSubmit}>
            <h1 className="form__header">Регистрация</h1>
            <input className="form__input form__input-email" type="email" name="email" onChange={handleChangeEmail} autoComplete="off" placeholder="Email" required></input>
            <input className="form__input form__input-password" type="password" name="password" onChange={handleChangePassword} autoComplete="off" placeholder="Пароль" required></input>
            <button type="submit" className={registerButtonClassName} disabled={disabledButton}>Зарегистрироваться</button>
            <p className="form__text">Уже зарегистрированы? <a className="form__link" href="/sign-in">Войти</a></p>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Register;