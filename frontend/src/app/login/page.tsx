"use client";
import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { LoginForm } from "./LoginForm";

const PageContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr", // Default to one column (mobile view)
  minHeight: "100vh",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
  },
}));

const LeftSection = styled("div")(({ theme }) => ({
  display: "none",

  [theme.breakpoints.up("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    background: "teal",
    borderRadius: "0 40px 40px 0px ",
  },
}));

const RightSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  backgroundColor: "#f5f5f5",
}));

const LoginPage = () => {
  return (
    <PageContainer>
      <LeftSection>
        <Typography
          variant='h4'
          component='h2'
          sx={{
            fontSize: 40,
            fontWeight: "bold",
            marginTop: "50px",
            color: "#fff",
          }}
          className='sm:w-[80%] w-[65%]'
        >
          Sign in into your account and start building in minutes....
        </Typography>
        <Typography
          variant='h4'
          component='b'
          sx={{
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "50px",
          }}
          className='sm:w-[55%] w-[60%]  text-[#fff]'
        >
          Unleash the power of your spreadsheets. Build dynamic CMS solutions
          with ease.
        </Typography>
      </LeftSection>

      <RightSection>
        <Box className='sm:max-w-[450px] max-w-[100%] w-[100%] flex flex-col items-center'>
          <LoginForm onSubmit={() => null} />
        </Box>
      </RightSection>
    </PageContainer>
  );
};

export default LoginPage;
