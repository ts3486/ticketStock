import React, { useState } from "react";
import {
  Box,
  CardMedia,
  Dialog,
  DialogContent,
  Button,
  DialogTitle,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/styles";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ marginBottom: "5%" }}>
      <CardMedia image={"header1.jpg"} sx={{ height: 750, width: "100%" }}>
        <Box sx={{ paddingTop: "15%", paddingLeft: "8%" }}>
          <Typography variant="h1" sx={{ color: "white", marginBottom: "3%", width: "65%", fontWeight: 700 }}>
            The future of ticketing is here.{" "}
          </Typography>
          <Button
            sx={{
              width: "30%",
              height: 50,
              fontSize: "17 !important",
              fontWeight: "bold !important",
              backgroundColor: "#1fd1f9",
              backgroundImage: "linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%)",
            }}
            variant="contained"
            onClick={() => setOpen(true)}>
            What do you mean?
          </Button>
        </Box>
      </CardMedia>

      {open ? (
        <Dialog
          open={open}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}>
          <DialogContent>
            <DialogTitle sx={{ m: 0, p: 2 }}>
              What is ticketStock?
              <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Box>
              <div className="firstStep">1. Search for an Event or Ticket </div>
              <div className="secondStep"> 2. Purchase Ticket</div>
              <div className="thirdStep"> 3. Enjoy the event & Receive long term benefits!</div>
            </Box>
          </DialogContent>
        </Dialog>
      ) : null}
    </Box>
  );
};

export default Header;
