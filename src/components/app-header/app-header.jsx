import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  const { pathname } = useLocation();
  return (
    <header className="mb-10">
      <div className={styles.conteiner}>
        <nav className="pt-4 pb-4 text text_type_main-default">
          <ul className={styles.menu}>
	        <li className={styles.menu_item}><NavLink to='/' className={styles.link} activeClassName={styles.active}><BurgerIcon type={ (pathname === '/') ? 'primary' : 'secondary' } /><span className="ml-2">Конструктор</span></NavLink></li>
	        <li className={styles.menu_item}><NavLink to='/lenta' className={styles.link} activeClassName={styles.active}><ListIcon type={ (pathname === '/lenta') ? 'primary' : 'secondary' } /><span className="ml-2">Лента заказов</span></NavLink></li>
	      </ul>
	    </nav>
	    <Logo />
	    <div className={styles.auth}>
	      <NavLink to='/profile' className={styles.link} activeClassName={styles.active}><ProfileIcon type={ (pathname === '/profile') ? 'primary' : 'secondary' } /><span className="ml-2 text text_type_main-default">Личный кабинет</span></NavLink>
	    </div>
	  </div>
    </header>
  );
}

export default AppHeader;