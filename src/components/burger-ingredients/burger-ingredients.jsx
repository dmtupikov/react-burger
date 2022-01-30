import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list';
import IngredientDetails from '../ingredient-details/ingredient-details';
import productPropTypes from '../../utils/product-prop-types';


function BurgerIngredients({products, handleOpenModal}) {
  const [current, setCurrent] = React.useState('one');
  return (
    <section className={styles.wrap + ' mr-10'}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={styles.nav + ' mt-5 mb-10'}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.list}>
        <IngredientsList products={products} name="Булки" ename="bun" openModal={handleOpenModal} />
        <IngredientsList products={products} name="Соусы" ename="sauce" openModal={handleOpenModal} />
        <IngredientsList products={products} name="Начинки" ename="main" openModal={handleOpenModal} />
	  </div>
	</section>
  );
}

BurgerIngredients.propTypes = {
  products: PropTypes.arrayOf(productPropTypes.isRequired),
  handleOpenModal: PropTypes.func.isRequired
};

export default BurgerIngredients;