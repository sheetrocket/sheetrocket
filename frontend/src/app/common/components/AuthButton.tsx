import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface AuthButtonProps extends ButtonProps {
  label: string;
}

export const AuthButton = ({ label }: AuthButtonProps) => {
  return (
    <Button
      type='submit'
      variant='contained'
      color='primary'
      fullWidth
      sx={{
        backgroundColor: "teal",
        "&:hover": {
          backgroundColor: "teal",
        },
      }}
    >
      {label}
    </Button>
  );
};
