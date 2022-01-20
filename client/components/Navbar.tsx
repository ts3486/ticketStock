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
} from "@material-ui/core";
import navbarStyles from "../styles/Navbar.module.css";
import { Menu as MenuIcon } from "@material-ui/icons";

const NavComponent = () => {
  const [anchor, setAnchor] = useState<boolean>(false);

  const clickAway = () => {
    setAnchor(false);
  };

  const list = () => (
    <ClickAwayListener onClickAway={clickAway}>
      <Box
        style={{
          width: 300,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          // backgroundColor: "#fff",
        }}
        role="presentation">
        <List
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            margin: "20%",
          }}>
          {["MyPage", "Create", "Contact"].map((text: string) => (
            <ListItem
              style={{ display: "flex", justifyContent: "center" }}
              button
              component="a"
              href={"/" + text.toLowerCase()}
              key={text}>
              <ListItemText
                disableTypography
                style={{ margin: "20%" }}
                primary={
                  <Typography style={{ display: "flex", justifyContent: "center", fontSize: "120%" }}>
                    {text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </ClickAwayListener>
  );

  return (
    <AppBar color="primary" position="sticky">
      <Toolbar color="inherit">
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setAnchor(true)}>
          <MenuIcon />
        </IconButton>
        <React.Fragment>
          <Drawer open={anchor} anchor="left">
            {list()}
          </Drawer>
        </React.Fragment>

        <Typography variant="h6" style={{ flex: 1 }} onClick={() => (window.location.href = "/")}>
          TicketStock
        </Typography>

        <Button color="inherit" href="/login">
          Login
        </Button>
        {/* <Button color="inherit">Logout</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavComponent;
