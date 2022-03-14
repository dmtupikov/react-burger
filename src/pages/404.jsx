import React from 'react';
import styles from './not-found.module.css';
import AppHeader from '../components/app-header/app-header';

export function NotFound404() {

  return (
    <div>
      <AppHeader />
      <div className={styles.conteiner}>
        <p className="text text_type_digits-large">404</p>
        <p className="text text_type_main-large">Страница не найдена</p>
      </div>
    </div>
  );
}