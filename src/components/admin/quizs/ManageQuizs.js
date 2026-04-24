import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getAllQuizForAdmin,
  postCreateQuiz,
  deleteQuizById,
  getQuizById,
  updateQuizById,
  postQuizAssignToUser,
} from "../../../services/apiQuiz";
import { toast } from "react-toastify";
import TableQuizs from "./TableQuizs";
import Accordion from "react-bootstrap/Accordion";
import Select from "react-select";
import _ from "lodash";
import { getAllUsers } from "../../../services/apiServiceUser";

const ManageQuizs = (props) => {
  const [nameQuiz, setNameQuiz] = useState();
  const [descriptionQuiz, setDescriptionQuiz] = useState();
  const [typeQuiz, setTypeQuiz] = useState();
  const [thumbnailQuiz, setThumbnailQuiz] = useState();

  const [dataQuizs, setDataQuizs] = useState([]);
  const [dataQuizById, setDataQuizById] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dataQuizAssign, setDataQuizAssign] = useState([]);
  const [dataUserAssign, setDataUserAssign] = useState([]);

  useEffect(() => {
    fetchAllDataQuizs();
    fetchAllDataUser();
  }, []);

  useEffect(() => {
    setNameQuiz(dataQuizById.name);
    setDescriptionQuiz(dataQuizById.description);
    setTypeQuiz(dataQuizById.difficulty);
  }, [dataQuizById]);

  const fetchAllDataQuizs = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      const dataSelectQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: item.id + " - " + item.name,
        };
      });
      setDataQuizAssign(dataSelectQuiz);
      setDataQuizs(res.DT);
    }
  };

  const fetchAllDataUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      const dataSelectUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: item.id + " - " + item.username,
        };
      });
      setDataUserAssign(dataSelectUser);
    }
  };

  const handleSubmitCreateQuiz = async () => {
    if (nameQuiz === "" || descriptionQuiz === "") {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    let res = await postCreateQuiz(
      nameQuiz,
      descriptionQuiz,
      typeQuiz,
      thumbnailQuiz,
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchAllDataQuizs();
    } else {
      toast.error(res.EM);
    }
  };

  const handleDeleteQuiz = async (id) => {
    let res = await deleteQuizById(id);
    if (res.EC === 0 && res) {
      toast.success(res.EM);
      fetchAllDataQuizs();
    } else {
      toast.error(res.EM);
    }
  };

  const handleUpdateQuiz = async (id) => {
    let res = await getQuizById(id);
    if (res && res.EC === 0) {
      setDataQuizById(res.DT);
      setQuizId(id);
    }
  };

  const handleCloseUpdateQuiz = () => {
    setDataQuizById([]);
  };

  const handleSubmitUpdateQuiz = async () => {
    let res = await updateQuizById(
      quizId,
      nameQuiz,
      descriptionQuiz,
      typeQuiz,
      thumbnailQuiz,
    );
    if (res.EC === 0 && res) {
      toast.success(res.EM);
      setNameQuiz("");
      setDescriptionQuiz("");
      setTypeQuiz("");
      setDataQuizById([]);
      fetchAllDataQuizs();
    } else {
      toast.error(res.EM);
    }
  };

  const handleSubmitQuizAssignToUser = async () => {
    let res = await postQuizAssignToUser(
      selectedQuiz.value,
      selectedUser.value,
    );
    if (res.EC === 0 && res) {
      toast.success(res.EM);
      setSelectedQuiz(null);
      setSelectedUser(null);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="header-admin">
        <h1>Manage Quizs</h1>
      </div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="quiz-container">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name quiz"
                    onChange={(e) => {
                      setNameQuiz(e.target.value);
                    }}
                    defaultValue={nameQuiz}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Content"
                    onChange={(e) => {
                      setDescriptionQuiz(e.target.value);
                    }}
                    defaultValue={descriptionQuiz}
                  />
                </Form.Group>

                <Form.Select
                  aria-label="Default select example"
                  className="mb-3"
                  onChange={(e) => {
                    setTypeQuiz(e.target.value);
                  }}
                  defaultValue={typeQuiz}
                  value={typeQuiz}
                >
                  <option>Ouiz type ...</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </Form.Select>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Thumbnail Quiz</Form.Label>
                  <Form.Control
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      setThumbnailQuiz(e.target.files[0]);
                    }}
                  />
                </Form.Group>
                {!_.isEmpty(dataQuizById) ? (
                  <>
                    <Button variant="primary" onClick={handleSubmitUpdateQuiz}>
                      Update
                    </Button>
                    <Button
                      variant="outline-secondary ml-2"
                      onClick={handleCloseUpdateQuiz}
                    >
                      Close Update
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={handleSubmitCreateQuiz}>
                    Submit
                  </Button>
                )}
              </Form>
            </div>
            <div className="table-quiz-container mt-4">
              <TableQuizs
                dataQuizs={dataQuizs}
                handleDeleteQuiz={(id) => handleDeleteQuiz(id)}
                handleUpdateQuiz={(id) => handleUpdateQuiz(id)}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Assign Quiz to User</Accordion.Header>
          <Accordion.Body>
            <div className="quiz-container">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quiz:</Form.Label>
                  <Select
                    value={selectedQuiz}
                    options={dataQuizAssign}
                    onChange={setSelectedQuiz}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>User:</Form.Label>
                  <Select
                    value={selectedUser}
                    options={dataUserAssign}
                    onChange={setSelectedUser}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={handleSubmitQuizAssignToUser}
                >
                  Assign
                </Button>
              </Form>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
export default ManageQuizs;
