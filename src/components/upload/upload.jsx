import { IconButton } from '@mui/material';
import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import uploadImage from '../../static/images/document-upload.png';

const Upload = ({ text, acceptExtensions }) => {
  const handleClickDrop = () => {
    document.getElementById('inputUpload').click();
  };
  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };
  const getUploadParams = ({ meta }) => {
    return { url: 'https://httpbin.org/post' };
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <div className='flex flex-col items-center justify-center w-auto p-2 flex-grow rounded-[4px] mb-[10px] transition-colors duration-200 ease-in-out'>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept={acceptExtensions}
        SubmitButtonComponent={() => (
          <input type='file' style={{ display: 'none' }} />
        )}
        InputComponent={() => (
          <div className='flex flex-col'>
            <IconButton
              onClick={handleClickDrop}
              className='text-[#808080] text-5xl mb-4'
            >
              <img className='w-28 h-28' src={uploadImage} alt='upload' />
              <input style={{ display: 'none' }} id='inputUpload' type='file' />
            </IconButton>
            <p className='text-center text-[#E4E4E4]'>{text}</p>
          </div>
        )}
      />
    </div>
  );
};

export default Upload;
