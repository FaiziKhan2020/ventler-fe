import { useRef } from 'react';
import { number } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Drawer, Button } from '@mui/material';
import uuid from 'react-uuid';
import FilesFolder from '../../../components/files-folder';
import { addDataToId } from '../../../utils/arrays';
import { selectFileFolders } from '../../../app/data/data.selectors';
import {
  setFileFolders,
  uploadFileAction,
} from '../../../app/data/data.actions';
import newFileIcon from '../../../static/icons/new-file-icon.svg';

const propTypes = {
  width: number,
};

const RightPane = ({ width = 240 }) => {
  const fileUploadRef = useRef(null);

  const dispatch = useDispatch();
  const fileFolders = useSelector(selectFileFolders);

  const uploadRootFile = async (e) => {
    const newFile = e.target.files[0];
    if (!newFile) {
      return;
    }
    const fileName = newFile.name;

    const formData = new FormData();
    formData.append('file', newFile, fileName);
    formData.append('path', fileName); // add to root

    dispatch(uploadFileAction(formData));
    const resultPath = 'public/' + fileName;
    const newFileFolders = addDataToId(fileFolders, fileFolders[2].id, [
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
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          backgroundColor: '#F3F3F3',
          padding: '1.5rem .5rem 1rem',
        },
      }}
      variant='persistent'
      anchor='right'
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
        File Library
      </Box>
      <div className='flex items-center justify-end p-1 min-h-[36px] mt-1'>
        <Button
          variant='outlined'
          sx={{
            background: 'transparent',
            border: 'none',
            justifyContent: 'flex-start',
            boxShadow: 'none',
            width: '100%',
            padding: '8px 16px',
            '&:hover': {
              border: 'none',
              outline: 'none',
            },
            fontSize: 16,
            textTransform: 'initial',
          }}
          color='primary'
          onClick={() => fileUploadRef.current.click()}
          startIcon={
            <img className='w-6 h-6' src={newFileIcon} alt='New File' />
          }
        >
          Upload a file
        </Button>
        <input
          className='hidden'
          ref={fileUploadRef}
          type='file'
          name='my-files'
          accept='.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf'
          onChange={uploadRootFile}
        />
      </div>
      <FilesFolder items={fileFolders} />
    </Drawer>
  );
};

RightPane.propTypes = propTypes;

export default RightPane;
