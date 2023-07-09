import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import LeftPane from '../pages/ChatBoardPage/left-pane';
import RightPane from '../pages/ChatBoardPage/right-pane';

const NewPublicFilesText = styled('sup')(() => ({
  color: '#1C8CF5',
  fontSize: 10,
  fontWeight: 500,
}));
export const publicFilesTitle = (
  <>
    Public Files <NewPublicFilesText>NEW</NewPublicFilesText>
  </>
);

const ChatBoard = () => {
  return (
    <Box className='h-[100vh] flex'>
      <LeftPane />

      <RightPane />
    </Box>
  );
};

export default ChatBoard;
