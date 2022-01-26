import React from 'react';
import Styles from './app.module.css';
import data from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <main>
          <div className={Styles.conteiner}>  
            <BurgerIngredients data={data.products} />
            <BurgerConstructor data={data.products} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
