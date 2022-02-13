import React, { useState } from "react";
import { Box, Dialog, DialogContent, Button, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import indexStyles from "../../styles/Index.module.css";
import { useTheme } from "@mui/styles";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={indexStyles.headerContainer}>
      <div className={indexStyles.header}>
        <div className={indexStyles.headerContentContainer}>
          <h1 className={indexStyles.headerPhrase}>The future of ticketing is here. </h1>
          <Button className={indexStyles.headerButton} variant="contained" onClick={() => setOpen(true)}>
            The fuck do you mean?
          </Button>

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
        </div>
      </div>
      <div className={indexStyles.arrowDown} />
    </div>
  );
};

export default Header;
