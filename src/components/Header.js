import React from 'react';
import headerLogo from '../images/logo.svg'

function Header(props) {

  return (
    <header className="header">
      <img src={headerLogo} alt="Лого Место" className="header__logo" />
      <p className="header__email">{props.loggedIn ? props.userData.email : undefined}</p>
      <a onClick={props.loggedIn ? props.signOut : undefined} type="button" className={`header__link ${props.loggedIn && 'header__link_logged_in'}`} href={props.link}>{props.name}</a>
    </header>
  )
}

export default Header