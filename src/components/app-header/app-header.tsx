import React, { FC } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader: FC = () => {
  const { pathname } = useLocation();
  return (
    <header className="mb-10">
      <div className={styles.conteiner}>
        <nav className="pt-4 pb-4 text text_type_main-default">
          <ul className={styles.menu}>
	        <li className={styles.menu_item}><NavLink to='/' className={styles.link} activeClassName={styles.active} exact><BurgerIcon type={ (pathname === '/') ? 'primary' : 'secondary' } /><span className="ml-2">Конструктор</span></NavLink></li>
	        <li className={styles.menu_item}><NavLink to='/feed' className={styles.link} activeClassName={styles.active} exact><ListIcon type={ (pathname === '/feed') ? 'primary' : 'secondary' } /><span className="ml-2">Лента заказов</span></NavLink></li>
	      </ul>
	    </nav>
	    <Link to=''><Logo /></Link>
	    <div className={styles.auth}>
	      <NavLink to='/profile' className={styles.link} activeClassName={styles.active} exact><ProfileIcon type={ (pathname === '/profile') ? 'primary' : 'secondary' } /><span className="ml-2 text text_type_main-default">Личный кабинет</span></NavLink>
	    </div>
	  </div>
    </header>
  );
}

export default AppHeader;