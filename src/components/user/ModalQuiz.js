import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";
const ModalQuiz = (props) => {
  const { show, setShow, dataSubmitQuiz, setShowResult } = props;
  const { t } = useTranslation();
  const handleClose = () => {
    setShow(false);
    // props.restDataUser();
  };

  const handleShowResult = () => {
    setShowResult(true);
    setShow(false);
  };

  return (
    <>
      <Modal show={show} size={props.size} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("quiz.t-title-modal")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            {t("quiz.t-countCorrect")}: <b>{dataSubmitQuiz.countCorrect}</b>
          </span>
          <br />
          <span>
            {t("quiz.t-countTotal")}: <b>{dataSubmitQuiz.countTotal}</b>
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleShowResult}>
            Hiện đáp án
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.user.t-close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalQuiz;
