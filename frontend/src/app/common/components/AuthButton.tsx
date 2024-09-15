"use client";
import React from "react";
import { Button, CircularProgress, ButtonProps } from "@mui/material";

interface AuthButtonProps extends ButtonProps {
  label: string;
  loading?: boolean;
}

export const AuthButton = ({ label, loading = false }: AuthButtonProps) => {
  return (
    <Button
      type='submit'
      variant='contained'
      color='primary'
      fullWidth
      disabled={loading}
      sx={{
        backgroundColor: "teal",
        "&:hover": {
          backgroundColor: "teal",
        },
      }}
    >
      {loading ? (
        <CircularProgress size={24} color='inherit' /> // Show spinner when loading
      ) : (
        label
      )}
    </Button>
  );
};
