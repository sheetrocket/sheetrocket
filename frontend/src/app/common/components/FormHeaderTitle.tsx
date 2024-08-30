"use client";
import { Box, Typography } from "@mui/material";

interface Props {
  title: string | JSX.Element;
}

export const FormHeaderTitle = ({ title }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingBottom: 5,
      }}
    >
      <Typography
        variant='h4'
        component='h2'
        sx={{ fontSize: 25, fontWeight: "700", color: "teal" }}
      >
        {title}
      </Typography>
    </Box>
  );
};
