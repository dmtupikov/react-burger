import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';


function ModalOverlay({visability, children}) {

  return (
    <div className={visability ? styles.overlay_active : styles.overlay}>
      {children}
    </div>
    
  );
}

ModalOverlay.propTypes = {
  visability: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
};

export default ModalOverlay;
