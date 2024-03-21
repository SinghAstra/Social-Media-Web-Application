import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black text-white flex justify-between items-center p-4 shadow-xl">
      <div>
        <Link to={"/"}>
          <h1 className="text-blue-400 text-2xl">
            Social Media Web Application
          </h1>
        </Link>
      </div>
      <div className="flex gap-2">
        <Link
          to={"/log-in"}
          className="bg-transparent hover:bg-blue-400 border border-blue-400 text-white hover:text-black font-bold py-2 px-3 rounded"
        >
          Log In
        </Link>
        <Link
          to={"/sign-up"}
          className="bg-transparent hover:bg-blue-400 border border-blue-400 text-white hover:text-black font-bold py-2 px-3 rounded"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
