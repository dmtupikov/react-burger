import React from 'react';
import PropTypes from 'prop-types';
import Styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component {
  render() {
    const ll = this.props.data.length;
    return (
      <section className={[Styles.wrap, 'mt-15'].join(' ')}>
        <div class={[Styles.list, 'mt-4'].join(' ')} style={{ gap: '10px' }}>
          {this.props.data.map((product, index) => <ConstructorElement text={product.name} price={product.price} thumbnail={product.image} type={(index === 0) ? 'top' : (index === (ll - 1)) ? 'bottom' : 'undefined' } /> )}
        </div>
        <div className={[Styles.footer, 'mt-10'].join(' ')}>
          <span className={[Styles.total, 'mr-10'].join(' ')}>
            <span className="text text_type_digits-medium mr-4">610</span><CurrencyIcon type="primary" />
          </span>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
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
  }))
}; 

export default BurgerConstructor;