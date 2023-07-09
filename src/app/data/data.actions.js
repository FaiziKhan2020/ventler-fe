import { DATA_ACTIONS } from './actions.constant';
import {
  GetDataService,
  GetQuestionService,
  FileUploadService,
  fetchingFlowsService,
  postDataService,
  fetchUserChats,
  createUserChat,
  fetchMyFiles,
  uploadFile,
} from './data.service';

export const setSelectedFiles = (newFiles) => ({
  type: DATA_ACTIONS.SET_SELECTED_FILES,
  payload: newFiles,
});
export const setFileFolders = (fileFolders) => ({
  type: DATA_ACTIONS.SET_FILE_FOLDERS,
  payload: fileFolders,
});
export const setMessages = (messages) => ({
  type: DATA_ACTIONS.SET_MESSAGES,
  payload: messages,
});

export const getData = (
  description,
  title,
  industry,
  constraints,
  timeFrame
) => {
  return async (dispatch) => {
    dispatch({ type: DATA_ACTIONS.FETCHING_DATA });
    try {
      const payload = { title, description, industry, constraints, timeFrame };
      const data = await GetDataService(payload);
      return dispatch({
        type: DATA_ACTIONS.FETCHED_DATA,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      return dispatch({
        type: DATA_ACTIONS.FETCHING_DATA_FAILED,
        payload: error.message,
      });
    }
  };
};

// fileUpload
export const fileUpload = (formdata) => {
  return async (dispatch) => {
    dispatch({ type: DATA_ACTIONS.FILE_UPLOADING });
    try {
      const data = await FileUploadService();
      return dispatch({
        type: DATA_ACTIONS.FILE_UPLOADED,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      return dispatch({
        type: DATA_ACTIONS.FILE_UPLOADING_FAILED,
        payload: error.message,
      });
    }
  };
};

export const getQuestion = () => {
  return async (dispatch) => {
    dispatch({ type: DATA_ACTIONS.FETCHING_QUESTION });
    try {
      const data = await GetQuestionService();
      return dispatch({
        type: DATA_ACTIONS.FETCHED_QUESTION,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      return dispatch({
        type: DATA_ACTIONS.FETCHING_QUESTION_FAILED,
        payload: error.message,
      });
    }
  };
};

// Fetching Flows:
export const fetchingFlows = (CSRF_Token) => {
  return async (dispatch) => {
    dispatch({ type: DATA_ACTIONS.FETCHING_FLOWS });
    try {
      console.log('Flot toke: ', CSRF_Token);
      const data = await fetchingFlowsService(CSRF_Token);
      return dispatch({
        type: DATA_ACTIONS.FETCHED_FLOWS,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      return dispatch({
        type: DATA_ACTIONS.FETCHING_FLOWS_FAILED,
        payload: error.message,
      });
    }
  };
};

// new Chats
export const newChats = () => {
  return async (dispatch) => {
    dispatch({ type: DATA_ACTIONS.FETCHING_FLOWS });
    try {
      const data = await fetchingFlowsService();
      return dispatch({
        type: DATA_ACTIONS.FETCHED_FLOWS,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      return dispatch({
        type: DATA_ACTIONS.FETCHING_FLOWS_FAILED,
        payload: error.message,
      });
    }
  };
};

// run api
export const postData = (inputData, preferences, CSRf) => {
  return async (dispatch) => {
    dispatch({ type: DATA_ACTIONS.POSTING_DATA });
    try {
      console.log(inputData);
      const data = await postDataService(inputData, CSRf);
      return dispatch({
        type: DATA_ACTIONS.POSTED_DATA,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      return dispatch({
        type: DATA_ACTIONS.POSTING_DATA_FAILED,
        payload: error.message,
      });
    }
  };
};

export const fetchChats = () => {
  return async (dispatch) => {
    dispatch({ type: DATA_ACTIONS.FETCHING_CHATS });
    try {
      const data = await fetchUserChats();
      dispatch({ type: DATA_ACTIONS.FETCHED_CHATS, payload: data });
    } catch (err) {
      console.log('Error: ', err);
    }
  };
};

export const createChat = (chatName) => {
  return async (dispatch) => {
    dispatch({ type: DATA_ACTIONS.CREATING_CHAT });
    try {
      await createUserChat(chatName);
      dispatch({ type: DATA_ACTIONS.CHAT_CREATED });
      // refetch chat
      dispatch({ type: DATA_ACTIONS.FETCHING_CHATS });
      const chatsData = await fetchUserChats();
      dispatch({ type: DATA_ACTIONS.FETCHED_CHATS, payload: chatsData });
    } catch (err) {
      console.log('Error: ', err);
    }
  };
};

export const fetchMyFilesAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: DATA_ACTIONS.FETCHING_FILES });
    try {
      const CSRF = getState().auth.CSRF;
      const data = await fetchMyFiles(CSRF);
      dispatch({ type: DATA_ACTIONS.FETCHED_FILES, payload: data });
    } catch (error) {
      dispatch({
        type: DATA_ACTIONS.FETCHING_FILES_FAILED,
        payload: error.toString(),
      });
      console.log('Error: ', error);
    }
  };
};

// upload file
export const uploadFileAction = (payload) => {
  return async (dispatch, getState) => {
    dispatch({ type: DATA_ACTIONS.POSTING_FILE });
    try {
      const CSRF = getState().auth.CSRF;
      const data = await uploadFile(payload, CSRF);

      dispatch({
        type: DATA_ACTIONS.POSTED_FILE,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      return dispatch({
        type: DATA_ACTIONS.POSTING_FILE_FAILED,
        payload: error.message,
      });
    }
  };
};
