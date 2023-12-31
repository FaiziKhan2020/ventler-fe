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
  Switch,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";

import axios from "axios";
import { useEffect, useState } from "react";
import { getBaseApi } from "../../../config/Enviroment";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LinearProgress from "@mui/material/LinearProgress";
import CircleLoader from "react-spinners/PulseLoader";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

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
  return axios.get(getBaseApi() + "get_queue");
};

const fetchConfigs = () => {
  return axios.get(getBaseApi() + "configs");
};
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

const init_loop = () => {
  return axios.get(getBaseApi() + "do");
};

const insertIntoQueue = (title, url, wordpressUrl, site,autoUpload,length,tone,mainPrompt,language,headings,author,category,productBlog,product_image_url) => {
  return axios.post(getBaseApi() + "insert_queue", {
    title,
    url,
    wordpress_url: wordpressUrl,
    site,
    auto_upload: autoUpload,
    product_blog: productBlog,
    product_image_url,
    main_prompt: mainPrompt,
    headings,
    language,
    tone,
    length,
    author,
    category
  });
};

const upload = (id) => {
  return axios.post(getBaseApi() + "upload", {
    item_id: id,
  });
};

const regenerate = (id) => {
  return axios.post(getBaseApi() + "regen", {
    item_id: id,
  });
};

