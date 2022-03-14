import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { HomePage, ProfilePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, IngredientPage, NotFound404 } from '../../pages';


function App() {
  const modal = (window.history.state != null) ? (window.history.state.modal || false) : false;
  
  return (
    <Router>
      <Switch >
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          { (!modal) ? <IngredientPage /> : <HomePage modal={modal} /> }
        </Route>
        <ProtectedRoute path="/profile" exact={false}>
          <ProfilePage />
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;