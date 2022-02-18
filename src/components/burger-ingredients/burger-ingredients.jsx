import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list';


function BurgerIngredients({handleOpenModal}) {
  const [current, setCurrent] = React.useState('bun');
  const ref = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  
  const onScroll = () => {
    const distance = ref.current.getBoundingClientRect().y;
    const bunDistance = Math.abs(distance - bunRef.current.getBoundingClientRect().y);
    const sauceDistance = Math.abs(distance - sauceRef.current.getBoundingClientRect().y);
    const mainDistance = Math.abs(distance - mainRef.current.getBoundingClientRect().y);
    const minTabDistance = Math.min(bunDistance, sauceDistance, mainDistance);
    const activeTab = (minTabDistance === sauceDistance ? 'sauce' : (minTabDistance === mainDistance ? 'main' : 'bun'));
    setCurrent(activeTab);
  };

  const handleClick = (current) => {
    if (current === 'bun') bunRef.current.scrollIntoView(true);
    if (current === 'sauce') sauceRef.current.scrollIntoView(true);
    if (current === 'main') mainRef.current.scrollIntoView(true);
  };

  return (
    <section className={styles.wrap + ' mr-10'}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={styles.nav + ' mt-5 mb-10'}>
        <Tab value='bun' active={current === 'bun'} onClick={handleClick}>
          Булки
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={handleClick}>
          Соусы
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={handleClick}>
          Начинки
        </Tab>
      </div>
      <div ref={ref} onScroll={onScroll} className={styles.list}>
        <IngredientsList ref={bunRef} name="Булки" ename="bun" openModal={handleOpenModal} />
        <IngredientsList ref={sauceRef} name="Соусы" ename="sauce" openModal={handleOpenModal} />
        <IngredientsList ref={mainRef} name="Начинки" ename="main" openModal={handleOpenModal} />
	    </div>
	  </section>
  );
}

BurgerIngredients.propTypes = {
  handleOpenModal: PropTypes.func.isRequired
};

export default BurgerIngredients;