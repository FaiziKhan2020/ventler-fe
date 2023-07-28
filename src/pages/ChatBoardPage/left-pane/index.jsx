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
import CreateIcon from '@mui/icons-material/CreateRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const propTypes = {
  width: number,
};

const LeftPane = ({ width = 240, onUpdateActive }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatName, setChatName] = useState('');
  const [chatsOpen, setChatsOpen] = useState(true);
  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.clear();
    window.location.href = '/auth'
  }

  return (
    <Drawer
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          overflow: "hidden",
          boxSizing: "border-box",
          backgroundColor: "#F3F3F3",
          padding: "1.5rem .5rem 0",
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <Box
        sx={{
          color: "rgba(0, 0, 0, 0.50)",
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 1,
          marginLeft: 1.5,
        }}
      >
        Kiyoung SaaS
      </Box>
      <Box display="flex" alignItems="flex-start" width="100%" flexGrow={1}>
        <List
          sx={{
            width: "100%",
            ".MuiListItemIcon-root": {
              minWidth: "36px",
            },
          }}
        >
          <Divider
            sx={{
              marginBottom: 0.5,
            }}
          />
          <ListItem onClick={() => onUpdateActive(1)} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary={"Create Content"} />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => onUpdateActive(2)} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => onUpdateActive(3)} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Prompts"} />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={logout} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

LeftPane.propTypes = propTypes;

export default LeftPane;
