import { METHODS } from '../shared/requests.constants';
import { DATA_ACTIONS_END_POINT } from './actions.constant';
import { makeRequest } from '../shared/request-service';
import { useSelector } from 'react-redux';

export const GetDataService = async (payload) => {
  const CSRF = useSelector((auth) => auth.INITIAL_STATE.CSRF);
  try {
    const token = localStorage.getItem('token') || '';
    const response = await makeRequest(
      DATA_ACTIONS_END_POINT.CREATE_PROBLEM,
      METHODS.GET,
      payload,
      { Authorization: `Bearer ${token}`, 'X-CSRF-Token': CSRF }
    );
    if (!response) {
      throw new Error(`Something went wrong!`);
    }
  } catch (error) {
    console.error(`getData > ${error.toString()}`);
    throw error;
  }
};

// file upload
export const FileUploadService = async (payload) => {
  const CSRF = useSelector((auth) => auth.INITIAL_STATE.CSRF);

  try {
    const token = localStorage.getItem('token') || '';
    const response = await makeRequest(
      DATA_ACTIONS_END_POINT.CREATE_PROBLEM,
      METHODS.POST,
      payload,
      { Authorization: `Bearer ${token}`, 'X-CSRF-Token': CSRF }
    );
    if (!response) {
      throw new Error(`Something wen't wrong!`);
    }
  } catch (error) {
    console.error(`fileUpload > ${error.toString()}`);
    throw error;
  }
};

// getQuestion
export const GetQuestionService = async (payload) => {
  try {
    const CSRF = useSelector((auth) => auth.INITIAL_STATE.CSRF);
    const token = localStorage.getItem('token') || '';
    const response = await makeRequest(
      DATA_ACTIONS_END_POINT.CREATE_PROBLEM,
      METHODS.GET,
      payload,
      { Authorization: `Bearer ${token}`, 'X-CSRF-Token': CSRF }
    );
    if (!response) {
      throw new Error(`Something wen't wrong!`);
    }
  } catch (error) {
    console.error(`getQuestion > ${error.toString()}`);
    throw error;
  }
};

// fetching Flows service
export const fetchingFlowsService = async (CSRF_Token) => {
  try {
    console.log('Getting flows CSRF: ', CSRF_Token);
    const token = localStorage.getItem('token');
    const response = await makeRequest(
      DATA_ACTIONS_END_POINT.FLOWS,
      METHODS.GET,
      null,
      { Authorization: `Bearer ${token}`, 'X-CSRF-Token': CSRF_Token }
    );
    if (!response) {
      throw new Error(`Something wen't wrong!`);
    }
    return response.data;
  } catch (error) {
    console.error(`getQuestion > ${error.toString()}`);
    throw error;
  }
};

// post Data service
export const postDataService = async (payload, CSRf) => {
  try {
    const token = localStorage.getItem('token');
    const response = await makeRequest(
      DATA_ACTIONS_END_POINT.DATA_POST,
      METHODS.POST,
      payload,
      {
        Authorization: `Bearer ${token}`,
        'X-CSRF-Token': CSRf,
        'Content-Type': 'multipart/form-data',
      }
    );
    if (!response) {
      throw new Error(`Something wen't wrong!`);
    }
  } catch (error) {
    console.error(`Post Data > ${error.toString()}`);
    throw error;
  }
};

export const fetchUserChats = async (CSRF) => {
  try {
    console.log('In Fetch Req');
    const response = await makeRequest(
      DATA_ACTIONS_END_POINT.CHATS_FETCH,
      METHODS.GET,
      null,
      {
        'X-CSRF-Token': CSRF,
      }
    );
    if (!response) {
      throw new Error(`Something wen't wrong!`);
    }
    return response.data;
  } catch (error) {
    console.error(`getQuestion > ${error.toString()}`);
    throw error;
  }
};

export const createUserChat = async (chatName) => {
  try {
    console.log('In Chat Req');
    const response = await makeRequest(
      DATA_ACTIONS_END_POINT.ADD_CHATS,
      METHODS.POST,
      { name: chatName },
      {}
    );
    if (!response) {
      throw new Error(`Something wen't wrong!`);
    }
    return response.data;
  } catch (error) {
    console.error(`createChat > ${error.toString()}`);
    throw error;
  }
};

export const fetchMyFiles = async (CSRF) => {
  try {
    const response = await makeRequest(
      DATA_ACTIONS_END_POINT.FILES,
      METHODS.GET,
      null,
      {
        'X-CSRF-Token': CSRF,
      },
      null
    );
    if (!response) {
      throw new Error(`Something went wrong!`);
    }
    return response.data;
  } catch (error) {
    console.error(`fetchMyFiles > ${error.toString()}`);
    throw error;
  }
};

export const uploadFile = async (payload, CSRf) => {
  try {
    const token = localStorage.getItem('token');
    const response = await makeRequest(
      DATA_ACTIONS_END_POINT.UPLOAD_FILE,
      METHODS.POST,
      payload,
      {
        Authorization: `Bearer ${token}`,
        'X-CSRF-Token': CSRf,
        'Content-Type': 'multipart/form-data',
      }
    );
    if (!response) {
      throw new Error(`Something went wrong!`);
    }
    return response.data;
  } catch (error) {
    console.error(`Upload File > ${error.toString()}`);
    throw error;
  }
};
