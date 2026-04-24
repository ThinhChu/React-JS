import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import _ from "lodash";

const TableQuizs = (props) => {
  const { dataQuizs } = props;

  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Actions</th>
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
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => props.handleDeleteQuiz(item.id)}
                      >
                        Delete
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
