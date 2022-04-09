import React, { useMemo, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ADD_BUN_CONSTRUCTOR, ADD_INGREDIENT_CONSTRUCTOR, MOVE_ITEM_CONSTRUCTOR, RESET_CONSTRUCTOR } from '../../services/actions/constructor';
import { getOrder } from '../../services/actions/order';
import ConstructorIngredient from './constructor-ingredient';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { IStateI, IStateC } from './types';
import { IIngredients } from '../../services/actions/ingredients'
import styles from './burger-constructor.module.css';


export const BurgerConstructor: FC = () => {

  const { items } = useSelector<IStateI, { items: Array<IIngredients> | null }>(
    state => state.ingredients
  );
  const { ingredients, bun } = useSelector< IStateC, { ingredients:Array<{id:string, uuid:string}>|null, bun:string|null } >(
    state => state.construct
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const moveItem = (item:{id:string, uuid:string}) => {
    if (items) {
      const ingredient = items.find((product) => product._id === item.id);
      if (ingredient) {
        const type:string = ingredient.type;
        if (type === 'bun') {
          dispatch({
            type: ADD_BUN_CONSTRUCTOR,
            ...item
          })
        } else {
          dispatch({
            type: ADD_INGREDIENT_CONSTRUCTOR,
            ...item
          })
        }
      }
    }
  };

  const [, dropTarget] = useDrop({
    accept:'items',
    drop(itemId:{id:string, uuid:string}) {
      itemId.uuid = uuidv4();
      moveItem(itemId)
    },
  });

  const openOrderDetails = () => {
    if (localStorage.refreshToken) {
      if (bun != null) {
        const orderIngredients = (ingredients != null) ? [...ingredients.map(item => item.id), bun, bun] : [bun, bun];
        dispatch(getOrder(orderIngredients));
        dispatch({type:RESET_CONSTRUCTOR});
      }
    } else {
      history.push('/login');
    }
  }

  const moveItemSub = (item:{id:string,num:number,ref:any }, monitor:any) => {
    if (item.ref && item.ref.current) {
      const dist = monitor.getClientOffset().y - item.ref.current.getBoundingClientRect().y;
      const newPos = item.num + Math.floor(dist/100);
      dispatch({
        type: MOVE_ITEM_CONSTRUCTOR,
        id: item.id,
        pos: item.num,
        newPos: newPos
      });
    }
  };
  
  const [, dropTargetSub] = useDrop({
    accept: 'itemsSub',
    drop: (item:{id:string,num:number,ref:HTMLDivElement }, monitor:any) =>  {
      moveItemSub(item, monitor)
    },
  });

  const total = useMemo(() => {
    let total = 0;
    if (ingredients != null) ingredients.forEach((item) => {
      if (items) {
        const ingredient = items.find(product => item.id === product._id);
        if (ingredient) {
          total += ingredient.price;
        }
      }
    })
    if (bun != null) {
      if (items) {
        const ingredient = items.find(product => product._id === bun);
        if (ingredient) {
          total += 2 * ingredient.price;
        }
      }
    }
    return total;
  }, [ingredients, bun, items]);


  return (
    <section ref={dropTarget} className={styles.wrap + ' mt-15'}>
      <div className={styles.list + ' mt-4'}>
        {(bun != null) && <ConstructorIngredient id={bun} position='top' /> }
        <div className={styles.main} ref={dropTargetSub}>
          {(ingredients != null) && ingredients.map((product, index) => <ConstructorIngredient id={product.id} num={index} k={product.uuid} key={product.uuid} />)}
        </div>
        {(bun != null) && <ConstructorIngredient id={bun} position='bottom' />}
      </div>
      <div className={styles.footer + ' mt-10'}>
        <span className={styles.total + ' mr-10'}>
          <span className="text text_type_digits-medium mr-4">{total}</span><CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="medium" onClick={openOrderDetails}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;