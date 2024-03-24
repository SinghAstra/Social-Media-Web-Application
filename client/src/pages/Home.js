import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
