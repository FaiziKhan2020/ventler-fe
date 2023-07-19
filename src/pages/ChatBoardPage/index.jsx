import React, { useState } from 'react'
import Settings from './settings';
import LeftPane from './left-pane';
import Panel from './panel'
import { Box } from '@mui/material';

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
