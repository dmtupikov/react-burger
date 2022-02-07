import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import IngredientItem from './ingredient-item';
import { ProductsContext } from '../../services/productsContext.jsx';



function IngredientsList({ name, ename, openModal }) {
  const { dataProducts } = useContext(ProductsContext);
  return (
    <div className={styles.list_item + ' mb-8'}>
      <h2 className="text text_type_main-medium">{name}</h2>
	    <div className={styles.items}>
		    {dataProducts.map((product, index) => (product.type === ename) && <IngredientItem key={product._id} product={product} count={Math.floor(Math.random() * 3)} openModal={openModal} />)}
	    </div>
    </div>
  )
};

IngredientsList.propTypes = {
  name: PropTypes.string.isRequired,
  ename: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired
};


export default IngredientsList;