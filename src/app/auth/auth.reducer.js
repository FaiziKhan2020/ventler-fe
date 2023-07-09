import { AUTH_ACTIONS } from './action.constant';

const INITIAL_STATE = {
  CSRF: '',
  showAlert: false,
  userId: null,
  firstName: '',
  lastName: '',
  email: '',
  isLoggedIn: false,
  loading: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.REGISTERING_USER:
      return { ...state, loading: true };
    case AUTH_ACTIONS.REGISTERED_USER:
      return { ...state, loading: false };
    case AUTH_ACTIONS.REGISTERING_USER_FAILED:
      return { ...state, loading: false, error: action.error };
    case AUTH_ACTIONS.LOGIN_USER:
      return { ...state, loading: true };
    case AUTH_ACTIONS.LOGGEDIN_USER:
      return { ...state, loading: false };
    case AUTH_ACTIONS.TAKING_CSRF:
      return { ...state, loading: true };
    case AUTH_ACTIONS.TAKEN_CSRF:
      return { ...state, CSRF: action.payload };
    case AUTH_ACTIONS.CSRF_FAILED:
      return { ...state, error: ' ' };
    case AUTH_ACTIONS.LOGIN_USER_FAILED:
      return {
        ...state,
        loading: false,
        showAlert: true,
        error:
          action.error,
      };
    default:
      return INITIAL_STATE;
  }
};

export default authReducer;
