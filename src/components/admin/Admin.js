import Sidebar from "./sidebar/Sidebar"

const Admin = (props) => {
  return (
    <div className="admin-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div>Admin component</div>
    </div>
  );
};

export default Admin;
