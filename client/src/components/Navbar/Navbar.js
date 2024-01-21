import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logOutUser } from "../../actions/auth";
import { jwtDecode } from "jwt-decode";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

/**
 * The Navbar component represents the application's navigation bar,
 * providing access to key features such as user authentication and profile actions.
 */

const Navbar = () => {
  // Current location object from React Router
  const location = useLocation();

  // State to manage user data
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // State to manage anchor element for the user popover
  const [anchorEl, setAnchorEl] = useState(null);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Event handler for opening the user popover
  const handleUserPopOver = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // Event handler for closing the user popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Boolean value indicating whether the user popover is open
  const open = Boolean(anchorEl);

  // Function to render the avatar or sign-in button based on user authentication status
  const renderAvatar = () => {
    if (user) {
      return (
        <Avatar
          alt="user"
          sx={{ cursor: "pointer", backgroundColor: "red" }}
          onClick={handleUserPopOver}
        >
          {user.name[0]}
        </Avatar>
      );
    } else {
      return (
        <Link to="/auth">
          <Button variant="outlined">Sign In</Button>
        </Link>
      );
    }
  };

  // Effect to check and handle user token expiration
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logOutUser(setUser));
      }
    }
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [dispatch, location, user?.token]);

  // Main rendering logic for the Navbar component
  return (
    <Toolbar
      sx={{
        margin: "8px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" sx={{ flex: 1 }} component={Link} to={"/posts"}>
        Social Media Application
      </Typography>
      {renderAvatar()}
      {/* User popover menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logOutUser(setUser));
            handleClose();
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default Navbar;
