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
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

// Sidebar data with react-feather icons
const sidebarData = [
  {
    name: "Spreadsheets APIs",
    icon: <Icon.File />,
    routeName: "/dashboard/spreadsheets",
  },
  { name: "Usage", icon: <Icon.BarChart />, routeName: "/dashboard/usage" },
  { name: "Logout", icon: <Icon.LogOut />, routeName: "" },
];

export default function DashboardLayout({ children }: Props) {
  const currentPath = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track client-side mount

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setIsMounted(true); // Mark the component as mounted when client-side rendering occurs
  }, []);

  const drawer = (
    <>
      <Toolbar sx={{ marginTop: "20px" }} />
      <List>
        {sidebarData.map((item) => (
          <ListItem key={item.name} sx={{ marginTop: "10px" }}>
            <Link href={item.routeName} className='w-[100%]'>
              <ListItemButton
                component='span'
                sx={{
                  backgroundColor:
                    currentPath === item.routeName ? "teal" : "transparent",
                  color: currentPath === item.routeName ? "#fff" : "inherit",
                  borderRadius: currentPath === item.routeName ? "8px" : "",
                  "&:hover": {
                    backgroundColor: "teal",
                    borderRadius: "8px",
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px", color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                />
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
          backgroundColor: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "none",
          borderBottom: "1px solid #3333",
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" }, color: "teal" }}
          >
            <MenuOutlined />
          </IconButton>
          <Typography
            sx={{
              textAlign: "center",
              color: "teal",
              fontWeight: "bold",
              fontSize: "18px",
              fontStyle: "oblique",
            }}
          >
            <Link href='/'>Sheetrocket</Link>
          </Typography>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='User avatar' src='' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
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
