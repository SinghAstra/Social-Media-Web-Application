import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";

const Notification = ({ open, onClose, message, severity }) => {
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
