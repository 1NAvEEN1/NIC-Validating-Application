import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Title(props) {
  let title = props.title;
  const navigate = useNavigate();

  const clickBack = () => {
    navigate("../");
  };

  return (
    <Typography variant="h4" gutterBottom>
      <IconButton
        color="error"
        sx={{
          marginTop: "-0.5rem",
        }}
        onClick={clickBack}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>{" "}
      {title}
    </Typography>
  );
}

export default Title;
