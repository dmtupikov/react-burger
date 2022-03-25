import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, useLocation, RouteProps } from 'react-router-dom';

import { getAccessToken } from '../services/actions/auth';


export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const refreshToken = localStorage.refreshToken;

  useEffect(() => {
    if (refreshToken) {
      dispatch(getAccessToken());
    }
  }, [dispatch, refreshToken]);

  return (
    <Route
      {...rest}
      render={() =>
        refreshToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}