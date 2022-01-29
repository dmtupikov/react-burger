import React from 'react';
import styles from './order-details.module.css';
import done from '../../images/done.svg';

function OrderDetails() {

  return (
    <div className={styles.wrap + ' pt-30 pb-30'}>
      <p className={styles.id + ' text text_type_digits-large'}>034536</p>
      <p className={styles.id_label + ' text text_type_main-medium mt-8'}>идентификатор заказа</p>
      <img src={done} alt="Успешно" className={styles.done + ' mt-15'} />
      <p className={styles.status + ' text text_type_main-default mt-15'}>Ваш заказ начали готовить</p>
      <p className={styles.message + ' text text_type_main-default mt-2'}>Дождитесь готовности на орбитальной станции</p>

    </div>
  );
}

export default OrderDetails;
