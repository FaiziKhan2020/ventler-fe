import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/sign-in/sign-in';
import Signup from '../components/sign-up/sign-up';
import ForgetPassword from '../components/forget-password/forget-password';
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
    path: '/dashboard1',
    element: isLoggedIn ? <ChatBoardPage /> : <Login />,
  },
  {
    path: 'auth',
    element: isLoggedIn ? <Navigate to='/dashboard1' /> : <Login />,
  },
  {
    path: 'auth/forget',
    element: <ForgetPassword />,
  },
  {
    path: 'auth/signUp',
    element: <Signup />,
  },
];

export default Router;
