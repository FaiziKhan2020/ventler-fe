import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Icon, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDropzone } from 'react-dropzone';
import { getData, fileUpload } from '../../app/data/data.actions';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { postData } from '../../app/data/data.actions';
import { csrf } from '../../app/auth/auth.action';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
    width: '60rem',
    maxWidth: 'none',
  },
}));

const SmallTextButton = styled(Button)`
  text-transform: none;
`;

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    padding: 1,
    border: ` 1px solid gray`,
    borderRadius: 1,
    marginBottom: '10px',
    textAlign: 'center',
    transition: 'background-color 0.2s ease-in-out',
  },
  uploadIcon: {
    color: 'gray',
    fontSize: '3rem',
    marginBottom: 1,
    textAlign: 'center',
  },
  uploadMessage: {
    color: 'gray',
    textAlign: 'center',
  },
};

const CustomizedDialogs = ({ object, onBack, keys, postData, CSRF_Token }) => {
  const [text, setText] = React.useState('');
  const [dynamicData, setDynamicData] = React.useState({});
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [, setOpen] = React.useState(false);
  console.log(object, keys, 'asdasd');
  const { getInputProps, getRootProps } = useDropzone({
    accept: '.doc,.docx,.pdf',
    onDrop: (acceptedFiles) => {
      setUploadedFile(acceptedFiles[0]);
    },
  });

  React.useEffect(() => {
    //Initialize dynamic data as per the selected flow structure
    if (object) {
      const inputFields = Object.keys(object);
      let dataObject = {};
      inputFields.forEach((field) => {
        dataObject[field] = '';
      });
      setDynamicData(dataObject);
    }
  }, [object]);

  const handleClose = () => {
    onBack();
    setOpen(false);
  };

  function handleDynamicDataChanges(key, value) {
    const newObject = { ...dynamicData };
    newObject[key] = value;
    setDynamicData(newObject);
  }

  const sendData = () => {
    const formData = new FormData();
    formData.append('file', uploadedFile ? uploadedFile : null);
    formData.append('text', text);
    formData.append('preferences', {});
    formData.append('flow_type', keys);
    formData.append('vector_store', '');
    formData.append('save_vectordb', false);
    Object.keys(dynamicData).forEach((key) => {
      formData.append(
        key === 'extract_schema_id' ? 'extract_id' : key,
        dynamicData[key]
      );
    });
    postData(formData, {}, CSRF_Token);
    onBack();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={object !== null}
      >
        <BootstrapDialogTitle
          sx={{
            background: '#e1e1e1',
            fontSize: '14px',
            paddingBottom: '10px',
          }}
          id='customized-dialog-title'
          onClose={handleClose}
          onClick={onBack}
        >
          <Typography
            variant='body1'
            component='div'
            sx={{
              display: 'flex',
              alignItems: 'center',
              textTransform: 'capitalize',
            }}
          >
            <Box sx={{ mr: 1 }}>
              <Icon>
                <PlagiarismOutlinedIcon />
              </Icon>
            </Box>
            {keys.charAt(0).toUpperCase() + keys.slice(1)}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {object &&
            dynamicData &&
            Object.keys(object).map((key, idx) => {
              let item = object[key];
              console.log('Item in: ', item);

              if (item.type === 'select') {
                return (
                  <>
                    <Typography
                      variant='p'
                      component='h2'
                      key={idx}
                      sx={{
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        mb: '10px',
                      }}
                    >
                      {item.params.label}
                    </Typography>
                    <FormControl sx={{ mb: '2rem' }} fullWidth>
                      <Select
                        key={key}
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={dynamicData[key]}
                        onChange={(event) =>
                          handleDynamicDataChanges(key, event.target.value)
                        }
                      >
                        {item.params.options.map((value, idx) => {
                          return (
                            <MenuItem key={idx} value={value}>
                              {value}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </>
                );
              } else {
                return (
                  <>
                    <Typography
                      variant='p'
                      component='h2'
                      sx={{
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        mb: '10px',
                      }}
                    >
                      {item.params.label}
                    </Typography>
                    <FormControl sx={{ mb: '2rem' }} fullWidth>
                      <TextField
                        id='outlined-basic'
                        label={item.params.label}
                        variant='outlined'
                        value={dynamicData[key]}
                        onChange={(event) =>
                          handleDynamicDataChanges(key, event.target.value)
                        }
                        sx={{
                          height: '48px', // Adjust the desired height here
                        }}
                      />
                    </FormControl>
                  </>
                );
              }
            })}
          <>
            <Typography
              variant='p'
              component='h2'
              sx={{
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                mb: '10px',
              }}
            >
              Input Data
            </Typography>
            <FormControl sx={{ mb: '2rem' }} fullWidth>
              <TextField
                id='outlined-basic'
                placeholder='Enter your data here'
                value={text}
                onChange={(eve) => setText(eve.target.value)}
                variant='outlined'
                sx={{
                  height: '48px', // Adjust the desired height here
                }}
              />
            </FormControl>
          </>
          <div
            style={{
              display: 'flex',
              marginBottom: '25px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                height: '1px',
                width: '48%',
                backgroundColor: '#c1c1c1',
              }}
            ></div>
            <span style={{ lineHeight: '0px' }}>{'  Or  '}</span>
            <div
              style={{
                height: '1px',
                width: '48%',
                backgroundColor: '#c1c1c1',
              }}
            ></div>
          </div>
          <Box sx={styles.root}>
            <section className='container'>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <UploadFileIcon sx={styles.uploadIcon} />

                <p style={styles.uploadMessage}>
                  {' '}
                  <b style={{ color: 'blue' }}>Upload your files, </b> or drag
                  and drop <br></br>
                  .doc,.docx,.pdf are supported
                </p>
              </div>
            </section>
          </Box>

          <TableContainer sx={{ mt: '5px' }} component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '600' }}>File name</TableCell>
                  <TableCell sx={{ fontWeight: '600' }} align='right'>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600' }} align='right'>
                    Size
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: '600' }}
                    align='right'
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploadedFile && (
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      {uploadedFile.name}
                    </TableCell>
                    <TableCell align='right'>
                      <SmallTextButton
                        sx={{
                          background: uploadedFile.name.endsWith('.pdf')
                            ? '#e94b4bf2'
                            : '#3F51B5',
                          minWidth: '45px',
                          padding: '5px',
                        }}
                        variant='contained'
                      >
                        {uploadedFile.name.split('.').pop()}
                      </SmallTextButton>
                    </TableCell>
                    <TableCell align='right'>{uploadedFile.size}</TableCell>
                    <TableCell align='right'>
                      <IconButton aria-label='delete'>
                        <DeleteIcon onClick={() => setUploadedFile(null)} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <SmallTextButton
            variant='text'
            startIcon={<ArrowBackIcon color='blue' />}
            autoFocus
            onClick={handleClose}
          >
            Back
          </SmallTextButton>
          <SmallTextButton variant='contained' onClick={sendData}>
            Done
          </SmallTextButton>
        </DialogActions>
        <DialogActions sx={{ justifyContent: 'flex-start' }}></DialogActions>
      </BootstrapDialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    CSRF_Token: state.auth.CSRF,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getDetails: () => {
    dispatch(getData());
  },
  csrf: () => {
    dispatch(csrf());
  },
  postData: (object1, object2, CSRf) => {
    dispatch(postData(object1, object2, CSRf));
  },
  fileUpload: (formdata) => {
    dispatch(fileUpload(formdata));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedDialogs);
