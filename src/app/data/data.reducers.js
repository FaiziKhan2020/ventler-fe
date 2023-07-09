import uuid from 'react-uuid';
import { publicFilesTitle } from '../../containers/dashboard.container';
import { mapMyFiles } from '../../utils/arrays';
import { DATA_ACTIONS } from './actions.constant';

const INITIAL_STATE = {
  loading: false,
  fileName: '',
  size: '',
  error: '',
  success: false,
  flows: {},
  chats: [],
  selectedFiles: [],
  fileFolders: [
    {
      title: 'My Files',
      id: uuid(),
      path: 'my',
      isPublic: false,
      children: [],
    },
    {
      title: 'Team Files (shared)',
      id: uuid(),
      path: 'team',
      isPublic: false,
      children: [],
    },
    {
      title: publicFilesTitle,
      id: uuid(),
      path: 'public',
      isPublic: true,
      children: [],
    },
  ],
  messages: [],
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_ACTIONS.CREATING_PROBLEM:
      return { ...state, loading: true, success: false, error: '' };
    case DATA_ACTIONS.FETCHING_QUESTION:
      return { ...state, loading: true, success: false, error: '' };
    case DATA_ACTIONS.FETCHING_FLOWS:
      return { ...state, loading: true, success: false, error: '' };
    case DATA_ACTIONS.FETCHED_FLOWS:
      return { ...state, flows: action.payload };
    case DATA_ACTIONS.FETCHING_FLOWS_FAILED:
      return { ...state, error: action.payload };
    case DATA_ACTIONS.SET_SELECTED_FILES:
      return { ...state, selectedFiles: action.payload };
    case DATA_ACTIONS.SET_FILE_FOLDERS:
      return { ...state, fileFolders: action.payload };
    case DATA_ACTIONS.FETCHING_CHATS:
      return { ...state, loading: true, success: false, error: '' };
    case DATA_ACTIONS.FETCHED_CHATS:
      return { ...state, chats: action.payload };
    case DATA_ACTIONS.FETCHING_CHATS_FAILED:
      return { ...state, error: action.payload };
    case DATA_ACTIONS.CREATING_CHAT:
      return { ...state, loading: true, success: false, error: '' };
    case DATA_ACTIONS.CHAT_CREATED:
      return { ...state };
    case DATA_ACTIONS.CREATING_CHAT_FAILED:
      return { ...state, error: action.payload };
    case DATA_ACTIONS.FETCHING_FILES:
      return { ...state, error: '', loading: true };
    case DATA_ACTIONS.FETCHING_FILES_FAILED:
      return { ...state, error: action.payload, loading: false };
    case DATA_ACTIONS.FETCHED_FILES:
      return {
        ...state,
        loading: false,
        error: '',
        fileFolders: state.fileFolders.with(2, {
          id: uuid(),
          path: 'public',
          isPublic: true,
          title: publicFilesTitle,
          children: mapMyFiles(action.payload),
        }),
      };
    case DATA_ACTIONS.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case DATA_ACTIONS.POSTING_FILE:
      return {
        ...state,
        loading: true,
      };
    case DATA_ACTIONS.POSTING_FILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DATA_ACTIONS.POSTED_FILE:
      return {
        ...state,
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};

export default dataReducer;
