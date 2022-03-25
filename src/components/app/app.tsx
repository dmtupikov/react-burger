import React, { FC } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import AppHeader from '../app-header/app-header';
import { HomePage, ProfilePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, IngredientPage, NotFound404 } from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


export const App: FC = () => {
  const location = useLocation<any>();
  const history = useHistory<any>();
  const background = location.state && location.state.background;
  const returnFromModal = () => {
    history.goBack();
  };
  
  return (
    <div>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/login" exact={true}>
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
          { (!background) ? <IngredientPage /> : <HomePage /> }
        </Route>
        <ProtectedRoute path="/profile" exact={false}>
          <ProfilePage />
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <Route path='/ingredients/:id' exact={true}>
          <Modal onClose={returnFromModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </div>
  );
}

export default App;