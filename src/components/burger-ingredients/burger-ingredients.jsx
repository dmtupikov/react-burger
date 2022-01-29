import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import productPropTypes from '../../utils/product-prop-types';

const List = ({ products, name, ename, openModal }) => (
  <div className={styles.list_item + ' mb-8'}>
    <h2 className="text text_type_main-medium">{name}</h2>
	  <div className={styles.items}>
		{products.map((product, index) => (product.type === ename) && <Ingredient key={index} product={product} count={Math.floor(Math.random() * 3)} openModal={openModal} />)}
	  </div>
  </div>
);

List.propTypes = {
  products: PropTypes.arrayOf(productPropTypes.isRequired),
  name: PropTypes.string.isRequired,
  ename: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired
};

const Ingredient = ({ product, count, openModal }) => {
  const openIngredintCard = (e) => {
    const content = <IngredientDetails image={product.image_large} name={product.name} calories={product.calories} proteins={product.proteins} fat={product.fat} carbohydrates={product.carbohydrates} />
    openModal(content);
  }
  return (
  <div className={styles.item + ' mt-6 mb-2'} onClick={openIngredintCard}>
    <img src={product.image} alt={product.name}/>
    <span className={styles.price + ' mt-1 mb-1'}><span className="text text_type_digits-default mr-2">{product.price}</span><CurrencyIcon type="primary" /></span>
    <span className={styles.name + ' text text_type_main-default'}>{product.name}</span> 
    {count > 0 && <Counter count={count} size="default" />}
  </div>
  )
};

Ingredient.propTypes = {
  dataProducts: PropTypes.arrayOf(productPropTypes.isRequired),
  openModal: PropTypes.func.isRequired,
  count: PropTypes.number
};


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
        <List products={products} name="Булки" ename="bun" openModal={handleOpenModal} />
        <List products={products} name="Соусы" ename="sauce" openModal={handleOpenModal} />
        <List products={products} name="Начинки" ename="main" openModal={handleOpenModal} />
	  </div>
	</section>
  );
}

BurgerIngredients.propTypes = {
  products: PropTypes.arrayOf(productPropTypes.isRequired),
  handleOpenModal: PropTypes.func.isRequired
};

export default BurgerIngredients;