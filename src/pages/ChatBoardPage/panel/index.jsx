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
  Modal,
} from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import { getBaseApi } from "../../../config/Enviroment";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LinearProgress from "@mui/material/LinearProgress";
import CircleLoader from 'react-spinners/PulseLoader'

const HtmlToReact = require("html-to-react").Parser;

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

const generateArticle = async (url) => {
  return await axios.post(getBaseApi() + "generate", {
    url,
  });
};

const getQueue = () => {
  return axios.get(getBaseApi()+"get_queue")
}

const fetchConfigs = () => {
  return axios.get(getBaseApi()+"configs")
}

const init_loop = () => {
  return axios.get(getBaseApi()+"do")
}

const insertIntoQueue = (title, url, wordpressUrl, site) => {
  return axios.post(getBaseApi()+"insert_queue",{
    title,
    url,
    wordpress_url: wordpressUrl,
    site
  })
}

const regenerate = (id) => {
  return axios.post(getBaseApi()+"regen",{
    item_id: id
  })
}

const Panel = () => {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingReg, setLoadingReg] = useState(false);
  const [content, setContent] = useState(null);
  const htmlToReactParser = new HtmlToReact();
  const [data, setData] = useState([])
  const [sites, setSites] = useState([])
  const [activeSite, setActiveSite] =  useState('select')
  const [articleData, setArticleData] =  useState('')

  useEffect(()=>{
    getQueue().then((data)=>{
      console.log('Queue: ', data.data)
      setData(data.data.queue.data);
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  useEffect(()=>{
    init_loop().catch((err)=>{
      console.log('Loop error ', err)
    })
  },[])

  useEffect(()=>{
    //Retrieve user configs
    fetchConfigs().then((data)=>{
      setSites(data.data.configs.data.filter((row)=>row.credential_name === 'wordpress'))
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const handleChange = (event) => {
    // setAge(event.target.value);
  };

  function go() {
    if(activeSite === 'select'){
      return window.alert('Please select a wordpress site from list!')
    }
    if(!url || url === '' || !url.includes('http') || !url.includes('://')) return window.alert('Please enter valid url!')

    let site = sites.find((site)=> site.wordpress_url === activeSite)
    if(!site) return window.alert('Something went wrong!')
    setLoading(true)
    insertIntoQueue(site.wordpress_site,url ,activeSite,site.wordpress_site).then((res)=>{
      getQueue().then((data)=>{
        console.log('Queue: ', data.data)
        setData(data.data.queue.data);
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setLoading(false)
      })
    }).catch((err)=>{
      console.log(err)
      setLoading(false)
    })
  }

  function regenArticle(id){
    setLoadingReg(true)
    regenerate(id).then((res)=>{
      getQueue().then((data)=>{
        setData(data.data.queue.data);
        setLoadingReg(false)
      }).catch((err)=>{
        console.log(err)
        setLoadingReg(false)
      })
    }).catch((err)=>{
      console.log(err)
      setLoadingReg(false)
    })
  }

  function handleClose(){
    setOpen(false)
  }
  function handleSubmit() {}
  return (
    <main className="ml-0 h-full p-6 flex-grow">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      > 
      {articleData && articleData !== ''?
        <Box sx={{ ...style, maxHeight:'80%', overflowY: 'scroll' }}>
          {htmlToReactParser.parse(articleData)}
        </Box> :(<></>)
        }
    </Modal>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            subheader="Fetch & Regenrate Article"
            title="Generate Content"
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={10}>
                <Typography>Article URL</Typography>
                <TextField
                  fullWidth
                  placeholder="https://newswebsite"
                  name="article"
                  type="text"
                  value={url}
                  onChange={(eve) => setUrl(eve.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2} style={{ paddingTop: "40px" }}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={activeSite}
                    onChange={(eve)=>{setActiveSite(eve.target.value)}}
                  >
                    <MenuItem value="select">Select Wordpress Site</MenuItem>
                    {sites && sites.length && sites.map((site)=>(
                        <MenuItem value={site.wordpress_url}>{site.wordpress_site}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button disabled={loading} onClick={go} variant="contained">
              {loading ? <CircleLoader size={10} /> : "Do The Magic"}
            </Button>
          </CardActions>
        </Card>
      </form>
      {/* <Typography variant="h5" style={{ paddingLeft: "20px" }}>
        All Article Queue
      </Typography> */}

      {/* {content && ( */}
      <Card>
        <CardHeader title="All Article Queue" />
        {
          data?.map((rec)=>(
            <CardContent
          style={{
            overflow: "scroll",
            maxHeight: "400px",
            overflowX: "hidden",
          }}
        >
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Card sx={{ minWidth: 220 }} style={{ background: "#f4f4f4" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 17, fontWeight: "bold", color: "black" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {rec.title}
                  </Typography>
                  <Typography sx={{ fontSize: 14,mb:1 }} component="div">
                    Article URL:
                    <a
                      style={{ color: "blue" }}
                      href={rec.article_url}
                    >
                      {rec.article_url}
                    </a>
                  </Typography>

                  <Typography variant="div">
                    <FiberManualRecordIcon color={rec.status === 'Processing'? "success": (rec.status ==='In Queue' ? "primary": "error")}/> {rec.status}
                  </Typography>
                  <LinearProgress hidden={rec.status === 'Done'} sx={{ mt: 2 }} />
                </CardContent>
                <CardActions sx={{ mb: 2 }} style={{ float: "right" }}>
                  <Button onClick={()=>{setArticleData(rec.output_html);setOpen(true)}} disabled={!rec.output_html} variant="outlined" size="small">
                    Review Result
                  </Button>
                  <Button onClick={()=>regenArticle(rec.id)} variant="contained" size="small">
                  {loadingReg ? <CircleLoader size={10} /> : "Regenerate Article"} 
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          {/* {htmlToReactParser.parse(content)} */}
        </CardContent>
          ))
        }
        
      </Card>
      {/* )} */}
    </main>
  );
};

export default Panel;
