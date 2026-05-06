import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { IoMdDocument } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { MdFeaturedPlayList } from "react-icons/md";
import React, { useState } from "react";
import "../../../assets/scss/adminPage.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CSidebar = (props) => {
  const { t } = useTranslation();
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
            {t("admin.sidebar.t-dashboard")}
          </MenuItem>
          <SubMenu
            icon={<MdFeaturedPlayList />}
            label={t("admin.sidebar.t-feature")}
          >
            <MenuItem component={<Link to="/admin/manage-users" />}>
              {t("admin.sidebar.t-manage-user")}
            </MenuItem>
            <MenuItem component={<Link to="/admin/manage-quizs" />}>
              {t("admin.sidebar.t-manage-quiz")}
            </MenuItem>
            <MenuItem component={<Link to="/admin/manage-questions" />}>
              {t("admin.sidebar.t-manage-question")}
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
