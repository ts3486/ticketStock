import React, { useState } from "react";
import {
  Container,
  Box,
  Dialog,
  DialogContent,
  Card,
  CardMedia,
  Button,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import indexStyles from "../../styles/Index.module.css";
import { useTheme } from "@mui/styles";

const HowTo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Box>
        <Card>
          <CardMedia />
          <Typography>Step 1</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate laborum earum deserunt beatae placeat,
            itaque voluptatem esse nobis dolores suscipit quis labore aperiam repellat dolor! Inventore sint molestiae
            commodi?
          </Typography>
        </Card>
        <Card>
          <CardMedia />
          <Typography>Step 2</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate laborum earum deserunt beatae placeat,
            itaque voluptatem esse nobis dolores suscipit quis labore aperiam repellat dolor! Inventore sint molestiae
            commodi?
          </Typography>
        </Card>
        <Card>
          <CardMedia />
          <Typography>Step 2</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate laborum earum deserunt beatae placeat,
            itaque voluptatem esse nobis dolores suscipit quis labore aperiam repellat dolor! Inventore sint molestiae
            commodi?
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default HowTo;
