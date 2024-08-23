"use client";
import React from "react";
import { useFormik } from "formik";
import { Button, styled } from "@mui/material";
import { SignupFormData } from "./SignupFormData";
import validationSchema from "./validationSchema";
import TextInput from "../common/components/TextInput";

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    width: "75%",
  },
}));

const SignupForm = () => {
  const formik = useFormik<SignupFormData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <TextInput
        label='Name'
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={
          formik.touched.name ? (formik.errors.name as string) : undefined
        }
      />
      <TextInput
        label='Email'
        name='email'
        type='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={
          formik.touched.email ? (formik.errors.email as string) : undefined
        }
      />
      <TextInput
        label='Password'
        name='password'
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
      <TextInput
        label='Confirm Password'
        name='confirmPassword'
        type='password'
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword
            ? (formik.errors.confirmPassword as string)
            : undefined
        }
      />
      <Button type='submit' variant='contained' color='primary' fullWidth>
        Sign Up
      </Button>
    </StyledForm>
  );
};

export default SignupForm;
