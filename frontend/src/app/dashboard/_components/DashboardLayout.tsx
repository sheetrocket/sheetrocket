import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { MenuOutlined } from "@mui/icons-material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as Icon from "react-feather"; // Importing react-feather icons
import { useEffect, useState } from "react";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

// Sidebar data with react-feather icons
const sidebarData = [
  {
    name: "Spreadsheets",
    icon: <Icon.File />,
    routeName: "/dashboard/spreadsheets",
  },
  { name: "Usage", icon: <Icon.BarChart />, routeName: "/dashboard/usage" },
  { name: "Plan", icon: <Icon.CreditCard />, routeName: "/dashboard/plan" },
  {
    name: "Add Spreadsheet",
    icon: <Icon.PlusSquare />,
    routeName: "/dashboard/add-spreadsheet",
  },
];

export default function DashboardLayout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track client-side mount

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setIsMounted(true); // Mark the component as mounted when client-side rendering occurs
  }, []);

  const drawer = (
    <>
      <Toolbar />
      <List>
        {sidebarData.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link href={item.routeName} className='w-[100%]'>
              <ListItemButton component='span'>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );

  if (!isMounted) {
    return null; // Prevent rendering until after hydration
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuOutlined />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Dashboard2
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label='mailbox folders'
      >
        {/* Drawer for mobile */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Permanent drawer for desktop */}
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
