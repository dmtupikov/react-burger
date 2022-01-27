import React from 'react';
import Styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
  render() {
    return (
      <header className="m-10">
        <div className={Styles.conteiner}>
	        <nav className="pt-4 pb-4 text text_type_main-default">
	          <ul className={Styles.menu}>
	            <li className={Styles.menu_item}><a href="#"><BurgerIcon type="primary" /><p className={[Styles.primary, 'ml-2'].join(' ')}>Конструктор</p></a></li>
	            <li className={Styles.menu_item}><a href="#"><ListIcon type="secondary" /><p className={[Styles.secondary, 'ml-2'].join(' ')}>Лента заказов</p></a></li>
	          </ul>
	        </nav>
	        <Logo />
	        <div className={Styles.auth}>
	            <span><ProfileIcon type="secondary" /><p className={[Styles.secondary, 'ml-2', 'text text_type_main-default'].join(' ')}>Личный кабинет</p></span>
	        </div>
	    </div>
      </header>
    );
  }
}

export default AppHeader;