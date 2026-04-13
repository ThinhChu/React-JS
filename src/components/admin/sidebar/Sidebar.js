import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { IoMdDocument } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { MdFeaturedPlayList } from "react-icons/md";
import { useState } from "react";
import "../../../assets/scss/adminPage.scss";

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
          <MenuItem icon={<IoMdDocument />}> Dashboard </MenuItem>
          <SubMenu icon={<MdFeaturedPlayList />} label="Tính năng">
            <MenuItem> Quản lý Users </MenuItem>
            <MenuItem> Quản lý bài Quiz </MenuItem>
            <MenuItem> Quản lý câu hỏi </MenuItem>
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
