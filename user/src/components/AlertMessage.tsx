import React, { SyntheticEvent } from "react";
import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";

interface AlertMessageProps {
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

export default function AlertMessage({ message, severity }: AlertMessageProps) {
  const [open, setOpen] = useState(true);

  const handleClose = (
    event: Event | SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
