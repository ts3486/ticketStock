import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Box, InputLabel, MenuItem, FormControl, Container } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material";

const Filter = () => {
  const theme = useTheme();

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "0% !important",
        display: "flex",
      }}>
      <Container sx={{ width: "100%", display: "flex", justifyContent: "flex-start", padding: "0% !important" }}>
        <FormControl
          sx={{
            width: "9%",
            marginRight: "1%",
            backgroundColor: "rgb(232,232,232)",
            borderRadius: 20,
            "& .MuiOutlinedInput-notchedOutline": { border: "0px solid white !important" },
          }}>
          <InputLabel sx={{}}>Any Day</InputLabel>
          <Select value={age} label="Age" onChange={handleChange} sx={{ borderRadius: 20, textAlign: "center" }}>
            <MenuItem value={10}>Today</MenuItem>
            <MenuItem value={20}>This week</MenuItem>
            <MenuItem value={30}>This month</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            width: "12%",
            marginRight: "1%",
            backgroundColor: "rgb(232,232,232)",
            borderRadius: 20,
            "& .MuiOutlinedInput-notchedOutline": { border: "0px solid white !important" },
          }}>
          <InputLabel>Any Distance</InputLabel>
          <Select value={age} label="Age" onChange={handleChange} sx={{ borderRadius: 20 }}>
            <MenuItem value={10}>10km</MenuItem>
            <MenuItem value={20}>20km</MenuItem>
            <MenuItem value={30}>30km</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            width: "12%",
            marginRight: "1%",
            backgroundColor: "rgb(232,232,232)",
            borderRadius: 20,
            "& .MuiOutlinedInput-notchedOutline": { border: "0px solid white !important" },
          }}>
          <InputLabel>Any Category</InputLabel>
          <Select value={age} label="Age" onChange={handleChange} sx={{ borderRadius: 20 }}>
            <MenuItem value={10}>Performance</MenuItem>
            <MenuItem value={20}>Tech</MenuItem>
            <MenuItem value={30}>Creative</MenuItem>
          </Select>
        </FormControl>
      </Container>
    </Box>
  );
};

export default Filter;
