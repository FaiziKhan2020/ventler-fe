import { useState } from 'react';
import { number } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import chatIcon from '../../../static/icons/chat-icon.svg';
import newFolderIcon from '../../../static/icons/new-folder-icon.svg';
import binIcon from '../../../static/icons/bin-icon.svg';
import editIcon from '../../../static/icons/edit-icon.svg';
import shareIcon from '../../../static/icons/share-icon.svg';
import { selectChats } from '../../../app/data/data.selectors';
import { createChat, setMessages } from '../../../app/data/data.actions';
import ListItemCard from '../../../components/list-item-card';
import LogoutIcon from '@mui/icons-material/Logout';

const propTypes = {
  width: number,
};

const LeftPane = ({ width = 240 }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatName, setChatName] = useState('');
  const [chatsOpen, setChatsOpen] = useState(true);
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const chats = useSelector(selectChats);

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    dispatch(setMessages([...chats[chatId]]));
  };
  const handleChatsToggle = () => {
    setChatsOpen((prev) => !prev);
  };
  const newChat = () => {
    if (chatName && chatName !== '') {
      dispatch(createChat(chatName));
      setChatName('');
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/auth'
  }

  return (
    <Drawer
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          overflow: 'hidden',
          boxSizing: 'border-box',
          backgroundColor: '#F3F3F3',
          padding: '1.5rem .5rem 0',
        },
      }}
      variant='persistent'
      anchor='left'
      open={true}
    >
      <Box
        sx={{
          color: 'rgba(0, 0, 0, 0.50)',
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 1,
          marginLeft: 1.5,
        }}
      >
        Kiyoung SaaS
      </Box>
      <Box display='flex' alignItems='flex-end' width='100%' flexGrow={1}>
        <List
          sx={{
            width: '100%',
            '.MuiListItemIcon-root': {
              minWidth: '36px',
            },
          }}
        >
          <Divider
            sx={{
              marginBottom: 0.5,
            }}
          />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={logout} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

LeftPane.propTypes = propTypes;

export default LeftPane;
