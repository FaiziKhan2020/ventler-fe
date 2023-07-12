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
  Typography
} from '@mui/material';
import {useQuery} from 'react-query'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getBaseApi } from '../../../config/Enviroment';
const HtmlToReact = require("html-to-react").Parser;

const generateArticle = async (url) =>{
  return (await axios.post(getBaseApi()+"generate",{
    url
  }))
}

const Panel = () =>{
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null)
  const htmlToReactParser = new HtmlToReact();

  function go(){
    if(url){
      setLoading(true)
      generateArticle(url).then((data)=>{
        setLoading(false)
        setContent(data.data.content);
      })
    }
  }
  function handleSubmit(){
  }
    return(
      <main className='ml-0 h-full p-6 flex-grow'>
      <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Fetch & Regenrate Article"
          title="Generate Content"
        />
        <CardContent>
          <Stack
            spacing={3}
          >
            <Box>
            <Typography>Article URL</Typography>
            <TextField
              fullWidth
              placeholder='https://newswebsite'
              name="article"
              type="text"
              value={url}
              onChange={(eve)=>setUrl(eve.target.value)}
            />
            </Box>

          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={loading} onClick={go} variant="contained">
            {loading ? "Generating Article": "Do The Magic"}
          </Button>
        </CardActions>
      </Card>
    </form>
    {content &&
    <Card>
        <CardHeader
          title="AI Generated Blog"
        />
        <CardContent style={{overflowY: 'scroll', maxHeight:'550px'}}>
          {htmlToReactParser.parse(content)}
          </CardContent>
    </Card>
    }
    </main> 
    )
}

export default Panel;