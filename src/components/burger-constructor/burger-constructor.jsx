import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon,Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import productPropTypes from '../../utils/product-prop-types';


function BurgerConstructor({products, handleOpenModal, num}) {
  const productsLength = products.length;

  const openOrderDetails = () => {
    const content = <OrderDetails />
    handleOpenModal(content);
  }

  return (
    <section className={styles.wrap + ' mt-15'} key={num}>
      <div className={styles.list + ' mt-4'}>
        {products.map((product, index) => <ConstructorElement text={product.name} price={product.price} thumbnail={product.image} type={(index === 0) ? 'top' : (index === (productsLength - 1)) ? 'bottom' : 'undefined' } key={index} /> )}
      </div>
      <div className={styles.footer + ' mt-10'}>
        <span className={styles.total + ' mr-10'}>
          <span className="text text_type_digits-medium mr-4">610</span><CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="medium" value="" onClick={openOrderDetails}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  products: PropTypes.arrayOf(productPropTypes.isRequired),
  handleOpenModal: PropTypes.func.isRequired
}; 

export default BurgerConstructor;