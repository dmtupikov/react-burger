import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeedItem from '../components/feed/feed-item';
import FeedInfo from '../components/feed/feed-info';
import { TInitialSocketState, TOrder } from '../services/types';
import styles from './home.module.css';


export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector<{ wsr : TInitialSocketState }, { orders : Array<TOrder> }>(
    state => state.wsr.data
  );
  
  useEffect(() => {
    dispatch({ type: 'WS_CONNECTION_START' });
    return () => {
      dispatch({ type: 'WS_CONNECTION_CLOSED' });
    };
  }, [dispatch]);

  return (
    <div>
      <main>
        <h1 className="text text_type_main-large">Лента заказов</h1>
        <div className={styles.conteiner + ' mt-5'}>
          <section className={styles.item}>	
          	{orders && orders.map((order : TOrder, index : number) => <FeedItem key={order._id} order={order} />)}
          </section>
          <section className={styles.item}>
            <FeedInfo />
          </section>
        </div>
      </main>
    </div>
  )
};
