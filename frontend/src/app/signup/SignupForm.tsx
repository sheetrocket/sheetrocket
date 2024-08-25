"use client";
import React from "react";
import { useFormik } from "formik";
import { styled, Typography } from "@mui/material";
import { SignupFormData } from "./SignupFormData";
import validationSchema from "./validationSchema";
import TextInput from "../common/components/TextInput";
import { FormHeaderTitle } from "../common/components/FormHeaderTitle";
import { AuthButton } from "../common/components/AuthButton";
import Link from "next/link";

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

export const SignupForm = () => {
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
      <FormHeaderTitle title='Sign up' />
      <TextInput
        label='Name'
        placeholder='Your name'
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        autoFocus
        helperText={
          formik.touched.name ? (formik.errors.name as string) : undefined
        }
      />
      <TextInput
        label='Email'
        placeholder='Your email'
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
        placeholder='Your password'
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
        label='Confrim Password'
        placeholder='Confirm password'
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
      <AuthButton label='Sign Up' />
      <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
        Already have an account?{" "}
        <Link
          href='/login'
          style={{ color: "teal", textDecoration: "underline" }}
        >
          Sign in
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
