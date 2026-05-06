import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ModalUser from "./ModalUser";
import ModalDeleteUser from "./ModalDelete";
// import TableUsers from "./TableUsers";
import TableUsersPaginate from "./TableUserPaginate";
import {
  // getAllUsers,
  getUsersWithPaginate,
} from "../../../services/apiServiceUser";
import { useTranslation } from "react-i18next";

const ManageUsers = (props) => {
  const LIMIT_USER = 3;
  const [pageCount, setPageCount] = useState(1);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [action, setAction] = useState("create");
  const [dataUpdateUser, setDataUpdateUser] = useState([]);
  const { t } = useTranslation();

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
    // showAllUsers();
    showUsersWithPaginate(1);
  }, []);

  useEffect(() => {
    // showAllUsers();
    showUsersWithPaginate(1);
  }, [pageCount]);

  // const showAllUsers = async () => {
  //   const res = await getAllUsers();
  //   if (res && res.DT) {
  //     setListUsers(res.DT);
  //   }
  // };

  const showUsersWithPaginate = async (page) => {
    const res = await getUsersWithPaginate(page, LIMIT_USER);
    if (res && res.DT && res.EC === 0) {
      // setListUsers(res.DT);
      setPageCount(res.DT.totalPages);
      setListUsers(res.DT.users);
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
        <h1>{t("admin.user.title")}</h1>
        <Button
          variant="primary"
          className="ml-2"
          onClick={() => handleShow("create")}
        >
          {t("admin.user.t-button-add")}
        </Button>
        <ModalUser
          show={show}
          size="xl"
          setShow={setShow}
          showAllUsers={showUsersWithPaginate}
          action={action}
          dataUpdate={dataUpdateUser}
          restDataUser={restDataUser}
          pageCurrent={pageCurrent}
          setPageCurrent={setPageCurrent}
        />

        <ModalDeleteUser
          show={showDelete}
          size="xl"
          setShow={setShowDelete}
          dataDelete={dataUpdateUser}
          showAllUsers={showUsersWithPaginate}
          pageCurrent={pageCurrent}
          setPageCurrent={setPageCurrent}
        />
      </div>

      <div className="body-admin mt-3">
        {/* <TableUsers
          listUsers={listUsers}
          viewUser={viewUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
        /> */}

        <TableUsersPaginate
          listUsers={listUsers}
          showUsersWithPaginate={showUsersWithPaginate}
          pageCount={pageCount}
          viewUser={viewUser}
          pageCurrent={pageCurrent}
          setPageCurrent={setPageCurrent}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      </div>
    </>
  );
};

export default ManageUsers;
