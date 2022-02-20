import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './modal.module.css';
import close from '../../images/close.svg';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useSelector } from 'react-redux';


function Modal({onClose}) {
  const { itemObject } = useSelector(
    state => state.ingredients
  );
  const { orderObject } = useSelector(
    state => state.order
  );

  const modalRoot = document.getElementById("react-modals");

  const onPressEsc = React.useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  React.useEffect(() => {
    document.addEventListener('keydown', onPressEsc);
    return () => {
      document.removeEventListener('keydown', onPressEsc);
    };
  }, [onPressEsc]);

  return ReactDOM.createPortal(
  	<div className={((itemObject != null) || (orderObject != null)) ? styles.wrap_active : styles.wrap}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        {(orderObject != null) ? (<OrderDetails />) : ((itemObject != null) ? (<IngredientDetails />) : (<div className={'text text_type_main-large p-20'}>ОШИБКА</div>)) }
        <button className={styles.close} onClick={onClose}><img src={close} alt="Закрыть" title="Закрыть"/></button>
      </div>
    </div>      
    ,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Modal;