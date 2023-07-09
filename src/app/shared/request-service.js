import axios from 'axios';
import { getBaseApi } from '../../config/Enviroment';

export const makeRequest = (
  endpoint,
  method,
  payload = null,
  addedHeaders = null,
  params = null,
  baseApiEndPoint = getBaseApi()
) => {
  let headers = {};

  const token = localStorage.getItem('token');
  if (token) headers.Authorization = `Bearer ${token}`;

  if (addedHeaders) headers = { ...headers, ...addedHeaders };
  const path = `${baseApiEndPoint}${endpoint}`;

  switch (method) {
    case 'GET':
      return axios.get(path, { headers });
    case 'POST':
      return axios.post(path, payload, { headers });
    case 'DELETE':
      return axios.delete(path, { headers, params });
    case 'PUT':
      return axios.put(path, payload, {
        headers,
        params,
      });
    case 'PATCH':
      return axios.patch(path, payload, {
        headers,
        params,
      });
    default:
      return false;
  }
};

// export const getPdfRequest = (
//   endpoint,
//   payload = null,
//   addedHeaders = null
// ) => {
//   let headers = {};
//   const token = localStorage.getItem('token');
//   if (token) headers.Authorization = `Bearer ${token}`;
//   if (addedHeaders) headers = { ...headers, ...addedHeaders };
//   return axios.post(`${getBaseApi()}${endpoint}`, payload, {
//     headers,
//     responseType: 'blob',
//   });
// };
