import { Outlet } from "react-router-dom";
import "./App.scss";
import Headers from "./components/header/Header";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Headers />
      </div>
      <div className="main-container">
        <div className="sidebar-container">
          
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
