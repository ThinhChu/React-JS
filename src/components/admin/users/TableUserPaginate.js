import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import __ from "lodash";

const TableUsersPaginate = (props) => {
  const { listUsers, pageCount } = props;
  const handleUpdateUser = (data) => {
    props.updateUser(data);
    // console.log(id);
  };

  const handleViewUser = (data) => {
    props.viewUser(data);
    // console.log(id);
  };

  const handleDeleteUser = (data) => {
    props.deleteUser(data);
  };

  const handlePageClick = (event) => {
    props.showUsersWithPaginate(+event.selected + 1);
    // console.log(event.selected);
  };

  return (
    <>
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
          {!__.isEmpty(listUsers) &&
            listUsers.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleViewUser(item)}
                    >
                      View
                    </Button>

                    <Button
                      variant="warning mx-2"
                      onClick={() => handleUpdateUser(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </Button>
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

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
export default TableUsersPaginate;
