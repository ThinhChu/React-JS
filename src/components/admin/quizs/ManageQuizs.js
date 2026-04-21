import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postCreateQuiz } from "../../../services/apiQuiz";
import { toast } from "react-toastify";

const ManageQuizs = (props) => {
  const [nameQuiz, setNameQuiz] = useState();
  const [descriptionQuiz, setDescriptionQuiz] = useState();
  const [typeQuiz, setTypeQuiz] = useState();
  const [thumbnailQuiz, setThumbnailQuiz] = useState();

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
          >
            <option>Ouiz type ...</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
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

          <Button variant="primary" onClick={handleSubmitCreateQuiz}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};
export default ManageQuizs;
