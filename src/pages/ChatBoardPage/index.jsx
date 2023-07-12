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
import Panel from './panel';
import { Routes, Route, BrowserRouter, } from 'react-router-dom';
import Settings from './settings';

const ChatBoardPage = () => {
  const [activePage, setActivePage] = useState(1);
  const allPages = [Panel,Settings];

  function onPageChanged(idx){
    setActivePage(idx)
  }

  return (
    <Box className='h-screen flex'>
      <LeftPane onUpdateActive={onPageChanged} />
      {
        activePage && activePage === 1 && <Panel/>
      }
      {
        activePage && activePage === 2 && <Settings/>
      }
    </Box>
  );
};

export default ChatBoardPage;
