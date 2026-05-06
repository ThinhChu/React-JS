import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const TableQuizs = (props) => {
  const { dataQuizs } = props;
  const { t } = useTranslation();

  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>{t("admin.quiz.t-name")}</th>
            <th>{t("admin.quiz.t-desc")}</th>
            <th>{t("admin.quiz.t-difficulty")}</th>
            <th>{t("admin.user.t-action-table")}</th>
          </tr>
        </thead>
        <tbody>
          {!_.isEmpty(dataQuizs) &&
            dataQuizs.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <div className="d-flex">
                      <Button
                        variant="warning mx-2"
                        onClick={() => props.handleUpdateQuiz(item.id)}
                      >
                        {t("admin.user.t-action-edit-table")}
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => props.handleDeleteQuiz(item.id)}
                      >
                        {t("admin.user.t-action-delete-table")}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}

          {dataQuizs && dataQuizs.length === 0 && (
            <tr>
              <td colSpan={4}>Chưa có nội dung</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};
export default TableQuizs;
