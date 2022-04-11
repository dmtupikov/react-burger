import React, { useEffect, FC } from 'react';
import { useDispatch } from '../services/hooks';
import FeedDetails from '../components/feed-details/feed-details';


export const ProfileOrderPage: FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'WS_CONNECTION_START_USER' });
    return () => {
      dispatch({ type: 'WS_CONNECTION_CLOSED_USER' });
    };
  }, [dispatch]);

  return (
    <main>
      <FeedDetails isProfile={true} />
    </main>
  )
};