import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ModalUser from "./ModalUser";
import ModalDeleteUser from "./ModalDelete";
import TableUsers from "./TableUsers";
import { getAllUsers } from "../../../services/apiServiceUser";

const ManageUsers = (props) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [action, setAction] = useState("create");
  const [dataUpdateUser, setDataUpdateUser] = useState([]);

  const handleShow = (act) => {
    setShow(true);
    setAction(act);
  };

  // const handleUpdate = () => {
  //   setAction("update");
  //   setShow(true);
  // };

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
    handleShow("update");
    setDataUpdateUser(data);
  };

  // View User
  const viewUser = (data) => {
    handleShow("view");
    setDataUpdateUser(data);
  };

  // View User
  const deleteUser = (data) => {
    setShowDelete(true);
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
        <Button
          variant="primary"
          className="ml-2"
          onClick={() => handleShow("create")}
        >
          Thêm mới
        </Button>
        <ModalUser
          show={show}
          size="xl"
          setShow={setShow}
          showAllUsers={showAllUsers}
          action={action}
          dataUpdate={dataUpdateUser}
          restDataUser={restDataUser}
        />

        <ModalDeleteUser
          show={showDelete}
          size="xl"
          setShow={setShowDelete}
          dataDelete={dataUpdateUser}
          showAllUsers={showAllUsers}
        />
      </div>

      <div className="body-admin mt-3">
        <TableUsers
          listUsers={listUsers}
          updateUser={updateUser}
          viewUser={viewUser}
          deleteUser={deleteUser}
        />
      </div>
    </>
  );
};

export default ManageUsers;
