import React from 'react';
import { any, bool, func, node, string } from 'prop-types';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const propTypes = {
  disableTouchRipple: bool,
  selected: bool,
  text: node,
  onClick: func,
  value: any,
  iconSrc: string,
  actions: node,
};

const ListItemCard = ({
  disableTouchRipple,
  selected,
  text,
  onClick,
  value,
  iconSrc,
  actions,
  ...rest
}) => {
  return (
    <ListItemButton
      disableTouchRipple={disableTouchRipple}
      sx={{
        justifyContent: 'flex-start',
        gap: 1.25,
        borderRadius: 1,
        px: 1.5,
        ...(selected && {
          boxShadow: '0px 9.13868236541748px 18.27736473083496px 0px #0000000A',
          backgroundColor: '#fff !important',
          outline: '1px solid #0000000F',
        }),
      }}
      onClick={() => onClick(value ?? text)}
      {...rest}
    >
      <ListItemIcon
        sx={{
          minWidth: 'auto',
          '& > img': {
            width: 20,
            height: 20,
          },
        }}
      >
        <img src={iconSrc} alt={iconSrc} />
      </ListItemIcon>
      <ListItemText
        primary={
          <div className='flex justify-between items-center'>
            <div className='line-clamp-1 flex-grow'>{text}</div>
            {actions && <div className='flex'>{actions}</div>}
          </div>
        }
      />
    </ListItemButton>
  );
};

ListItemCard.propTypes = propTypes;

export default ListItemCard;
