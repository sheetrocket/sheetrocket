"use client";

import { styled } from "@mui/material";

export const PageLauncher = () => {
  const PageContainer = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }));

  const LauncherText = styled("span")(() => ({
    color: "teal",
    fontSize: "40px",
    fontWeight: "bold",
  }));

  return (
    <PageContainer>
      <LauncherText>Sheetrocket</LauncherText>
    </PageContainer>
  );
};
