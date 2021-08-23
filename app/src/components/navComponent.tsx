import React from "react";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const NavComponent = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        {/* <Typography variant="h6" style={{ flex: 1 }}>
            News
          </Typography> */}
        <Button color="inherit" href="/post">
          Post
        </Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavComponent;
