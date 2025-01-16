import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import {
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { logout } from "../features/userSlice";

const TodoLayout: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch Redux action to logout
    handleMenuClose();
  };

  return (
    <Box>
      {/* Top AppBar */}
      <AppBar position="static">
        <Toolbar>
          {/* App Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>

          {/* User Menu */}
          <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: { mt: 1.5, borderRadius: 2 },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {/* Menu Items */}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default TodoLayout;