const Panel = () => {
  const [url, setUrl] = useState("");
  const [length, setLength] = useState("");
  const [tone, setTone] = useState("");
  const [author, setAuthor] = useState("");
  const [mainPrompt, setMainPrompt] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingReg, setLoadingReg] = useState(false);
  const [content, setContent] = useState(null);
  const htmlToReactParser = new HtmlToReact();
  const [data, setData] = useState([]);
  const [sites, setSites] = useState([]);
  const [activeSite, setActiveSite] = useState("select");
  const [language, setLanguage] = useState("English");
  const [heading, setHeading] = useState("select");
  const [articleData, setArticleData] = useState("");
  const [category, setCategory] = useState("select");
  const [autoUpload, setAutoUpload] = useState(true);
  const [productBlog, setProductBlog] = useState(false);
  const [productImageUrl, setProductImageUrl] = useState("");

  useEffect(() => {
    getQueue()
      .then((data) => {
        console.log("Queue: ", data.data);
        setData(data.data.queue.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTimeout(()=>{
      getQueue()
      .then((data) => {
        console.log("Queue: ", data.data);
        setData(data.data.queue.data);
      })
      .catch((err) => {
        console.log(err);
      });
    },1000 * 60 * 2)
  }, []);

  useEffect(() => {
    init_loop().catch((err) => {
      console.log("Loop error ", err);
    });
  }, []);

  useEffect(() => {
    //Retrieve user configs
    fetchConfigs()
      .then((data) => {
        setSites(
          data.data.configs.data.filter(
            (row) => row.credential_name === "wordpress"
          )
        );
        let obj = data.data.configs.data.filter(
          (row) => row.credential_name === "prompt_settings"
        )
        console.log('Ob: ', obj);
        if(obj && obj.length){
          obj = obj[0]
          setTone(obj.tone)
          setLength(obj.length)
          setLanguage(obj.default_language)
          setHeading(obj.total_headings)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    // setAge(event.target.value);
  };

  function go() {
    if (activeSite === "select") {
      return window.alert("Please select a wordpress site from list!");
    }
    if (!url || url === "" || !url.includes("http") || !url.includes("://"))
      return window.alert("Please enter valid url!");

    let site = sites.find((site) => site.wordpress_url === activeSite);
    if (!site) return window.alert("Something went wrong!");
    setLoading(true);
    insertIntoQueue(site.wordpress_site, url, activeSite, site.wordpress_site,autoUpload,length,tone,mainPrompt,language,heading,author,category,productBlog,productImageUrl)
      .then((res) => {
        getQueue()
          .then((data) => {
            console.log("Queue: ", data.data);
            setData(data.data.queue.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function regenArticle(id) {
    setLoadingReg(true);
    regenerate(id)
      .then((res) => {
        getQueue()
          .then((data) => {
            setData(data.data.queue.data);
            setLoadingReg(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingReg(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoadingReg(false);
      });
  }

  function handleClose() {
    setOpen(false);
  }
  function handleSubmit() {}
  return (
    <main style={{ overflowY: "scroll" }} className="ml-0 h-full p-6 flex-grow">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        {articleData && articleData !== "" ? (
          <Box sx={{ ...style, maxHeight: "80%", overflowY: "scroll" }}>
            {htmlToReactParser.parse(articleData)}
          </Box>
        ) : (
          <></>
        )}
      </Modal>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            subheader="Fetch & Regenrate Article"
            title="Generate Content"
          />
          <CardContent sx={{ paddingBottom: "0" }}>
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
                    onChange={(eve) => {
                      setActiveSite(eve.target.value);
                      let obj = sites.find((sit)=> sit.wordpress_url === eve.target.value)
                      if(obj){
                        setMainPrompt(obj.user_prompt);
                        if(obj.tone) setTone(obj.tone)
                        if(obj.default_language) setLanguage(obj.default_language)
                        if(obj.total_headings) setHeading(obj.total_headings)
                        if(obj.length) setLength(obj.length)
                        if(obj.author) setAuthor(obj.author)
                        if(obj.default_category) setCategory(obj.default_category)
                      }
                    }}
                  >
                    <MenuItem value="select">Select Wordpress Site</MenuItem>
                    {sites &&
                      sites.length &&
                      sites.map((site) => (
                        <MenuItem value={site.wordpress_url}>
                          {site.wordpress_site}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>

          <Card>
            <CardContent>
              <Grid
                container
                spacing={2}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item xs={12} md={2}>
                  <Typography>Article Length</Typography>
                  <TextField
                    fullWidth
                    placeholder="eg. 200,300,400"
                    name="eg. 200,300,400"
                    type="text"
                    value={length}
                    onChange={(eve) => setLength(eve.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography>Author</Typography>
                  <TextField
                    placeholder="Name of author"
                    name="Author"
                    type="text"
                    value={author}
                    onChange={(eve) => setAuthor(eve.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography>Tone</Typography>
                  <TextField
                    fullWidth
                    placeholder="eg. Persuasive,Informative,etc"
                    name="Tone"
                    type="text"
                    value={tone}
                    onChange={(eve) => setTone(eve.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2} style={{ paddingTop: "40px" }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={language}
                      onChange={(eve) => {
                        setLanguage(eve.target.value);
                      }}
                    >
                      <MenuItem value={"English"}>English</MenuItem>
                      <MenuItem value={"Korean"}>Korean</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2} style={{ paddingTop: "40px" }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={heading}
                      onChange={(eve) => {
                        setHeading(eve.target.value);
                      }}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                      <MenuItem value="7">7</MenuItem>
                      <MenuItem value="8">8</MenuItem>
                      <MenuItem value="9">9</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                      <MenuItem value="11">12</MenuItem>
                      <MenuItem value="13">13</MenuItem>
                      <MenuItem value="14">14</MenuItem>
                      <MenuItem value="15">15</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2} style={{ paddingTop: "40px" }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      onChange={(eve) => {
                        setCategory(eve.target.value);
                      }}
                    >
                      <MenuItem value="select">Select category</MenuItem>
                      {
                        sites && sites.length && sites.find((ste)=>ste.wordpress_url === activeSite)
                        && sites.find((ste)=>ste.wordpress_url === activeSite).categories.split(';').map((cat)=>(
                          <MenuItem value={cat}>{cat}</MenuItem>
                        ))
                        
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography>Custom Prompt</Typography>
                  <TextField
                    fullWidth
                    placeholder="Main prompt"
                    name="prompt"
                    type="text"
                    value={mainPrompt}
                    onChange={(eve) => setMainPrompt(eve.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <label style={{ lineHeight: "36px", marginLeft: "16px" }}>
              Auto Upload:{" "}
            </label>
            <Switch
              onChange={() => setAutoUpload((val) => !val)}
              checked={autoUpload}
            />
            <label style={{ lineHeight: "36px", marginLeft: "16px" }}>
              Amazon Product Blog:{" "}
            </label>
            <Switch
              onChange={() => setProductBlog((val) => !val)}
              checked={productBlog}
            />
          
            <Typography style={{marginLeft:"15px"}}>Amazon Product Image Link</Typography>
            <TextField
                    style={{marginLeft:"15px"}}
                    fullWidth
                    disabled={!productBlog}
                    placeholder="Amazon product image link.."
                    name="product"
                    type="text"
                    value={productImageUrl}
                    onChange={(eve) => setProductImageUrl(eve.target.value)}
            />
          </Card>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button disabled={loading} onClick={go} variant="contained">
              {loading ? <CircleLoader size={10} /> : "Do The Magic"}
            </Button>
          </CardActions>
        </Card>
      </form>
      <Card>
        <CardHeader title="All Article Queue" />
      {/* Table view Queue */}
      <Grid container>
        <TableContainer
          component={Paper}
          style={{
            overflowX: "scroll",
          }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Article Title</StyledTableCell>
                <StyledTableCell width={"40px"}>URL</StyledTableCell>
                <StyledTableCell>Wordpress Site</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Post Link</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell>
                    <a style={{ color: "blue" }} href={row.article_url}>
                        {row.article_url}
                      </a>
                    </StyledTableCell>
                    <StyledTableCell>{row.wordpress_url}</StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
                    <StyledTableCell><a style={{ color: "blue" }} href={row.post_url}>
                        {row.post_url}
                      </a></StyledTableCell>
                    <StyledTableCell>
                      <Box display={"grid"}>
                    <Button
                      onClick={() => {
                        setArticleData(row.output_html);
                        setOpen(true);
                      }}
                      disabled={!row.output_html}
                      variant="outlined"
                      size="small"
                      sx={{marginBottom: '15px'}}
                    >
                      Review Result
                    </Button>
                    <Button
                      onClick={() => regenArticle(row.id)}
                      variant="contained"
                      size="small"
                    >
                      {loadingReg ? (
                        <CircleLoader size={10} />
                      ) : (
                        "Regenerate Article"
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        setLoading(true);
                        upload(row.id).then(()=>{
                          setLoading(false)
                          window.alert("Article Uploaded!")
                        }).catch(err => setLoading(false))
                      }}
                      disabled={!row.output_html}
                      variant="outlined"
                      size="small"
                      sx={{marginTop: '15px'}}
                    >
                      Upload Article
                    </Button>
                    </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!data.length ? (
          <Box sx={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
            <Typography fontSize={"large"}>No Records</Typography>
          </Box>
        ) : (
          <></>
        )}
      </Grid>
    </Card>
    </main>
  );
};

export default Panel;
