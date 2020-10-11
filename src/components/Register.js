import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import * as auth from '../utils/auth';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

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
    auth.register(email, password)
      .then((res) => {
        if (res.data) {
          resetForm();
          props.onRegister();
          props.isOpen();
          history.push('/sign-in');
        }
        else {
          setMessage(res.error || res.message)
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
            <p className="form__text">{message}</p>
            <button type="submit" className="form__button">Зарегистрироваться</button>
            <p className="form__text">Уже зарегистрированы? <a className="form__link" href="/sign-in">Войти</a></p>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Register;