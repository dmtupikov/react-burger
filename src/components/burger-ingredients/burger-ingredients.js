import React from 'react';
import PropTypes from 'prop-types';
import Styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const productPropTypes = PropTypes.shape({
  "_id":PropTypes.string.isRequired,
  "name":PropTypes.string.isRequired,
  "type":PropTypes.string.isRequired,
  "proteins":PropTypes.number,
  "fat":PropTypes.number,
  "carbohydrates":PropTypes.number,
  "calories":PropTypes.number,
  "price":PropTypes.number,
  "image":PropTypes.string.isRequired,
  "image_mobile":PropTypes.string.isRequired,
  "image_large":PropTypes.string.isRequired,
  "__v":PropTypes.number
});

const List = ({ data, name, ename }) => (
  <div className={[Styles.list_item, 'mb-8'].join(' ')}>
    <h2 className="text text_type_main-medium">{name}</h2>
	  <div className={[Styles.items].join(' ')}>
		{data.map((product, index) => (product.type == ename) ? <Ingredient key={index} image={product.image} name={product.name} price={product.price} /> : '')}
	  </div>
  </div>
);

List.propTypes = {
  data: PropTypes.arrayOf(productPropTypes.isRequired),
  name: PropTypes.string.isRequired,
  ename: PropTypes.string.isRequired
};

const Ingredient = ({ index, image, name, price }) => (
  <div className={[Styles.item, 'mt-6', 'mb-2'].join(' ')} key={index}>
    <img src={image} alt={name}/>
    <span className={[Styles.price, 'mt-1', 'mb-1'].join(' ')}><span className="text text_type_digits-default mr-2">{price}</span><CurrencyIcon type="primary" /></span>
    <span className={[Styles.name, 'text', 'text_type_main-default'].join(' ')}>{name}</span> 
  </div>
);

Ingredient.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ename: PropTypes.string
};


class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className={[Styles.wrap, 'mr-10'].join(' ')}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className="mt-5 mb-10" style={{display: 'flex'}}>
          <Tab value="one" active={true} onClick={console.log()}>
            Булки
          </Tab>
          <Tab value="two" active={false} onClick={console.log()}>
            Соусы
          </Tab>
          <Tab value="three" active={false} onClick={console.log()}>
            Начинки
          </Tab>
        </div>
        <div className={Styles.list}>
          <List data={this.props.data} name="Булки" ename="bun" />
          <List data={this.props.data} name="Соусы" ename="sauce" />
          <List data={this.props.data} name="Начинки" ename="main" />
	    </div>
	  </section>
    );
  }
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(productPropTypes.isRequired),
};

export default BurgerIngredients;