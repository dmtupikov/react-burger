import React from 'react';
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {
  const { itemObject } = useSelector(
    state => state.ingredients
  );

  const { image_large, name, calories, proteins, fat, carbohydrates } = itemObject;
  return (
    <div className={styles.wrap + ' pt-10 pb-15 pl-10 pr-10'}>
      <p className={styles.header + ' text text_type_main-large'}>Детали ингредиента</p>
      <img src={image_large} alt="{name}" />
      <p className={styles.name + ' text text_type_main-medium mt-4'}>{name}</p>
      <div className={styles.structure + ' mt-8'}>
        <div className={styles.component}>
          <p className={styles.component_name + ' text text_type_main-default'}>Калории,ккал</p>
          <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{calories}</p>
        </div>
        <div className={styles.component}>
          <p className={styles.component_name + ' text text_type_main-default'}>Белки, г</p>
          <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{proteins}</p>
        </div>
        <div className={styles.component}>
          <p className={styles.component_name + ' text text_type_main-default'}>Жиры, г</p>
          <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{fat}</p>
        </div>
        <div className={styles.component}>
          <p className={styles.component_name + ' text text_type_main-default'}>Углеводы, г</p>
          <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{carbohydrates}</p>
        </div>
      </div>

    </div>
  );
}

export default IngredientDetails;