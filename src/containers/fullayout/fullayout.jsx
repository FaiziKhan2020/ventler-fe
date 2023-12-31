import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { TextField, InputAdornment, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Search } from "@mui/icons-material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PlagiarismOutlinedIcon from "@mui/icons-material/PlagiarismOutlined";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const SmallTextButton = styled(Button)`
    text-transform: none;
  `;

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar sx={{ border: "none", boxShadow: "none", background: "white" }}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          height="80vh"
        >
          <Box width={"90%"}>
            <TextField
              fullWidth
              multiline
              id="fullWidth"
              placeholder="Ask a question or make a request"
              sx={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexWrap={"wrap"}
          justifyContent="space-evenly"
          alignItems="flex-end"
          width={"70%"}
          marginTop={"30px"}
        >
          <SmallTextButton
            variant="outlined"
            sx={{
              background: "transparent",
              color: "black",
              boxShadow: "none",
              border: "1px solid gray",
              borderRadius: "20px",
            }}
            color="primary"
            startIcon={<Search />}
          >
            Legal research memo
          </SmallTextButton>
          <SmallTextButton
            variant="outlined"
            sx={{
              background: "transparent",
              color: "black",
              boxShadow: "none",
              border: "1px solid gray",
              borderRadius: "20px",
            }}
            color="primary"
            startIcon={<ArticleOutlinedIcon />}
          >
            Review documents
          </SmallTextButton>
          <SmallTextButton
            variant="outlined"
            sx={{
              background: "transparent",
              color: "black",
              boxShadow: "none",
              border: "1px solid gray",
              borderRadius: "20px",
            }}
            color="primary"
            startIcon={<PlagiarismOutlinedIcon />}
          >
            Extract data from a contract
          </SmallTextButton>
        </Box>
        {/* </div> */}
        {/* <DrawerHeader /> */}
      </Main>
    </Box>
  );
}
