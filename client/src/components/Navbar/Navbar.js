import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logOutUser } from "../../actions/auth";
import { jwtDecode } from "jwt-decode";
import { Avatar, Button, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const dispatch = useDispatch();

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
            <Avatar alt="user" src={user.picture} />
          ) : (
            <Typography variant="subtitle1">{user.name}</Typography>
          )}
          <Button
            variant="contained"
            sx={{ marginLeft: "8px" }}
            onClick={() => dispatch(logOutUser(setUser))}
          >
            Log Out
          </Button>
        </>
      ) : (
        <Link to="/auth">
          <Button variant="contained">Sign In</Button>
        </Link>
      )}
    </Toolbar>
  );
};

export default Navbar;
