import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import SlidingPane from 'react-sliding-pane';
import DocViewer from '@cyntler/react-doc-viewer';
import LeftPane from './left-pane';
import RightPane from './right-pane';
import Chat from './chat';
import { selectCSRF } from '../../app/auth/auth.selectors';
import { csrf } from '../../app/auth/auth.action';
import {
  fetchChats,
  fetchMyFilesAction,
  fetchingFlows,
} from '../../app/data/data.actions';
import 'react-sliding-pane/dist/react-sliding-pane.css';

const ChatBoardPage = () => {


  return (
    <Box className='h-screen flex'>
      <LeftPane />
    </Box>
  );
};

export default ChatBoardPage;
