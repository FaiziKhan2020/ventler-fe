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
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { getBaseApi } from "../../../config/Enviroment";
import CircleLoader from 'react-spinners/PulseLoader'

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

const fetchConfigs = () => {
  return axios.get(getBaseApi()+"configs")
}

const addWordpressDetails = ({wordpressTitle, wordpressUrl, wordpressUser, wordpressCreds, userPrompt}) =>{
  return axios.post(getBaseApi()+"add_wpress",{
    title: wordpressTitle,
    url: wordpressUrl,
    user: wordpressUser,
    creds: wordpressCreds,
    prompt: userPrompt
  })
}

const updateOpenAI = (key)=>{
  return axios.post(getBaseApi()+"openai_creds",{
    openai_creds: key
  })
}

const Settings = () => {
  const [values, setValues] = useState({
    wordpressTitle: "",
    wordpressUrl: "",
    wordpressUser: "",
    wordpressCreds: "",
    userPrompt: "",
  });
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');


  useEffect(()=>{
    //Retrieve user configs
    fetchConfigs().then((data)=>{
      setData(data.data.configs.data)
      if(data.data.configs.data.length){
        let keycred = data.data.configs.data.find((row)=>row.credential_name === 'open_ai')
        setKey(keycred?keycred.credential_value:'');
      }
    }).catch((err)=>{
      console.log(err)
    })

  },[])

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

  const handleOpen = () => {
    setOpen(true);
  };

  const addSite = () => {
    setLoading(true)
    addWordpressDetails({userPrompt: values.userPrompt,wordpressCreds: values.wordpressCreds, wordpressUrl: values.wordpressUrl, wordpressTitle: values.wordpressTitle, wordpressUser: values.wordpressUser}).then((res)=>{
      console.log('Log: ', res)
    }).catch((err)=>{
      setLoading(false)
    }).finally(()=>{
      fetchConfigs().then((data)=>{
        console.log('Confgis: ', data.data)
      }).catch((err)=>{
        console.log(err)
      }).then(()=>{
        setLoading(false)
        setOpen(false)
      })
    })
  }
  const handleClose = () => {
    setOpen(false)
  };

  const updateKey = () => {
    setLoading(true)
    updateOpenAI(key).then((res)=>{
      fetchConfigs().then((data)=>{
        setData(data.data.configs.data)
        if(data.data.configs.data.length){
          let keycred = data.data.configs.data.find((row)=>row.credential_name === 'open_ai')
          setKey(keycred?keycred.credential_value:'');
        }
      }).catch((err)=>{
        console.log(err)
      })
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
  }


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
            onChange={handleChange}
            placeholder="blogging"
            name="wordpressTitle"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>URL</Typography>
          <TextField
            fullWidth
            onChange={handleChange}
            placeholder="example@web.com"
            name="wordpressUrl"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>Credentials</Typography>
          <TextField
            fullWidth
            onChange={handleChange}
            placeholder="Wp_4654564646"
            name="wordpressCreds"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>Wordpress Username</Typography>
          <TextField
            fullWidth
            onChange={handleChange}
            placeholder="Wp_4654564646"
            name="wordpressUser"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>Additional Prompt</Typography>
          <TextField
            fullWidth
            onChange={handleChange}
            placeholder="Wp_4654564646"
            name="userPrompt"
            type="text"
          />

          <Button
            variant="contained"
            sx={{ mt: 2, minWidth:'120px', minHeight:'40px' }}
            style={{ float: "right" }}
            onClick={()=>addSite()}
          >
            {loading ? <CircleLoader size={10} color="white"/> : 'Add Site'}
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
                  onChange={(eve)=>setKey(eve.target.value)}
                  type="text"
                  value={key}
                />
              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button onClick={updateKey} variant="contained">
            {loading ? <CircleLoader size={10} color="white"/> : 'Update'}
            </Button>
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
                <StyledTableCell>Wordpress User</StyledTableCell>
                <StyledTableCell>Additional Prompt</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {data.filter((row)=>row.credential_name === 'wordpress').map((row) => (
                <StyledTableRow key={row.credential_name}>
                  <StyledTableCell component="th" scope="row">
                    {row.wordpress_site}
                  </StyledTableCell>
                  <StyledTableCell>{row.wordpress_url}</StyledTableCell>
                  <StyledTableCell>{row.credential_value}</StyledTableCell>
                  <StyledTableCell>{row.wordpress_user}</StyledTableCell>
                  <StyledTableCell>{row.user_prompt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {
                !data.length ? <Box sx={{width:'100%', textAlign:'center',marginTop:'20px'}}>
                <Typography fontSize={"large"}>No Records</Typography>
                </Box>:<></>
              }
      </Grid>
    </main>
  );
};

export default Settings;
