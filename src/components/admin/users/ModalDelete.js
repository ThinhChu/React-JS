import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteUser } from "../../../services/apiServiceUser";
const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete, setPageCurrent } = props;
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
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete user has this email: {dataDelete.email} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalDeleteUser;
