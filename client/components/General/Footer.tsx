import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { useTheme } from "@mui/material/styles";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Footer: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      sx={{
        marginBottom: 0,
        height: 200,
        width: "100%",
        backgroundColor: "rgb(40, 40, 43)",
      }}></BottomNavigation>
  );
};

export default Footer;
