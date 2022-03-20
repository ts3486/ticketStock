import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../accessTokens";
import { useLogoutMutation } from "../../generated/graphql";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  useScrollTrigger,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  borderRadius: 5,
  border: "1px solid rgb(0,0,0,0.3)",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const LocationIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon

    borderRight: "1px solid gray",
    transition: theme.transitions.create("width"),
    width: "0%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const LocationInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    width: "30%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function ElevationScroll(props: any) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.

  const barTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 600,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    style: {
      // position: barTrigger ? "fixed" : null,
      // backgroundColor: trigger ? "rgb(248,248,248)" : null,
      // color: trigger ? "black" : null,
    },
  });
}

const NavComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loggedin, setLoggedin] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [logout] = useLogoutMutation();

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const userState = getAccessToken();

    if (userState != "") {
      setLoggedin(true);
    }
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = () => {
    window.location.href = "/explore";
    // window.location.href = `/explore/${keyword}/${location}`;
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleClose}>
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          window.location.href = "/create";
        }}>
        Create
      </MenuItem>
      <MenuItem
        onClick={() => {
          logout();
          handleClose();
          window.location.href = "/";
        }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <AppBar sx={{ position: "fixed", color: "white", backgroundColor: "rgb(0,0,0,1.3)" }}>
          <Toolbar>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="text"
              sx={{ color: "white", backgroundColor: "rgb(0,0,0,1.3)" }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: "white",
                  backgroundColor: "rgb(0,0,0,1.3)",
                  textTransform: "none",
                }}>
                TicketStock
              </Typography>
            </Button>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <SearchInputBase
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search for keywords"
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    search();
                  }
                }}
              />

              <LocationIconWrapper>
                <LocationOnIcon />
              </LocationIconWrapper>
              <LocationInputBase
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    search();
                  }
                }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex", diplay: "flex", alignItems: "center" } }}>
              {loggedin ? (
                <div>
                  <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit">
                    <AccountCircle />
                  </IconButton>
                  {renderMenu}
                </div>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => (window.location.href = "/login")}
                  sx={{ marginLeft: 3, marginRight: 3, height: "50%" }}>
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default NavComponent;
