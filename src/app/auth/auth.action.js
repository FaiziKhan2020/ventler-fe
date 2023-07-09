import { AUTH_ACTIONS } from './action.constant';

import * as authService from './auth.service';

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_USER });
    try {
      const payload = { email, password };
      await authService.loginUser(payload);
      await navigate('/');
      return dispatch({ type: AUTH_ACTIONS.LOGGEDIN_USER });
    } catch (error) {
      return dispatch({
        type: AUTH_ACTIONS.LOGIN_USER_FAILED,
        error: error.message,
      });
    }
  };
};

export const register = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_ACTIONS.REGISTERING_USER });
    try {
      const payload = {
        email,
        password,
      };
      await authService.registerUser(payload);
      await navigate('/auth');
      return dispatch({ type: AUTH_ACTIONS.REGISTERED_USER });
    } catch (error) {
      console.error(error);

      return dispatch({
        type: AUTH_ACTIONS.REGISTERING_USER_FAILED,
        error: error,
      });
    }
  };
};

// taken csrf
export const csrf = () => {
  return async (dispatch) => {
    dispatch({ type: AUTH_ACTIONS.TAKING_CSRF });
    try {
      const token = await authService.csrf();

      console.log('Token: ', token);
      return dispatch({
        type: AUTH_ACTIONS.TAKEN_CSRF,
        payload: token,
      });
    } catch (error) {
      console.error(error);

      return dispatch({
        type: AUTH_ACTIONS.CSRF_FAILED,
        error: error,
      });
    }
  };
};
