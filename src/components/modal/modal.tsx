import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import close from '../../images/close.svg';
import ModalOverlay from '../modal-overlay/modal-overlay';

import { IModal } from './types';


const Modal:FC<IModal> = ({ onClose, children }) => {
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

  return (
    modalRoot && ReactDOM.createPortal(
    	<div className={(children != null) ? styles.wrap_active : styles.wrap}>
        <ModalOverlay onClose={onClose} />
        <div className={styles.modal}>
          {children}
          <button className={styles.close} onClick={onClose}><img src={close} alt="Закрыть" title="Закрыть"/></button>
        </div>
      </div>      
      ,
      modalRoot
    )
  );
}

export default Modal;