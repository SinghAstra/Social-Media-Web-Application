import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logOut } from "../../actions/auth";
import { jwtDecode } from "jwt-decode";

/**
 * The Navbar component represents the application's navigation bar,
 * providing access to key features such as user authentication and profile actions.
 */

const Navbar = () => {
  // Current location object from React Router
  const location = useLocation();

  // State to manage user data
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Redux dispatch function
  const dispatch = useDispatch();

  // Effect to check and handle user token expiration
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logOut(setUser));
      }
    }
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [dispatch, location, user?.token]);

  // Main rendering logic for the Navbar component
  return (
    <div className="bg-black text-white flex justify-between items-center py-3 px-5">
      <h1 className="text-2xl">Social Media Application</h1>
      {user ? (
        <div className="w-10 h-10 rounded-full cursor-pointer shadow-lg bg-white text-black flex items-center justify-center font-extrabold text-2xl border border-white">
          <Link to="/profile">{user.name[0]}</Link>
        </div>
      ) : (
        <button className="bg-transparent py-2 px-4 rounded-md border-white border hover:text-black hover:bg-white hover:font-bold">
          <Link to={"/auth"}>Sign In </Link>
        </button>
      )}
    </div>
  );
};

export default Navbar;
