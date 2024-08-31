"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { styled, Typography } from "@mui/material";

import TextInput from "../common/components/TextInput";
import { FormHeaderTitle } from "../common/components/FormHeaderTitle";
import { AuthButton } from "../common/components/AuthButton";
import Link from "next/link";
import { LoginFormData } from "./LoginFormData";
import validationSchema from "./validationSchema";

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

type Props = {
  onSubmit: (formData: LoginFormData) => void;
};

export const LoginForm = ({ onSubmit }: Props) => {
  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    // Focus the first input field on render
    const nameInput = document.getElementById("email");
    if (nameInput) {
      nameInput.focus();
    }
  }, []);

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <FormHeaderTitle title='Sign in' />

      <TextInput
        id='email'
        label='Email'
        placeholder='Your email'
        name='email'
        type='email'
        htmlFor='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={
          formik.touched.email ? (formik.errors.email as string) : undefined
        }
      />
      <TextInput
        id='password'
        label='Password'
        placeholder='Your password'
        name='password'
        htmlFor='password'
        type='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password
            ? (formik.errors.password as string)
            : undefined
        }
      />
      <AuthButton label='Sign Up' />

      <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
        Not having an account?{" "}
        <Link
          href='/signup'
          style={{ color: "teal", textDecoration: "underline" }}
        >
          Sign up
        </Link>
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          marginTop: "20px",
          color: "teal",
          fontWeight: "bold",
          fontSize: "20px",
          fontStyle: "oblique",
        }}
      >
        Sheetrocket
      </Typography>
    </StyledForm>
  );
};