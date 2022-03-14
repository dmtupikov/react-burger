import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../services/actions/auth';
import styles from './auth.module.css';
import AppHeader from '../components/app-header/app-header';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPasswordPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: '' });
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const forgot = e => {
    e.preventDefault();
    dispatch(forgotPassword(form, history.push('/reset-password', {reset:true})));
  };

  if (localStorage.refreshToken) history.push('/');

  return (
    <div>
      <AppHeader />
      <div className={styles.conteiner + ' pt-20'}>
        <form>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <div className="mt-6"><EmailInput onChange={onChange} value={form.email} name="email" /></div>
          <div className="mt-6"><Button onClick={forgot} type="primary" size="medium">Восстановить</Button></div>
        </form>
        <div className="text text_type_main-small text_color_inactive mt-4">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></div>
      </div>
    </div>
  );
}