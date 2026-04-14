import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const TableUsers = (props) => {
  const { listUsers } = props;

  const handleUpdateUser = (data) => {
    props.updateUser(data);
    // console.log(id);
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
                <Button
                  variant="primary"
                  onClick={() => handleUpdateUser(item)}
                >
                  Edit
                </Button>
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
