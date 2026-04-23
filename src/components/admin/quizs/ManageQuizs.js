import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getAllQuizForAdmin,
  postCreateQuiz,
  deleteQuizById,
  getQuizById,
  updateQuizById,
} from "../../../services/apiQuiz";
import { toast } from "react-toastify";
import TableQuizs from "./TableQuizs";
import _ from "lodash";

const ManageQuizs = (props) => {
  const [nameQuiz, setNameQuiz] = useState();
  const [descriptionQuiz, setDescriptionQuiz] = useState();
  const [typeQuiz, setTypeQuiz] = useState();
  const [thumbnailQuiz, setThumbnailQuiz] = useState();

  const [dataQuizs, setDataQuizs] = useState([]);
  const [dataQuizById, setDataQuizById] = useState([]);
  const [quizId, setQuizId] = useState("");

  useEffect(() => {
    fetchAllDataQuizs();
  }, []);

  useEffect(() => {
    setNameQuiz(dataQuizById.name);
    setDescriptionQuiz(dataQuizById.description);
    setTypeQuiz(dataQuizById.difficulty);
  }, [dataQuizById]);

  const fetchAllDataQuizs = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setDataQuizs(res.DT);
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

  return (
    <>
      <div className="header-admin">
        <h1>Manage Quizs</h1>
      </div>
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
    </>
  );
};
export default ManageQuizs;
