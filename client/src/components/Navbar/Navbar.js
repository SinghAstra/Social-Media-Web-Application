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

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleUserPopOver = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
  return (
    <Toolbar
      sx={{
        margin: "8px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" sx={{ flex: 1 }}>
        Social Media Application
      </Typography>
      {user ? (
        <>
          {user.picture ? (
            <Avatar alt="user" src={user.picture} onClick={handleUserPopOver} />
          ) : (
            <Avatar
              alt="user"
              sx={{ backgroundColor: "red", cursor: "pointer" }}
              onClick={handleUserPopOver}
            >
              {user.name[0]}
            </Avatar>
          )}
        </>
      ) : (
        <Link to="/auth">
          <Button variant="outlined">Sign In</Button>
        </Link>
      )}
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
