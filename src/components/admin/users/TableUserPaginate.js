import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import __ from "lodash";
import { useTranslation } from "react-i18next";

const TableUsersPaginate = (props) => {
  const { t } = useTranslation();
  const { listUsers, pageCount, pageCurrent, setPageCurrent } = props;
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
    setPageCurrent(+event.selected + 1);
    // console.log(event.selected);
  };

  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>{t("admin.user.t-user-table")}</th>
            <th>Email</th>
            <th>{t("admin.user.t-role-table")}</th>
            <th>{t("admin.user.t-action-table")}</th>
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
                      {t("admin.user.t-action-view-table")}
                    </Button>

                    <Button
                      variant="warning mx-2"
                      onClick={() => handleUpdateUser(item)}
                    >
                      {t("admin.user.t-action-edit-table")}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      {t("admin.user.t-action-delete-table")}
                    </Button>
                  </td>
                </tr>
              );
            })}

          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={4}>{t("admin.user.t-not-table")}</td>
            </tr>
          )}
        </tbody>
      </Table>

      <ReactPaginate
        nextLabel={t("admin.user.t-next-table")}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={t("admin.user.t-prev-table")}
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
        forcePage={+pageCurrent - 1}
      />
    </>
  );
};
export default TableUsersPaginate;
