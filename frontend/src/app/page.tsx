"use client";
import { Box, Button, Container, Typography, styled } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "./redux/reduxHooks";
import { RootState } from "./redux/store";

// Styled components
const Section = styled(Box)({
  overflow: "auto",
  background:
    "linear-gradient(135deg, #ffffff 0%, #e0f2f1 40%, #b2dfdb 70%, #ffffff 100%)",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
});

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(20),
  width: "90%",
  maxWidth: "800px",
  height: "auto",
  mx: "auto",
  flexDirection: "column",
  textAlign: "center",
  display: "flex",
  gap: theme.spacing(6),
  alignItems: "center",
}));

const StyledTypography = styled(Typography)<{ component: React.ElementType }>(
  ({ theme }) => ({
    fontWeight: "bold",
    color: "teal",
    fontSize: "30px",
    [theme.breakpoints.up("md")]: {
      fontSize: "50px",
    },
  })
);

const BodyTypography = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#333",
  width: "95%",
  [theme.breakpoints.up("sm")]: {
    fontSize: "20px",
    width: "80%",
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Default for small screens
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(4),
  paddingBottom: "40px",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row", // Override for screens larger than 'sm'
  },
}));
const GetStartedButton = styled(Button)<{ component: React.ElementType }>({
  padding: "10px 30px",
  borderRadius: "5px",
  fontSize: "1rem",
  fontWeight: "bold",
  backgroundColor: "teal",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "teal",
  },
});

const StarButton = styled(Button)<{ component: React.ElementType }>(
  ({ theme }) => ({
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.text.primary,
    },
  })
);

const Page = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    /***
   We're keeping this function (logic) here temporarily. 
   It retrieves the token from localStorage and sends it to 
   the "/current-user" endpoint to verify the token and fetch the current user. 
   Once the request is completed successfully (handled in authSlice.ts), 
   the isAuthenticated state in authSlice.ts is updated to true.
   In this logic, if the user is authenticated, 
   they will be redirected to the 
   dashboard (the dashboard will be implemented in another branch). 
   For now, we're leaving this as is because we might 
   add a launcher page 
   or a blank page to display while the request is pending or loading, 
   before showing either the landing page or dashboard.
  Alternatively, 
  we may set the landing page as the default component, 
  adding this logic to a button in the navigation header. 
  The button could display either:
   <button>Sign in</button> or <button>Dashboard</button> (depending on auth state). 
  While the request is pending, neither button will be visible until the request is 
  completed successfully.
  ****/
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (token) {
        try {
          // Dispatch fetchCurrentUser to validate token and get user data
          await dispatch(fetchCurrentUser()).unwrap();

          if (isAuthenticated) {
            // If authenticated, redirect to the dashboard
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Failed to fetch current user:", error);
          router.push("/");
        }
      }
    };
    checkAuthStatus();
  }, [dispatch, isAuthenticated, router]);

  // Render landing page by default if not authenticated or fetching user
  return <LandingPage />;
};

export default Page;

const LandingPage = () => {
  return (
    <Section component='section' id='home'>
      <StyledContainer>
        <StyledTypography variant='h3' component='h1' gutterBottom>
          Convert Your Google Sheets into a JSON API & Use as a CMS.
        </StyledTypography>
        <BodyTypography variant='body1' paragraph>
          Sheetrocket empowers you to transform Google Sheets into a dynamic CMS
          without API keys. Manage website content and updates directly from
          your sheets. Experience hassle-free content management,
          revolutionizing your workflow.
        </BodyTypography>
        <ButtonContainer>
          <GetStartedButton component={Link} href='/signup' variant='contained'>
            Get Started
          </GetStartedButton>
          <StarButton
            component={Link}
            href='https://github.com/sheetrocket/sheetrocket'
          >
            Star on GitHub
          </StarButton>
        </ButtonContainer>
      </StyledContainer>
    </Section>
  );
};
