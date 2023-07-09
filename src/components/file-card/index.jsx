import React from 'react';
import { Box, Checkbox, Typography } from '@mui/material';

const FileCard = ({ file, selected, onSelect = () => {} }) => {
  const handleSelect = () => {
    onSelect(file.id);
  };

  return (
    <Box
      sx={{
        padding: 1,
        pl: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onClick={handleSelect}
    >
      <Typography className='line-clamp-2 text-ellipsis'>
        {file.name}
      </Typography>
      <Checkbox
        sx={{
          '& .MuiSvgIcon-root': { fontSize: 17 },
        }}
        size='small'
        checked={!!selected}
        onChange={handleSelect}
      />
    </Box>
  );
};

export default FileCard;
