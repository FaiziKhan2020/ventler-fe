import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCallback, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Settings = () => {
  const [values, setValues] = useState({
    wordpress: "",
    openai: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const rows = [
    createData(
      "My Korean Website",
      "https://koreansite.com",
      "hereAddKey_65464654564"
    ),
    createData(
      "My German Website",
      "https://Germansite.com",
      "hereAddKey_65464654564"
    ),
    createData(
      "My Blogging Website",
      "https://Bloggingsite.com",
      "hereAddKey_65464654564"
    ),
  ];

  return (
    <main className="ml-0 h-full p-6 flex-grow">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Add Credentials
          </Typography>
          <Typography>Wordpress Title</Typography>
          <TextField
            fullWidth
            placeholder="blogging"
            name="article"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>URL</Typography>
          <TextField
            fullWidth
            placeholder="example@web.com"
            name="article"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>Credentials</Typography>
          <TextField
            fullWidth
            placeholder="Wp_4654564646"
            name="article"
            type="text"
          />

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            style={{ float: "right" }}
            onClick={handleClose}
          >
            ADD
          </Button>
        </Box>
      </Modal>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader subheader="Setup Keys & Credentials" title="Settings" />
          <CardContent>
            <Stack spacing={3}>
              <Box>
                <Typography>OpenAI Key</Typography>
                <TextField
                  fullWidth
                  placeholder="OpenAI Secret Key"
                  name="openai"
                  onChange={handleChange}
                  type="text"
                  value={values.openai}
                />
              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained">Update</Button>
          </CardActions>
        </Card>
      </form>

      <Card>
        <CardHeader
          subheader="Configure Wordpress Sites"
          title="Wordpress Sites"
        />
      </Card>

      <Box style={{ float: "right", marginBottom: "10px" }}>
        <Button onClick={handleOpen} variant="contained">
          add
        </Button>
      </Box>

      <Grid container>
        <TableContainer
          component={Paper}
          style={{
            overflow: "scroll",
            maxHeight: "300px",
            overflowX: "hidden",
          }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Website Name</StyledTableCell>
                <StyledTableCell>URL</StyledTableCell>
                <StyledTableCell>Credentials</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.calories}</StyledTableCell>
                  <StyledTableCell>{row.fat}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </main>
  );
};

export default Settings;
