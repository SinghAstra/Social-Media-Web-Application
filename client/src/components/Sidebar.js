import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {
  PeopleAltOutlined,
  PersonOutline,
  PersonOutlineTwoTone,
  SettingsOutlined,
} from "@mui/icons-material";

const Sidebar = () => {
  return (
    <div className="sidebar-container h-screen">
      <ul className="flex flex-col gap-1 p-1">
        <li>
          <div className="flex items-center gap-2 p-2 hover:bg-blue-400 cursor-pointer">
            <HomeOutlinedIcon style={{ fontSize: 30 }} />
            <h2 className="text-xl ">Home</h2>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-2 p-2  hover:bg-blue-400 cursor-pointer">
            <AddCircleOutlinedIcon style={{ fontSize: 30 }} />
            <h2 className="text-xl ">Add Post</h2>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-2 p-2  hover:bg-blue-400 cursor-pointer">
            <PersonOutline style={{ fontSize: 30 }} />
            <h2 className="text-xl ">Profile</h2>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-2 p-2  hover:bg-blue-400 cursor-pointer">
            <PeopleAltOutlined style={{ fontSize: 30 }} />
            <h2 className="text-xl ">Friends</h2>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-2 p-2  hover:bg-blue-400 cursor-pointer">
            <SettingsOutlined style={{ fontSize: 30 }} />
            <h2 className="text-xl ">Settings</h2>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
