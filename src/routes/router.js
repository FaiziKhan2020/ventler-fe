import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/sign-in/sign-in';
import ChatBoardPage from '../pages/ChatBoardPage';

const Router = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? (
      <Navigate to='/dashboard1' />
    ) : (
      <Navigate to='/auth' />
    ),
  },
  {
    path: '*',
    element: isLoggedIn ? <ChatBoardPage /> : <Login />,
  },
  {
    path: 'auth',
    element: isLoggedIn ? <Navigate to='/dashboard1' /> : <Login />,
  }
];

export default Router;
