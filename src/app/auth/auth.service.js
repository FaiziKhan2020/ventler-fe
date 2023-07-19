import { makeRequest } from '../shared/request-service';
import { METHODS } from '../shared/requests.constants';
import { AUTH_END_POINT } from './action.constant';

export const checkAutoLogin = () => {
  // const jwt = localStorage.getItem('token');
  // if (!jwt) return false;
  // const decodedJwt = JSON.parse(atob(jwt.split('.')[1]));
  // if (decodedJwt.expiry * 1000 < Date.now()) return false;
  return true;
};

export const loginUser = async (payload) => {
  try {
    const response = await makeRequest(
      AUTH_END_POINT.LOGIN,
      METHODS.POST,
      payload
    );
    if(response.data.error){
      throw new Error(response.data.error);
    }

    if (!response) {
      throw new Error(`Something wen't wrong during logging in!`);
    }
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.access_token);
  } catch (error) {
    console.log(`loginUser >`, error);
    throw error;
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await makeRequest(
      AUTH_END_POINT.REGISTER,
      METHODS.POST,
      payload
    );
    console.log(response);
    if (!response) {
      throw new Error(`Something wen't wrong during resgistration!`);
    }
  } catch (error) {
    console.log(`registerUser > `, error.response);
    throw error;
  }
};

// Csrf

export const csrf = async () => {
  try {
    const response = await makeRequest(AUTH_END_POINT.CSRF, METHODS.GET);
    console.log('Response: ', response);
    if (!response) {
      throw new Error(`Something wen't wrong during CSRF!`);
    }
    return response.headers['x-csrf-token'];
  } catch (error) {
    console.log(`CSRF > `, error.response);
    throw error;
  }
};
