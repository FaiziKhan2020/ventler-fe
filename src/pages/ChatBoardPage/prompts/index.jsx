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
import { makeStyles } from "@mui/styles";
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

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiInputBase-input": {
      // Adjust the height as per your requirement
      height: "4rem",
    },
  },
}));

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

const insertIntoQueue = (
  title,
  url,
  wordpressUrl,
  site,
  autoUpload,
  length,
  tone,
  mainPrompt,
  language,
  headings
) => {
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
    length,
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

const savePromptSettings = (base_prompt,
  title_prompt,
  slug_prompt,
  headings_prompt,
  conclusion_prompt,
  total_headings,
  default_language,
  default_tone,
  length,
  body_prompt) => {
    console.log('Base: ', base_prompt)
    return axios.post(getBaseApi() + "prompt_settings", {
      base_prompt,
    title_prompt,
    slug_prompt,
    headings_prompt,
    conclusion_prompt,
    total_headings,
    default_language,
    default_tone,
    length,
    body_prompt 
    })
  }

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
  const [base, setBase] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("");
  const [headings, setHeadings] = useState("");
  const [conclusion, setConslusion] = useState("");

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
          let obj = data.data.configs.data.filter(
            (row) => row.credential_name === "prompt_settings"
          )
          if(obj){
            obj = obj[0];
            setBase(obj.base_prompt);
            setTitle(obj.title_prompt);
            setSlug(obj.slug_prompt);
            setHeadings(obj.headings_prompt)
            setTone(obj.tone)
            setLanguage(obj.default_language)
            setHeading(obj.total_headings)
            setLength(obj.length)
            setBody(obj.body_prompt)
            setConslusion(obj.conclusion_prompt)
          }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    // setAge(event.target.value);
  };

  const savePrompts = () => {
    setLoading(true)
    savePromptSettings(base,title,slug,headings,conclusion,heading,language,tone,length,body).then(()=>{
      fetchConfigs()
      .then((data) => {
          let obj = data.data.configs.data.filter(
            (row) => row.credential_name === "prompt_settings"
          )
          if(obj){
            setBase(obj.base_prompt);
            setTitle(obj.title_prompt);
            setSlug(obj.slug_prompt);
            setHeadings(obj.headings_prompt)
            setTone(obj.tone)
            setLanguage(obj.default_language)
            setHeading(obj.total_headings)
            setLength(obj.length)
            setBody(obj.body_prompt)
            setConslusion(obj.conclusion_prompt)
          }
      })
      .catch((err) => {
        console.log(err);
      });
    }).finally(()=>{
      setLoading(false)
    })
  }

  const classes = useStyles();

  function go() {
    if (activeSite === "select") {
      return window.alert("Please select a wordpress site from list!");
    }
    if (!url || url === "" || !url.includes("http") || !url.includes("://"))
      return window.alert("Please enter valid url!");

    let site = sites.find((site) => site.wordpress_url === activeSite);
    if (!site) return window.alert("Something went wrong!");
    setLoading(true);
    insertIntoQueue(
      site.wordpress_site,
      url,
      activeSite,
      site.wordpress_site,
      autoUpload,
      length,
      tone,
      mainPrompt,
      language,
      heading
    )
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
          <CardHeader subheader=" " title="Prompts" />

          <Card>
            <CardContent>
              <Grid
                container
                spacing={2}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item xs={12} md={6}>
                  <Typography>Article Length = {"{length}"}</Typography>
                  <TextField
                    fullWidth
                    size="medium"
                    placeholder="eg. 200,300,400"
                    name="eg. 200,300,400"
                    type="text"
                    className={classes.textField}
                    value={length}
                    onChange={(eve) => setLength(eve.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Base Prompt</Typography>
                  <TextField
                    fullWidth
                    placeholder="Base Prompt..."
                    name="Base"
                    type="text"
                    value={base}
                    className={classes.textField}
                    onChange={(eve) => setBase(eve.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Headings Prompt</Typography>
                  <TextField
                    fullWidth
                    size="medium"
                    placeholder="Heading..."
                    name="eg. 200,300,400"
                    type="text"
                    className={classes.textField}
                    value={headings}
                    onChange={(eve) => setHeadings(eve.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Title Prompt</Typography>
                  <TextField
                    fullWidth
                    placeholder="Title..."
                    name="Tone"
                    type="text"
                    className={classes.textField}
                    value={title}
                    onChange={(eve) => setTitle(eve.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Slug Prompt</Typography>
                  <TextField
                    fullWidth
                    placeholder="Slug..."
                    name="Tone"
                    type="text"
                    className={classes.textField}
                    value={slug}
                    onChange={(eve) => setSlug(eve.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Body Prompt</Typography>
                  <TextField
                    fullWidth
                    placeholder="Body..."
                    name="Tone"
                    type="text"
                    className={classes.textField}
                    value={body}
                    onChange={(eve) => setBody(eve.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Conclusion  Prompt</Typography>
                  <TextField
                    fullWidth
                    placeholder="conclusion..."
                    name="Tone"
                    type="text"
                    className={classes.textField}
                    value={conclusion}
                    onChange={(eve) => setConslusion(eve.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6} style={{ paddingTop: "15px" }}>
                <Typography>Default Language = {"{language}"}</Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className={classes.textField}
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
                <Grid item xs={12} md={6} style={{ paddingTop: "40px" }}>
                <Typography>Total Headings = {"{headings}"}</Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className={classes.textField}
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
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingTop: "40px" }}>
                <Typography>Default Tone = {"{tone}"}</Typography>
                <TextField
                    fullWidth
                    placeholder="Tone..."
                    name="Tone"
                    type="text"
                    className={classes.textField}
                    value={tone}
                    onChange={(eve) => setTone(eve.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button disabled={loading} onClick={()=>savePrompts()} variant="contained">
              {loading ? <CircleLoader size={10} /> : "SAVE"}
            </Button>
          </CardActions>
        </Card>
      </form>
    </main>
  );
};

export default Panel;
