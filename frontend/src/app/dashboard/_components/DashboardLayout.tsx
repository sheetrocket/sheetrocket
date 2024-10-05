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
import * as Icon from "react-feather";
import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/app/redux/reduxHooks";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles"; // Import styled utility

const drawerWidth = 240;

// Custom Styled Menu paper
const CustomMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
    border: `1px solid ${theme.palette.divider}`,
    marginTop: "50px",
  },
}));

interface Props {
  children: React.ReactNode;
}

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
  const [isMounted, setIsMounted] = useState(false);

  const currentUser = useAppSelector((state) => state.auth.user);

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
    setIsMounted(true);
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
    return null;
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
            <Tooltip title='Open menu'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='User avatar' src='' className='cusor-pointer' />
              </IconButton>
            </Tooltip>
            <CustomMenu
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
              <Box className='h-[100px] w-[250px]'>
                <Box className='flex py-[5px] mx-[10px]'>
                  <Avatar
                    alt='User avatar'
                    src=''
                    className='cusor-pointer h-[35px] w-[35px]'
                  />
                  <Box className='flex flex-col mx-[10px] px-[15px]'>
                    <Typography sx={{ fontWeight: "600", fontSize: "13px" }}>
                      {currentUser?.name}
                    </Typography>
                    <Typography sx={{ fontWeight: "400", fontSize: "13px" }}>
                      {currentUser?.email}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <MenuItem className='flex items-center py-[5px] mx-[10px]'>
                  <Box className='h-[35px] w-[40px] flex justify-center items-center'>
                    <Icon.LogOut size={20} className='cusor-pointer' />
                  </Box>
                  <Box className='flex flex-col mx-[10px] px-[15px]'>
                    <Typography sx={{ fontWeight: "600", fontSize: "13px" }}>
                      Logout
                    </Typography>
                  </Box>
                </MenuItem>
              </Box>
            </CustomMenu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label='mailbox folders'
      >
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
