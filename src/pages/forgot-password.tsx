import React, { useState, FC, SyntheticEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from '../services/hooks';
import { forgotPassword } from '../services/actions/auth';
import styles from './auth.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const ForgotPasswordPage: FC = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: '' });
  const onChange = (e:{target: HTMLInputElement}) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    history.push('/reset-password', {reset:true})
  };

  const forgot = (e:SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(form, redirect));
  };

  if (localStorage.refreshToken) history.push('/');

  return (
    <div>
      <div className = { styles.conteiner + ' pt-20' } >
        <form onSubmit={forgot}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <div className="mt-6"><EmailInput onChange={onChange} value={form.email} name="email" /></div>
          <div className="mt-6"><Button type="primary" size="medium">Восстановить</Button></div>
        </form>
        <div className="text text_type_main-small text_color_inactive mt-4">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></div>
      </div>
    </div>
  );
}