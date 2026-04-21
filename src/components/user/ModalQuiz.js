import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { toast } from "react-toastify";
const ModalQuiz = (props) => {
  const { show, setShow, dataSubmitQuiz } = props;
  const handleClose = () => {
    setShow(false);
    // props.restDataUser();
  };

  return (
    <>
      <Modal show={show} size={props.size} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kết quả Quiz của bạn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            countCorrect: <b>{dataSubmitQuiz.countCorrect}</b>
          </span>
          <br />
          <span>
            countTotal: <b>{dataSubmitQuiz.countTotal}</b>
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalQuiz;
