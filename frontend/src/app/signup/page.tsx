"use client";
import React from "react";
import {
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SignupForm } from "./SignupForm";

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

const SignupPage = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("sm"));

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
            width: isMediumScreen ? "80%" : "65%",
          }}
        >
          Sign up for free and start building in minutes....
        </Typography>
        <Typography
          variant='h4'
          component='b'
          sx={{
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "50px",
            color: "#fff",
            width: isMediumScreen ? "55%" : "60%",
          }}
        >
          Unleash the power of your spreadsheets. Build dynamic CMS solutions
          with ease.
        </Typography>
      </LeftSection>

      <RightSection>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: isMediumScreen ? "450px" : "100%",
          }}
        >
          <SignupForm />
        </Box>
      </RightSection>
    </PageContainer>
  );
};

export default SignupPage;
