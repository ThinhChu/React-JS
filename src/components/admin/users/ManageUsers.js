import { useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import ModalUser from "./ModalUser";

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
        <ModalUser show={show} size="xl" onHide={() => setShow(false)} />
      </div>

      <div className="body-admin mt-3">
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Thinhcq</td>
              <td>chuquangthinh34@gmail.com</td>
              <td>Admin</td>
              <td>
                <Button variant="primary">Edit</Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ManageUsers;
