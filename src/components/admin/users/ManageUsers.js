import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ModalUser from "./ModalUser";
import TableUsers from "./TableUsers";
import { getAllUsers } from "../../../services/apiServiceUser";

const ManageUsers = (props) => {
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [dataUpdateUser, setDataUpdateUser] = useState([]);

  const handleShow = () => {
    setShow(true);
    setUpdate(false);
  };
  const handleUpdate = () => {
    setUpdate(true);
    setShow(true);
  };
  const [listUsers, setListUsers] = useState([]);
  // Get users
  // Để các phần tử giao diện chạy hết r mới lấy xuất dữ liệu
  useEffect(() => {
    showAllUsers();
  }, []);
  const showAllUsers = async () => {
    const res = await getAllUsers();
    if (res && res.DT) {
      setListUsers(res.DT);
    }
  };

  // Update User
  const updateUser = (data) => {
    handleUpdate();
    setDataUpdateUser(data);
  };

  // Reset data update user
  const restDataUser = () => {
    setDataUpdateUser([]);
  };

  return (
    <>
      <div className="header-admin">
        <h1>ManageUsers</h1>
        <Button variant="primary" className="ml-2" onClick={handleShow}>
          Thêm mới
        </Button>
        <ModalUser
          show={show}
          setShow={setShow}
          showAllUsers={showAllUsers}
          size="xl"
          update={update}
          dataUpdate={dataUpdateUser}
          restDataUser={restDataUser}
        />
      </div>

      <div className="body-admin mt-3">
        <TableUsers listUsers={listUsers} updateUser={updateUser} />
      </div>
    </>
  );
};

export default ManageUsers;
