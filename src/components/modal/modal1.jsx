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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { getData, fileUpload } from '../../app/data/data.actions';
import { connect } from 'react-redux';
import * as FormData from 'form-data';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
    width: '60rem',
    height: '50rem',
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

const CustomizedDialogs = ({
  isOpen,
  onBack,
  onForward,
  getDetails,
  fileUpload,
}) => {
  const [check, setCheck] = React.useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setCheck((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  console.log(check);

  const deleteFile = (index) => {
    setCheck((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // let formData = new FormData();
    // formData.append("file", check[0]);
    // console.log(">> formData >> ", formData);
    // fileUpload(formData);

    // getDetails();
    if (isOpen === 1) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  });
  const handleClose = () => {
    // setModel(model - 1);
    setOpen(false);
  };

  const selector = useSelector((state) => state.data);
  console.log(selector);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        // onClick={onBack}
        aria-labelledby='customized-dialog-title'
        open={open}
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
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Box sx={{ mr: 1 }}>
              <Icon>
                <PlagiarismOutlinedIcon />
              </Icon>
            </Box>
            Extract data from a contract
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
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
            Upload Files
          </Typography>
          <FormControl sx={{ mb: '2rem' }} fullWidth>
            <InputLabel id='demo-simple-select-label'>
              select previously uploaded files
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={age}
              placeholder='select previously uploaded files'
              label='select previously uploaded files'
              onChange={handleChange}
            >
              <MenuItem value={10}>File1</MenuItem>
              <MenuItem value={20}>File2</MenuItem>
              <MenuItem value={30}>File3</MenuItem>
            </Select>
          </FormControl>

          {/* <Upload /> */}
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
                {check.map((row, index) => {
                  const fileExtension = row.name.split('.').pop();

                  return (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>
                        <SmallTextButton
                          sx={{
                            background:
                              fileExtension === 'pdf' ? '#e94b4bf2' : '#3F51B5',
                            minWidth: '45px',
                            padding: '5px',
                          }}
                          variant='contained'
                        >
                          {fileExtension}
                        </SmallTextButton>
                      </TableCell>
                      <TableCell align='right'>{row.size}</TableCell>
                      <TableCell align='right'>
                        <IconButton aria-label='delete'>
                          <DeleteIcon onClick={() => deleteFile(index)} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
            onClose={handleClose}
            onClick={onBack}
          >
            Back
          </SmallTextButton>
          <SmallTextButton variant='contained' onClick={onForward}>
            Next Step
          </SmallTextButton>
          {/* <Question onClick={handleClose} /> */}
        </DialogActions>
        <DialogActions sx={{ justifyContent: 'flex-start' }}></DialogActions>
      </BootstrapDialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => ({
  getDetails: () => {
    dispatch(getData());
  },
  fileUpload: (formdata) => {
    dispatch(fileUpload(formdata));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedDialogs);
