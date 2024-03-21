import React from "react";
import {
  AddCircleOutline,
  HomeOutlined,
  PeopleAltOutlined,
  PersonOutline,
  SettingsOutlined,
} from "@mui/icons-material";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="sidebar-container h-screen">
      <ul className="flex flex-col gap-1 p-1">
        <SidebarItem icon={HomeOutlined} text="Home" to="/app/welcome" />
        <SidebarItem
          icon={AddCircleOutline}
          text="Add Post"
          to="/app/add-post"
        />
        <SidebarItem icon={PersonOutline} text="Profile" to="/app/profile" />
        <SidebarItem
          icon={PeopleAltOutlined}
          text="Friends"
          to="/app/friends"
        />
        <SidebarItem
          icon={SettingsOutlined}
          text="Settings"
          to="/app/settings"
        />
      </ul>
    </div>
  );
};

export default Sidebar;
