import { useState } from "react";
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import ModalUser from "./ModalUser";
import TableUsers from "./TableUsers";

const ManageUsers = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="header-admin">
        <h1>ManageUsers</h1>
        <Button variant="primary" className="ml-2" onClick={handleShow}>
          Thêm mới
        </Button>
        <ModalUser show={show} setShow={setShow} size="xl" />
      </div>

      <div className="body-admin mt-3">
        <TableUsers />
      </div>
    </>
  );
};

export default ManageUsers;
