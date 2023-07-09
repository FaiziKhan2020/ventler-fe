import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { func } from 'prop-types';
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Popper,
  TextField,
} from '@mui/material';
import Upload from '../../../components/upload/upload';
import GradientBorderBox from '../../../components/gradient-border-box';
import Dynamic from '../../../components/dynamic-modal/dynamic-modal';
import logoImage from '../../../static/images/koldine-logo.png';
import fileIcon from '../../../static/icons/file-icon.svg';
import ChatContainer from '../../../containers/chat.container';
import { selectFlows, selectMessages } from '../../../app/data/data.selectors';
import { setMessages } from '../../../app/data/data.actions';
import CloseIcon from '@mui/icons-material/Close';

const propTypes = {
  onOpenReference: func,
};

const Chat = ({ onOpenReference }) => {
  const [moreFlowsOpen, setMoreFlowsOpen] = useState(false);
  const [key, setKey] = useState('');
  const [object, setObject] = useState(null);
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const moreFlowsButtonRef = useRef(null);

  const flows = useSelector(selectFlows);
  const messages = useSelector(selectMessages);

  const dispatch = useDispatch();

  const flowsKeys = flows ? Object.keys(flows) : null;
  const firstFlows = flows ? flowsKeys.slice(0, 5) : null;
  const restFlows = flows ? flowsKeys.slice(4) : null;

  const handleKey = (id) => {
    const extractValue = flows[id];
    setObject(extractValue);
    setKey(id);
    forward();
  };

  const forward = () => {
    setStep(step + 1);
  };

  const backward = () => {
    setObject(null);
    setStep(step - 1);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
      };
      dispatch(setMessages([...messages, newMessage]));
      setInputValue('');
    }
  };
  const handleTextFieldKeyUp = ({ key, shiftKey }) => {
    if (!shiftKey && key === 'Enter' && inputValue.trim()) {
      handleSendMessage();
    }
  };

  return (
    <main className='ml-0 h-full p-6 flex-grow'>
      <div className='relative w-4/5 flex justify-start bottom-0 m-auto flex-col h-full'>
        <div className='relative no-scrollbar overflow-scroll flex-grow overflow-x-hidden flex flex-col'>
          <div className='mb-3 sticky'>
            <img
              className='m-auto object-contain h-16 w-44'
              src={logoImage}
              alt='logo'
            />
          </div>
          <div className='relative inline-block max-w-[65%] bg-[#F3F3F3] leading-6 px-5 py-3 rounded-xl border border-solid border-[#D9D9D966]'>
            Select a file from you library, upload a new file, or simply type a
            message to get started. You can also select a desired flow first and
            start from there.
          </div>
          {messages.length ? (
            <ChatContainer
              messages={messages}
              onOpenReference={onOpenReference}
            />
          ) : (
            <Upload
              acceptExtensions='image/*,audio/*,video/*'
              text={
                <>
                  Upload a new file in the right
                  <br />
                  panel or <b>drag and drop it here</b>
                </>
              }
            />
          )}
        </div>
        <Box
          width='100%'
          sx={{
            '& fieldset': { border: 'none' },
            '& textarea': {
              flexBasis: '100vw',
            },
            img: {
              width: '16px',
              height: '16px',
            },
          }}
        >
          <GradientBorderBox
            borderWidth={1.5}
            borderRadius={5}
            imageStr='linear-gradient(332.95deg, rgba(0, 0, 0, 0.3) 16.9%, rgba(0, 0, 0, 0.12) 41.3%)'
          >
            <TextField
              fullWidth
              multiline
              placeholder='Type a message, press / to search files, or choose a file from your library...'
              value={inputValue}
              onKeyUp={handleTextFieldKeyUp}
              onChange={handleInputChange}
              sx={{
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '5px',
                backgroundColor: '#fff',
                border: 'none',
                '& > .MuiInputBase-root': {
                  flexWrap: 'wrap',
                  gap: 1.5,
                },
              }}
              InputProps={{
                startAdornment: ['File1.png', 'file 2.pdf'].map((item, i) => (
                  <Chip
                    key={i}
                    label={item}
                    variant='outlined'
                    onDelete={() => {}} // todo: add implementation
                    deleteIcon={
                      <CloseIcon className='!text-black !mr-0 !text-lg' />
                    }
                    sx={{
                      borderColor: '#000',
                      padding: '4px 6px',
                      borderRadius: 3,
                    }}
                    icon={<img src={fileIcon} alt='file' />}
                  />
                )),
              }}
            />
          </GradientBorderBox>
        </Box>
        <div className='flex flex-wrap gap-5 w-full mt-[1.15rem]'>
          {firstFlows &&
            firstFlows.map((item, i) => {
              return i < 4 ? (
                <div
                  className='bg-gradient-to-b p-[1.5px] rounded-[20px] flex-grow flex-shrink basis-[15%] from-[#1c8cf57f] to-[#1C8CF5]'
                  key={i}
                >
                  <Button
                    variant='outlined'
                    sx={{
                      background: '#fff',
                      color: '#1C8CF5',
                      boxShadow: 'none',
                      border: 'none',
                      borderRadius: '20px',
                      width: '100%',
                      '&:hover': {
                        color: '#fff',
                        border: 'none',
                      },
                    }}
                    onClick={() => handleKey(item)}
                    color='primary'
                  >
                    {item}
                  </Button>
                </div>
              ) : (
                <div key={i} ref={moreFlowsButtonRef}>
                  <Button
                    variant='outlined'
                    sx={{
                      background: '#fff',
                      color: '#00000080',
                      boxShadow: 'none',
                      border: '1px solid #00000040',
                      borderRadius: '20px',
                      flex: '1 1 15%',
                      '&:hover': {
                        borderColor: '#00000040',
                        color: '#00000080',
                        backgroundColor: '#00000040',
                      },
                    }}
                    onClick={() => setMoreFlowsOpen((prev) => !prev)}
                    aria-describedby='more-flows'
                  >
                    More flows
                  </Button>
                </div>
              );
            })}
          <Popper
            id='more-flows'
            open={moreFlowsOpen}
            anchorEl={moreFlowsButtonRef.current}
            placement='top-start'
            sx={{
              zIndex: 100000,
            }}
          >
            <GradientBorderBox
              className='mb-3'
              borderRadius={14}
              borderWidth={2}
              imageStr='linear-gradient(174.7deg, rgba(28, 140, 245, 0.5) 74.34%, #1C8CF5 95.75%)'
            >
              <div className='rounded-[14px] p-2 flex flex-col min-w-[200px] bg-white text-center gap-1 max-h-[500px] overflow-y-auto text-[#1C8CF5]'>
                {restFlows.map((flow, i) => (
                  <ButtonBase
                    key={i}
                    sx={{
                      paddingBlock: 0.75,
                    }}
                    onClick={() => {
                      setMoreFlowsOpen(false);
                      handleKey(flow);
                    }}
                  >
                    {flow}
                  </ButtonBase>
                ))}
              </div>
            </GradientBorderBox>
          </Popper>
          {object && (
            <Dynamic
              object={object}
              keys={key}
              isOpen={step}
              onBack={backward}
              onForward={forward}
            />
          )}
        </div>
      </div>
    </main>
  );
};

Chat.propTypes = propTypes;

export default Chat;
