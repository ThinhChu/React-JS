import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { getAllUsers } from "../../../services/apiServiceUser";
import { toast } from "react-toastify";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  // Để các phần tử giao diện chạy hết r mới lấy xuất dữ liệu
  useEffect(() => {
    showAllUsers();
  }, []);
  const showAllUsers = async () => {
    const res = await getAllUsers();
    if (res && res.DT) {
      setListUsers(res.DT);
    }
    if (res.EC !== 0) {
      toast.info(res.EM);
    }
  };
  return (
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
        {listUsers.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <Button variant="primary">Edit</Button>
                <Button variant="danger ml-2">Delete</Button>
              </td>
            </tr>
          );
        })}

        {listUsers && listUsers.length === 0 && (
          <tr>
            <td colSpan={4}>Chưa có nội dung</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
export default TableUsers;
