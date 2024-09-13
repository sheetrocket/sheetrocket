"use client";
import React from "react";
import { InputLabel, styled, TextField, TextFieldProps } from "@mui/material";

interface TextInputProps extends Omit<TextFieldProps, "value" | "onChange"> {
  name: string;
  placeholder: string;
  label: string;
  value?: string; // Explicitly define the value prop
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Explicitly define the onChange prop
  error?: boolean;
  htmlFor: string;
  helperText?: string; // Define helperText prop, which can be string or undefined
}

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(4),

  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#ced4da",
    },
    "&:hover fieldset": {
      borderColor: "#adb5bd",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6c757d",
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px 12px",
    fontSize: "16px",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "black",
  },
}));

const TextInput = ({
  name,
  placeholder,
  label,
  value,
  onChange,
  error,
  type,
  helperText,
  htmlFor,
}: TextInputProps) => {
  return (
    <>
      <InputLabel htmlFor={htmlFor} sx={{ paddingBottom: "5px" }}>
        {label}
      </InputLabel>
      <CustomTextField
        id={htmlFor}
        fullWidth
        variant='outlined'
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        InputLabelProps={{
          shrink: false,
        }}
      />
    </>
  );
};

export default TextInput;
