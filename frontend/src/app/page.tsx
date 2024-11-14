"use client";
import { Box, Button, Container, Typography, styled } from "@mui/material";
import Link from "next/link";

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
          <GetStartedButton
            component={Link}
            href='/auth/signup'
            variant='contained'
          >
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
