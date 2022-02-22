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
    <Box className={indexStyles.topPicksContainer}>
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 100,
          textAlign: "left",
          marginBottom: 3,
          display: "flex",
          alignItems: "center",
        }}>
        Top Picks <LocalFireDepartmentIcon sx={{ fontSize: 40, marginLeft: 1 }} />
      </Typography>
      <div className={indexStyles.cardsContainer}>
        <Card className={indexStyles.eventCard}>
          <CardMedia image="" sx={{ height: 300, width: 400 }} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2"></Typography>
          </CardContent>
        </Card>
        <Card className={indexStyles.eventCard}>
          <CardMedia image="" sx={{ height: 300, width: 400 }} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2"></Typography>
          </CardContent>
        </Card>
        <Card className={indexStyles.eventCard}>
          <CardMedia image="" sx={{ height: 300, width: 400 }} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2"></Typography>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
};

export default Footer;
