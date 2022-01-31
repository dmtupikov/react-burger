import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon,Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import productPropTypes from '../../utils/product-prop-types';


function BurgerConstructor({products, handleOpenModal, num}) {
  const productsLength = products.length;
  const bun = (productsLength > 0) ? products.find(product => product.type === 'bun') : null;

  const openOrderDetails = () => {
    const content = <OrderDetails />
    handleOpenModal(content);
  }

  const createConstructorElement = (product, num, position = false) => {
    if (position) {
      return (
        <ConstructorElement text={product.name + ((position === 'top') ? ' (верх)' : ' (низ)')} isLocked={true} price={product.price} thumbnail={product.image} key={num} type={position} />
      )
    } else {
      return (
        <ConstructorElement text={product.name} price={product.price} thumbnail={product.image} key={num} /> 
      )
    }
  }

  return (
    <section className={styles.wrap + ' mt-15'} key={num}>
      <div className={styles.list + ' mt-4'}>
        {(productsLength > 0) && createConstructorElement(bun, (productsLength+1), 'top')}
        <div className={styles.main}>
          {(productsLength > 0) && products.map((product, index) => (product.type !== 'bun') && createConstructorElement(product, index))}
        </div>
        {(productsLength > 0) && createConstructorElement(bun, (productsLength+2), 'bottom')}
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