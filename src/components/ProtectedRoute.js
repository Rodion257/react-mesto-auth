import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Header from "./Header"
import Footer from './Footer'

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      <Header loggedIn={props.loggedIn} userData={props.userData} signOut={props.signOut} name={'Выйти'} />
      {
        props.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />
      }
      <Footer />
    </Route>
  )
}

export default ProtectedRoute;