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

import axios from "axios";
import { useEffect, useState } from "react";
import { getBaseApi } from "../../../config/Enviroment";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LinearProgress from "@mui/material/LinearProgress";
const HtmlToReact = require("html-to-react").Parser;

const generateArticle = async (url) => {
  return await axios.post(getBaseApi() + "generate", {
    url,
  });
};

const Panel = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const htmlToReactParser = new HtmlToReact();
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function go() {
    if (url) {
      setLoading(true);
      generateArticle(url).then((data) => {
        setLoading(false);
        setContent(data.data.content);
      });
    }
  }
  function handleSubmit() {}
  return (
    <main className="ml-0 h-full p-6 flex-grow">
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
                  <InputLabel id="demo-simple-select-label">
                    Wordpress Website
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Wordpress Website"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>URL1</MenuItem>
                    <MenuItem value={20}>URL2</MenuItem>
                    <MenuItem value={30}>URL3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button disabled={loading} onClick={go} variant="contained">
              {loading ? "Generating Article" : "Do The Magic"}
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Typography>
                  <Typography sx={{ fontSize: 14,mb:1 }} component="div">
                    URL:
                    <a
                      style={{ color: "blue" }}
                      href="
                    https://www.google.com/search?q=dumpy+urls&oq=dumpy+urls&aqs=chrome..69i57j69i59l3.2404j0j7&sourceid=chrome&ie=UTF-8
                    "
                    >
                      https://www.google.com/search?q=dumpy+urls&oq=dumpy+urls&aqs=chrome.
                    </a>
                  </Typography>

                  <Typography variant="div">
                    <FiberManualRecordIcon /> In Process
                  </Typography>
                  <LinearProgress sx={{ mt: 2 }} />
                </CardContent>
                <CardActions sx={{ mb: 2 }} style={{ float: "right" }}>
                  <Button variant="outlined" size="small">
                    Review Result
                  </Button>
                  <Button variant="contained" size="small">
                    Regenerate Article
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          {/* {htmlToReactParser.parse(content)} */}
        </CardContent>
      </Card>
      {/* )} */}
    </main>
  );
};

export default Panel;
