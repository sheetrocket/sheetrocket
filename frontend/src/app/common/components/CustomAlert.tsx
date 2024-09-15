import React, { useState } from "react";
import { Alert, AlertProps, IconButton } from "@mui/material";

interface CustomAlertProps extends AlertProps {
  message: string | null;
  visible: boolean;
}

export const CustomAlert = ({
  message,
  visible,
  severity = "error",
  ...props
}: CustomAlertProps) => {
  if (!visible) return null;

  return (
    <Alert severity={severity} {...props} sx={{ marginBottom: "20px" }}>
      {message}
    </Alert>
  );
};
