import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

import { IModal } from '../modal/types';


const ModalOverlay:FC<IModal> = ({ onClose }) => {

  return (
    <div className={styles.overlay} onClick={onClose}>
    </div>
  );
}

export default ModalOverlay;
