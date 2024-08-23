import React from "react";
import { Box, Container, Typography } from "@mui/material";
import SignupForm from "./SignupForm";

const SignupPage = () => {
  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='100vh'
      >
        <Typography variant='h4' component='h1' gutterBottom>
          Sign Up
        </Typography>
        <SignupForm />
      </Box>
    </Container>
  );
};

export default SignupPage;
