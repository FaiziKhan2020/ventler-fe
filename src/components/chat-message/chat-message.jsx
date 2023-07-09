import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';
import { keys } from '@material-ui/core/styles/createBreakpoints';
const HtmlToReact = require('html-to-react').Parser;
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: 'block',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    alignSelf: 'flex-end',
    width: '50%',
    backgroundColor: 'transparent',
    borderRadius: theme.shape.borderRadius,
  },
  senderContainer: {
    backgroundColor: '#cee8f3',
    color: theme.palette.primary.contrastText,
    width: '50%',
    boxShadow: 'none',
    borderRadius: '20px',
    float: 'right',
    padding: '10px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '20px',
  },

  receiverContainer: {
    background: '#dedede',
    color: theme.palette.primary.contrastText,
    width: '50%',
    borderRadius: '20px',
    padding: '10px',
    float: 'left',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '20px',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
  },
  senderText: {
    textAlign: 'left',
    boxShadow: 'none',
    color: theme.palette.primary.contrastText,
  },
  receiverText: {
    textAlign: 'left',
    boxShadow: 'none',
    color: theme.palette.primary.contrastText,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

const ChatMessage = ({ message, onOpenReference, idx }) => {
  const htmlToReactParser = new HtmlToReact();
  const classes = useStyles();
  const [eleCount, setEleCount] = React.useState(0);

  // React.useEffect(()=>{
  //   if(!message.isSender){
  //     const elemnts = document.querySelectorAll('strong')
  //     if(elemnts && eleCount === 0){
  //       elemnts.forEach((ele)=>{
  //         ele.addEventListener('click',(ev)=>{
  //           ev.preventDefault();
  //           console.log('ELE: ', ele.innerHTML)
  //           onOpenReference(ele.innerHTML)
  //     });
  //       setEleCount(elemnts.length);
  //     });
  //   }
  //   }
  // },[message])

  const handleSliderChange = (event, newValue) => {};

  const SmallTextButton = styled(Button)`
    text-transform: none;
  `;

  const bull = (
    <Box
      component='span'
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        {
          <Item>
            <Paper
              className={`${classes.chatContainer} ${
                idx % 2 === 0
                  ? classes.senderContainer
                  : classes.receiverContainer
              }`}
            >
              <Typography
                variant='body1'
                className={
                  idx % 2 === 0 ? classes.senderText : classes.receiverText
                }
              >
                <Card
                  sx={{ minWidth: 200, background: 'transparent !important' }}
                >
                  <CardContent>
                    <Typography
                      variant='h6'
                      style={{ fontWeight: '00', textTransform: 'capitalize' }}
                      color='black'
                      gutterBottom
                    >
                      {message?.msg?.includes('{')
                        ? JSON.parse(message.msg).query
                        : 'Koldine Bot'}
                    </Typography>
                    <Box
                      style={{
                        display: 'flex',
                      }}
                    >
                      <Box>
                        <Typography
                          variant='p'
                          style={{
                            display: 'block',
                            fontSize: '20px',
                          }}
                        >
                          {message?.msg?.includes('{')
                            ? JSON.parse(message.msg).text
                            : message.msg}
                        </Typography>
                      </Box>
                    </Box>
                    {/* 
              {message.files && message.files.length &&
                message.files.map((file)=>(
              <Box
                style={{
                  display: "flex",
                }}
              >
                <Box>
                  <SmallTextButton
                    sx={{
                      background: "#e94b4bf2",
                      minWidth: "4px",
                      padding: "1px",
                      marginRight: "7px",
                    }}
                    variant="contained"
                  >
                    {file.split('.')[1]}
                  </SmallTextButton>
                </Box>
                <Box>
                  <Typography
                    variant="p"
                    style={{
                      display: "block",
                      fontSize: "20px",
                    }}
                  >
                    {file.split('.')[0]}
                  </Typography>
                </Box>
              </Box>
                ))
              } */}
                  </CardContent>
                </Card>
              </Typography>
            </Paper>
          </Item>
        }
      </Grid>

      {/* Table */}
      {/* <Grid item xs={12} sm={12}>
        <Item>
          <Paper
            className={`${classes.chatContainer} ${
              isSender ? classes.senderContainer : classes.receiverContainer
            }`}
          >
            <Typography
              variant="body1"
              className={isSender ? classes.senderText : classes.receiverText}
            >
              <Typography
                variant="p"
                style={{
                  fontWeight: "600",
                  color: "black",
                }}
              >
                Review Document
              </Typography>
              <TableContainer
                component={Paper}
                style={{
                  background: "#ffffff",
                  textAlign: "left",
                  borderRadius: "15px",
                }}
              >
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="left"
                        style={{ border: "1px solid gray", fontWeight: "800" }}
                      >
                        Documents
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ border: "1px solid gray", fontWeight: "800" }}
                      >
                        Obama Joke
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ border: "1px solid gray", fontWeight: "800" }}
                      >
                        Obama mentions daughters
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        align="left"
                        style={{ border: "1px solid gray" }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <SmallTextButton
                              sx={{
                                background: "#e94b4bf2",
                                minWidth: "4px",
                                padding: "1px",
                                marginRight: "7px",
                              }}
                              variant="contained"
                            >
                              PDF
                            </SmallTextButton>
                          </Box>
                          <Box>
                            <Typography
                              variant="p"
                              style={{
                                display: "block",
                                fontSize: "20px",
                                color: "blue",
                              }}
                            >
                              Questions for contractor Questions for contractor.
                              pdf
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ border: "1px solid gray" }}
                      >
                        insufficient
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ border: "1px solid gray" }}
                      >
                        no
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="left"
                        style={{ border: "1px solid gray" }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <SmallTextButton
                              sx={{
                                background: "#e94b4bf2",
                                minWidth: "4px",
                                padding: "1px",
                                marginRight: "7px",
                              }}
                              variant="contained"
                            >
                              PDF
                            </SmallTextButton>
                          </Box>
                          <Box>
                            <Typography
                              variant="p"
                              style={{
                                display: "block",
                                fontSize: "20px",
                                color: "blue",
                              }}
                            >
                              Questions for contractor Questions for contractor.
                              pdf
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ border: "1px solid gray" }}
                      >
                        insufficient
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ border: "1px solid gray" }}
                      >
                        no
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Typography>
          </Paper>
        </Item>
      </Grid> */}
    </Grid>
  );
};

export default ChatMessage;
