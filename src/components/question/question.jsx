import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Icon, Box } from "@mui/material";
import PlagiarismOutlinedIcon from "@mui/icons-material/PlagiarismOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "60rem",
    height: "40rem",
    maxWidth: "none",
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
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
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

export default function CustomizedDialogs({ isOpen, onForward, reset }) {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [textFields, setTextFields] = React.useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);

  const handleAddAnother = () => {
    const newTextField = { id: textFields.length + 1 };
    setTextFields((prevFields) => [...prevFields, newTextField]);
  };

  const handleDelete = (id) => {
    setTextFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  React.useEffect(() => {
    if (isOpen === 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      {/* <SmallTextButton variant="contained" onClick={handleClickOpen}>
        Open dialog
      </SmallTextButton> */}
      {/* <SmallTextButton variant="contained" autoFocus onClick={handleClose}>
        <Question />
      </SmallTextButton> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          sx={{
            background: "#e1e1e1",
            fontSize: "14px",
            paddingBottom: "10px",
          }}
          id="customized-dialog-title"
          onClose={handleClose}
          onClick={reset}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box sx={{ mr: 1 }}>
              <Icon>
                <PlagiarismOutlinedIcon />
              </Icon>
            </Box>
            Review Document
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography
            variant="p"
            component="h2"
            sx={{
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              mb: "10px",
            }}
          >
            Questions to answers from the documents
          </Typography>

          <FormControl sx={{ mb: "1rem" }} fullWidth>
            <InputLabel id="demo-simple-select-label">
              select previously asked questions
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              placeholder="select previously uploaded files"
              label="select previously uploaded files"
              onChange={handleChange}
            >
              <MenuItem value={10}>File1</MenuItem>
              <MenuItem value={20}>File2</MenuItem>
              <MenuItem value={30}>File3</MenuItem>
            </Select>
          </FormControl>
          {textFields.map((field) => (
            <Box key={field.id} sx={{ display: "flex", mt: "20px" }}>
              <TextField
                sx={{ width: "100%" }}
                id={`outlined-basic-${field.id}`}
                placeholder="Ask a question"
                variant="outlined"
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(field.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Box sx={{ mt: "20px" }}>
            <SmallTextButton
              variant="text"
              startIcon={<AddIcon color="blue" />}
              autoFocus
              onClick={handleAddAnother}
            >
              Add Another question
            </SmallTextButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <SmallTextButton variant="contained" autoFocus onClick={reset}>
            Get your answers
          </SmallTextButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
