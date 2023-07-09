import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  CreateNewFolder as CreateNewFolderIcon,
  NoteAdd as NoteAddIcon,
} from '@material-ui/icons';
import { setFileFolders, uploadFileAction } from '../../app/data/data.actions';
import { addDataToId } from '../../utils/arrays';
import { selectFileFolders } from '../../app/data/data.selectors';
import { bool, func, node, string } from 'prop-types';
import uuid from 'react-uuid';

const MenuItemStyled = styled(MenuItem)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
}));

const propTypes = {
  title: node,
  onAddClick: func,
  nodeId: string,
  showActions: bool,
  path: string,
};

const FolderCard = ({
  title,
  onAddClick = () => {},
  nodeId,
  showActions,
  path,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openFolderDialog, setOpenFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const fileInputRef = useRef(null);
  const addIconRef = useRef(null);

  const dispatch = useDispatch();
  const fileFolders = useSelector(selectFileFolders);

  const handleAddButtonClick = (e) => {
    e.stopPropagation();
    setOpenMenu(true);
    onAddClick();
  };
  const handleMenuClose = (e) => {
    e.stopPropagation();
    setOpenMenu(false);
  };
  const handleDialogClose = () => {
    setOpenFolderDialog(false);
  };

  const handleAddFileClick = (e) => {
    fileInputRef.current.click();
    handleMenuClose(e);
  };
  const handleAddFolderDialogOpen = (e) => {
    setOpenFolderDialog(true);
    handleMenuClose(e);
  };

  const createFolder = () => {
    const resultPath = path + '/' + newFolderName;
    const newFileFolders = addDataToId(fileFolders, nodeId, [
      {
        id: uuid(),
        title: newFolderName,
        path: resultPath,
        children: [],
      },
    ]);
    dispatch(setFileFolders(newFileFolders));

    setNewFolderName('');
    handleDialogClose();
  };

  const addFile = async (e) => {
    const newFile = e.target.files[0];
    if (!newFile) {
      return;
    }
    const fileName = newFile.name;
    const resultPath = path + '/' + fileName;
    console.log(resultPath, 'resultPath');

    const formData = new FormData();
    formData.append('file', newFile, fileName);
    formData.append('path', resultPath);

    dispatch(uploadFileAction(formData));

    const newFileFolders = addDataToId(fileFolders, nodeId, [
      {
        id: uuid(),
        path: resultPath,
        file: {
          name: fileName,
        },
      },
    ]);

    dispatch(setFileFolders(newFileFolders));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '& + input': {
            display: 'none',
          },
          ...(showActions && {
            pointerEvents: 'none',
            cursor: 'default !important',
          }), // ! disable non public folders for now
        }}
      >
        <Typography color='#00000080'>{title}</Typography>
        {showActions && (
          <>
            <IconButton ref={addIconRef} onClick={handleAddButtonClick}>
              <AddIcon htmlColor='#7A7A7A' />
            </IconButton>
            <Menu
              id={`${title}-id`}
              anchorEl={addIconRef.current}
              open={openMenu}
              onClose={handleMenuClose}
            >
              <MenuItemStyled onClick={handleAddFileClick}>
                <NoteAddIcon />
                <Typography>Add File</Typography>
              </MenuItemStyled>
              <MenuItemStyled onClick={handleAddFolderDialogOpen}>
                <CreateNewFolderIcon />
                <Typography>Add Folder</Typography>
              </MenuItemStyled>
            </Menu>
          </>
        )}
      </Box>
      <Dialog open={openFolderDialog} onClose={handleDialogClose}>
        <DialogTitle>Create Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>Give a name for your new folder</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='folder-name'
            label='Folder Name'
            type='text'
            fullWidth
            variant='standard'
            value={newFolderName}
            onKeyDown={(e) => {
              const { key } = e;
              if (key === 'Enter') {
                createFolder();
                e.stopPropagation();
              }
            }}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={createFolder}>Create</Button>
        </DialogActions>
      </Dialog>
      <input
        onChange={addFile}
        ref={fileInputRef}
        type='file'
        name={`${nodeId}-files`}
        accept='.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf'
      />
    </>
  );
};

FolderCard.propTypes = propTypes;

export default FolderCard;
