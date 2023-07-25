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

const insertIntoQueue = (title, url, wordpressUrl, site,autoUpload,length,tone,mainPrompt,language,headings) => {
  return axios.post(getBaseApi() + "insert_queue", {
    title,
    url,
    wordpress_url: wordpressUrl,
    site,
    auto_upload: autoUpload,
    main_prompt: mainPrompt,
    headings,
    language,
    tone,
    length
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
  const [autoUpload, setAutoUpload] = useState(true);

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
    insertIntoQueue(site.wordpress_site, url, activeSite, site.wordpress_site,autoUpload,length,tone,mainPrompt,language,heading)
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
                <Grid item xs={12} md={3}>
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
                        setHeading (eve.target.value);
                      }}
                    >
                      <MenuItem value="select">Number of headings</MenuItem>
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                      <MenuItem value={"4"}>4</MenuItem>
                      <MenuItem value={"5"}>5</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography>Main Prompt</Typography>
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
            overflow: "scroll",
            maxHeight: "300px",
            overflowX: "hidden",
          }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Article Title</StyledTableCell>
                <StyledTableCell>URL</StyledTableCell>
                <StyledTableCell>Wordpress Site</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
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
