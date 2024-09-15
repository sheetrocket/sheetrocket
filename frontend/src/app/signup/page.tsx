"use client";
import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { SignupForm } from "./SignupForm";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { signup } from "../redux/slice/authSlice";
import { UserData } from "../services/authService";
import { useRouter } from "next/navigation";

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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const router = useRouter();

  const handleSignup = async (formData: UserData) => {
    try {
      const result = await dispatch(signup(formData)).unwrap();
      // result will be the payload from the fulfilled action
      console.log("Signup successful!", result);
      localStorage.setItem("token", result.accessToken);
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

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
          Sign up for free and start building in minutes....
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
        <Box className='sm:max-w-[450px]  max-w-[100%]  w-[90%] flex flex-col items-center'>
          <SignupForm onSubmit={handleSignup} />
        </Box>
      </RightSection>
    </PageContainer>
  );
};

export default SignupPage;
