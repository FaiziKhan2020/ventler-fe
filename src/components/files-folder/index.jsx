import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FolderCard from '../folder-card';
import FileCard from '../file-card';
import { setSelectedFiles } from '../../app/data/data.actions';
import { selectSelectedFiles } from '../../app/data/data.selectors';
import fileIcon from '../../static/icons/file-icon.svg';
import { Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TreeItem, TreeView } from '@mui/lab';

const FilesFolder = ({ items }) => {
  const selectedFiles = useSelector(selectSelectedFiles);
  const dispatch = useDispatch();

  const handleToggleSelectFile = (nodeId) => {
    const isNodePresent = selectedFiles.find((id) => id === nodeId);
    let newFiles = [];
    if (isNodePresent) {
      newFiles = selectedFiles.filter((id) => id !== nodeId);
    } else {
      newFiles = [...selectedFiles, nodeId];
    }
    dispatch(setSelectedFiles(newFiles));
  };

  const renderTree = (node) => {
    const isFolder = Array.isArray(node.children);
    const isSelected = selectedFiles.find((id) => id === node.id);

    const renderLabel = () => {
      return isFolder ? (
        <FolderCard
          showActions={!node.isPublic}
          nodeId={node.id}
          title={node.title}
          path={node.path}
        />
      ) : (
        <FileCard
          onSelect={handleToggleSelectFile}
          selected={isSelected}
          file={{ ...node.file, id: node.id }}
        />
      );
    };
    const renderIcon = () => {
      return isFolder ? null : (
        <Box
          sx={{
            minWidth: 'auto',
            '& > img': {
              width: 24,
              height: 24,
            },
          }}
        >
          <img src={fileIcon} alt='file' />
        </Box>
      );
    };

    const isValidItem = node.file?.name || node.children;

    return isValidItem ? (
      <TreeItem
        key={node.id}
        nodeId={node.id}
        label={renderLabel()}
        icon={renderIcon()}
        sx={{
          '.MuiTreeItem-content': {
            paddingLeft: '16px',
            paddingRight: 0,
            minHeight: 40,
          },
          '& .MuiTreeItem-content.Mui-selected': {
            boxShadow:
              '0px 9.13868236541748px 18.27736473083496px 0px #0000000A',
            backgroundColor: '#fff !important',
            outline: '1px solid #0000000F',
            borderRadius: 1,
          },
        }}
      >
        {isFolder ? node.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    ) : null;
  };

  return (
    <TreeView
      defaultCollapseIcon={<KeyboardArrowDownIcon />}
      defaultExpandIcon={
        <KeyboardArrowDownIcon
          sx={{
            transform: 'rotate(-90deg)',
          }}
        />
      }
      defaultEndIcon={<KeyboardArrowDownIcon />}
      defaultExpanded={['public']}
      disableSelection
      selected={selectedFiles}
      sx={{
        paddingRight: 1.5,
        '& > li:not(:last-child)::after': {
          content: '""',
          display: 'block',
          borderBlock: '1px solid #0000000F',
          marginBlock: '16px 8px',
        },
      }}
    >
      {items.map((item) => renderTree(item))}
    </TreeView>
  );
};

export default FilesFolder;
