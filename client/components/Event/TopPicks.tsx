import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import indexStyles from "../../styles/Index.module.css";
import { useTheme } from "@mui/material/styles";

const Footer: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Card sx={{ height: 400, width: 350 }}>
        <CardMedia image="./fire.jpeg" sx={{ height: 300, width: 350 }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"></Typography>
        </CardContent>
      </Card>
      <Card sx={{ height: 400, width: 350 }}>
        <CardMedia image="./fire.jpeg" sx={{ height: 300, width: 350 }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"></Typography>
        </CardContent>
      </Card>
      <Card sx={{ height: 400, width: 350 }}>
        <CardMedia image="./fire.jpeg" sx={{ height: 300, width: 350 }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"></Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Footer;
