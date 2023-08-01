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
  ListItemIcon,
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
import CreateIcon from '@mui/icons-material/CreateRounded';

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

const addWordpressDetails = ({wordpressTitle, wordpressUrl, wordpressUser, wordpressCreds, userPrompt, categories}) =>{
  return axios.post(getBaseApi()+"add_wpress",{
    title: wordpressTitle,
    url: wordpressUrl,
    user: wordpressUser,
    creds: wordpressCreds,
    prompt: userPrompt,
    categories
  })
}
const updateWordpressDetails = ({id,wordpressTitle, wordpressUrl, wordpressUser, wordpressCreds, userPrompt, categories}) =>{
  return axios.post(getBaseApi()+"update_wpress",{
    id,
    title: wordpressTitle,
    url: wordpressUrl,
    user: wordpressUser,
    creds: wordpressCreds,
    prompt: userPrompt,
    categories
  })
}
const deleteWordpressDetails = ({id}) =>{
  return axios.post(getBaseApi()+"delete_wpress",{
    id
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
    categories: "",
  });
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [activeId, setActiveId] = useState(null);


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
    addWordpressDetails({userPrompt: values.userPrompt,wordpressCreds: values.wordpressCreds, wordpressUrl: values.wordpressUrl, wordpressTitle: values.wordpressTitle, wordpressUser: values.wordpressUser, categories: values.categories}).then((res)=>{
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

  const updateSite = () => {
    setLoading(true);
    updateWordpressDetails({id: activeId,userPrompt: values.userPrompt,wordpressCreds: values.wordpressCreds, wordpressUrl: values.wordpressUrl, wordpressTitle: values.wordpressTitle, wordpressUser: values.wordpressUser, categories: values.categories}).then((res)=>{
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

  const deleteSite = () => {
    setLoading(true);
    deleteWordpressDetails({id: activeId}).then((res)=>{
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
    setIsUpdate(false)
    setActiveId(null)
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

  function editCred(id){
    let cred = data.find((row)=> row.id === id);
    if(cred){
     setIsUpdate(true)
     let obj = {}
     obj['wordpressTitle'] = cred.wordpress_site
     obj['wordpressUrl'] = cred.wordpress_url
     obj['wordpressUser'] = cred.wordpress_user
     obj['wordpressCreds'] = cred.credential_value
     obj['userPrompt'] = cred.user_prompt
     obj['categories'] = cred.categories
     setValues(obj)
     setActiveId(id);
     setOpen(true)
    }
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
           {!isUpdate ? "Add Credentials" : "Change Credentials"}
          </Typography>
          <Typography>Wordpress Title</Typography>
          <TextField
            fullWidth
            value={values.wordpressTitle}
            onChange={handleChange}
            placeholder="blogging"
            name="wordpressTitle"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>URL</Typography>
          <TextField
            fullWidth
            value={values.wordpressUrl}
            onChange={handleChange}
            placeholder="example@web.com"
            name="wordpressUrl"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>Credentials</Typography>
          <TextField
            fullWidth
            value={values.wordpressCreds}
            onChange={handleChange}
            placeholder="wordpress user password"
            name="wordpressCreds"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>Wordpress Username</Typography>
          <TextField
            fullWidth
            value={values.wordpressUser}
            onChange={handleChange}
            placeholder="wordpress user id"
            name="wordpressUser"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>Additional Prompt</Typography>
          <TextField
            fullWidth
            value={values.userPrompt}
            onChange={handleChange}
            placeholder="Do some seo stuff!!"
            name="userPrompt"
            type="text"
          />
          <Typography sx={{ mt: 2 }}>Categories (semicolon separated)</Typography>
          <TextField
            fullWidth
            value={values.categories}
            onChange={handleChange}
            placeholder="Food;Tech;Business"
            name="categories"
            type="text"
          />

          <Button
            variant="contained"
            sx={{ mt: 2, minWidth:'120px', minHeight:'40px' }}
            style={{ float: "right" }}
            onClick={()=> isUpdate ? updateSite() :addSite()}
          >
            {loading ? <CircleLoader size={10} color="white"/> :(!isUpdate ?'Add Site':'Update Site')}
          </Button>
          <Button
            hidden={!isUpdate}
            variant="contained"
            color="error"
            sx={{ mt: 2, minWidth:'120px', minHeight:'40px', marginRight: '10px' }}
            style={{ float: "right" }}
            onClick={()=>deleteSite()}
          >
            {loading ? <CircleLoader size={10} color="white"/> : 'Delete'}
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
                <StyledTableCell width={"2px"}> </StyledTableCell>
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
                  <StyledTableCell onClick={()=>editCred(row.id)} sx={{cursor:'pointer'}} width={"2px"}> <ListItemIcon>
                <CreateIcon />
              </ListItemIcon> </StyledTableCell>
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
