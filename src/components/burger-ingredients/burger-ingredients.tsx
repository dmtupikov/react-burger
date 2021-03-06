import React, {useRef, FC} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list';


const BurgerIngredients: FC = () => {
  const [current, setCurrent] = React.useState('bun');
  const ref = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  
  const onScroll = () => {
    if (ref && ref.current) {
      const distance = ref.current.getBoundingClientRect().y;
      if (bunRef && bunRef.current) {
        const bunDistance = Math.abs(distance - bunRef.current.getBoundingClientRect().y);
        if (sauceRef && sauceRef.current) {
          const sauceDistance = Math.abs(distance - sauceRef.current.getBoundingClientRect().y);
          if (mainRef && mainRef.current) {
            const mainDistance = Math.abs(distance - mainRef.current.getBoundingClientRect().y);
            const minTabDistance = Math.min(bunDistance, sauceDistance, mainDistance);
            const activeTab = (minTabDistance === sauceDistance ? 'sauce' : (minTabDistance === mainDistance ? 'main' : 'bun'));
            setCurrent(activeTab);
          }
        }
      }
    }
  };

  const handleClick = (current:string) => {
    if (current === 'bun') (bunRef && bunRef.current) && bunRef.current.scrollIntoView(true);
    if (current === 'sauce') (sauceRef && sauceRef.current) && sauceRef.current.scrollIntoView(true);
    if (current === 'main') (mainRef && mainRef.current) && mainRef.current.scrollIntoView(true);
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
        <IngredientsList ref={bunRef} name="Булки" ename="bun" />
        <IngredientsList ref={sauceRef} name="Соусы" ename="sauce" />
        <IngredientsList ref={mainRef} name="Начинки" ename="main" />
	    </div>
	  </section>
  );
}

export default BurgerIngredients;