import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServiceUser";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete, setPageCurrent } = props;
  const { t } = useTranslation();
  const handleClose = () => {
    setShow(false);
    // props.restDataUser();
  };
  const handleDeleteUser = async (event) => {
    // Data
    const res = await deleteUser(dataDelete.id);
    if (res.EC !== 0) {
      toast.info(res.EM);
    }
    if (res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      setPageCurrent(1);
      await props.showAllUsers(1);
    }
  };

  return (
    <>
      <Modal show={show} size={props.size} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("admin.user.t-delete-model")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("admin.user.d-delete-model") + " " + dataDelete.email} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.user.t-close")}
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            {t("admin.user.t-confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
