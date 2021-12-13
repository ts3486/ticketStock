import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Drawer,
  Box,
  ListItem,
  ListItemText,
  List,
  ClickAwayListener,
} from "@mui/material";
import { Menu as MenuIcon } from "@material-ui/icons";

const NavComponent = () => {
  const [anchor, setAnchor] = useState<boolean>(false);

  const clickAway = () => {
    setAnchor(false);
  };

  const list = () => (
    <ClickAwayListener onClickAway={clickAway}>
      <Box sx={{ width: 250, marginTop: 20, display: "flex", justifyContent: "center" }} role="presentation">
        <List>
          {["Home", "MyPage", "Events", "Create", "Contact"].map((text) => (
            <ListItem button component="a" href={"/" + text.toLowerCase()} key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </ClickAwayListener>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setAnchor(true)}>
          <MenuIcon />
        </IconButton>
        <React.Fragment>
          <Drawer open={anchor} anchor="left">
            {list()}
          </Drawer>
        </React.Fragment>

        <Typography variant="h6" style={{ flex: 1 }}>
          TicketStock
        </Typography>

        <Button color="inherit">Login</Button>
        {/* <Button color="inherit">Logout</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavComponent;
