import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {
  PeopleAltOutlined,
  PersonOutline,
  SettingsOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container h-screen">
      <ul className="flex flex-col gap-1 p-1">
        <li>
          <Link to={"/app/welcome"}>
            <div className="flex items-center gap-2 p-2 hover:bg-blue-400 cursor-pointer">
              <HomeOutlinedIcon style={{ fontSize: 30 }} />
              <h2 className="text-xl ">Home</h2>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/app/add-post"}>
            <div className="flex items-center gap-2 p-2  hover:bg-blue-400 cursor-pointer">
              <AddCircleOutlinedIcon style={{ fontSize: 30 }} />
              <h2 className="text-xl ">Add Post</h2>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/app/profile">
            <div className="flex items-center gap-2 p-2  hover:bg-blue-400 cursor-pointer">
              <PersonOutline style={{ fontSize: 30 }} />
              <h2 className="text-xl ">Profile</h2>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/app/friends">
            <div className="flex items-center gap-2 p-2  hover:bg-blue-400 cursor-pointer">
              <PeopleAltOutlined style={{ fontSize: 30 }} />
              <h2 className="text-xl ">Friends</h2>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/app/settings">
            <div className="flex items-center gap-2 p-2  hover:bg-blue-400 cursor-pointer">
              <SettingsOutlined style={{ fontSize: 30 }} />
              <h2 className="text-xl ">Settings</h2>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
