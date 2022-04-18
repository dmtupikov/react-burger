import React, { useEffect, FC } from 'react';
import { useDispatch } from '../services/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/wsActions';
import FeedDetails from '../components/feed-details/feed-details';


export const OrderPage: FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <main>
      <FeedDetails isProfile={false} />
    </main>
  )
};