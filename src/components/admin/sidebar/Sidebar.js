import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { IoMdDocument } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { MdFeaturedPlayList } from "react-icons/md";
import React, { useState } from "react";
import "../../../assets/scss/adminPage.scss";
import { Link } from "react-router-dom";

const CSidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sidebar collapsed={collapsed}>
      {/* HEADER */}
      <div style={{ padding: "20px", fontWeight: "bold", textAlign: "center" }}>
        <button onClick={() => setCollapsed(!collapsed)} className="btn">
          <IoMenu />
        </button>
        <div className="logoAdmin">{!collapsed ? "Học REACT" : "R"}</div>
      </div>

      {/* CONTENT / MENU (Phần này sẽ tự giãn ra) */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Menu>
          <MenuItem icon={<IoMdDocument />} component={<Link to="/admin" />}>
            Dashboard
          </MenuItem>
          <SubMenu icon={<MdFeaturedPlayList />} label="Tính năng">
            <MenuItem component={<Link to="/admin/manage-users" />}>
              Quản lý Users
            </MenuItem>
            <MenuItem component={<Link to="/admin/manage-quizs" />}>
              Quản lý bài Quiz
            </MenuItem>
            <MenuItem component={<Link to="/admin/manage-questions" />}>
              Quản lý câu hỏi (Questions)
            </MenuItem>
          </SubMenu>
        </Menu>
      </div>
      {/* FOOTER */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        {collapsed ? "V1" : "Version 1.0.0"}
      </div>
    </Sidebar>
  );
};

export default CSidebar;
