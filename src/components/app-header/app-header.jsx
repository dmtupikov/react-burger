import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className="m-10">
      <div className={styles.conteiner}>
        <nav className="pt-4 pb-4 text text_type_main-default">
          <ul className={styles.menu}>
	        <li className={styles.menu_item}><span className={styles.link}><BurgerIcon type="primary" /><p className={styles.primary + ' ml-2'}>Конструктор</p></span></li>
	        <li className={styles.menu_item}><span className={styles.link}><ListIcon type="secondary" /><p className={styles.secondary + ' ml-2'}>Лента заказов</p></span></li>
	      </ul>
	    </nav>
	    <Logo />
	    <div className={styles.auth}>
	      <span><ProfileIcon type="secondary" /><p className={styles.secondary + ' ml-2 text text_type_main-default'}>Личный кабинет</p></span>
	    </div>
	  </div>
    </header>
  );
}

export default AppHeader;