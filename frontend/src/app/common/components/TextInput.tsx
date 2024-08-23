import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface TextInputProps extends Omit<TextFieldProps, "value" | "onChange"> {
  name: string;
  label: string;
  value: string; // Explicitly define the value prop
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Explicitly define the onChange prop
  error?: boolean; // Define error prop
  helperText?: string; // Define helperText prop, which can be string or undefined
}

const TextInput = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  ...rest
}: TextInputProps) => {
  return (
    <TextField
      fullWidth
      margin='normal'
      variant='outlined'
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText} // helperText can be a string or undefined
      {...rest}
    />
  );
};

export default TextInput;
