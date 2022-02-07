import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import close from '../../images/close.svg';
import ModalOverlay from '../modal-overlay/modal-overlay';


function Modal({visability, children, onClose}) {
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
  	<div className={visability ? styles.wrap_active : styles.wrap}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        {children}
        <button className={styles.close} onClick={onClose}><img src={close} alt="Закрыть" title="Закрыть"/></button>
      </div>
    </div>      
    ,
    modalRoot
  );
}

Modal.propTypes = {
  visability: PropTypes.bool.isRequired,
  children: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

export default Modal;