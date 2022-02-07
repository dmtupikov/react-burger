import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon,Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import { ProductsContext } from '../../services/productsContext.jsx';
import { CartContext } from '../../services/cartContext.jsx';
import { OrdersContext } from '../../services/ordersContext.jsx';


function BurgerConstructor({handleOpenModal}) { 

  const { totalState, cartState } = useContext(CartContext);
  const { dataProducts } = useContext(ProductsContext);
  const { ordersState, setOrders, url } = useContext(OrdersContext);
  const productsLength = dataProducts.length;
  const bunConstructor = (cartState.bun != null) ? dataProducts.find(product => product._id === cartState.bun) : null;

  const openOrderDetails = () => {
    const getOrder = async () => {
      let ingredients = [...cartState.ingredients, cartState.bun, cartState.bun];
      fetch(url + 'orders', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ingredients: ingredients,
          })
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .then(data => {
          const content = <OrderDetails number={data.order.number} />
          handleOpenModal(content);
          setOrders({orders:[...ordersState.orders, {number:data.order.number, name:data.name, ingredients: ingredients}] });
          console.log(ordersState);
        })
        .catch(e => {
          console.log('Ошибка при оформлении заказа');
        });
    };
    getOrder();
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
  };


  return (
    <section className={styles.wrap + ' mt-15'}>
      <div className={styles.list + ' mt-4'}>
        {(bunConstructor != null) && createConstructorElement(bunConstructor, (productsLength+1), 'top')}
        <div className={styles.main}>
          {(productsLength > 0) && dataProducts.map((product, index) => (product.type !== 'bun') && createConstructorElement(product, index))}
        </div>
        {(bunConstructor != null) && createConstructorElement(bunConstructor, (productsLength+2), 'bottom')}
      </div>
      <div className={styles.footer + ' mt-10'}>
        <span className={styles.total + ' mr-10'}>
          <span className="text text_type_digits-medium mr-4">{totalState.total}</span><CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="medium" value="" onClick={openOrderDetails}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
}; 

export default BurgerConstructor;