import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBeer } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";


const cSidebar = (props) => {
  return (
    <Sidebar>
      <Menu>
        <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem icon={<IoMdDocument />}> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default cSidebar;
