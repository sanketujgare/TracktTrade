import { Link } from "react-router-dom";
import styles from "./Modal.module.scss";
import { ModalProps } from "./Modal.types.ts";

const Modal = ({ children, handleDelete, setModal }: ModalProps) => {
  return (
    <div className={styles.OuterModalContainer}>
      <div className={styles.InnerContainer}>
        <div className={styles.Content}>
          {/* <span>Confirm</span> */}
          {/* <div className={styles.ModalButtons}>
            <Link to="/admin/allcustomers">
              <button onClick={handleDelete}>Delete</button>
            </Link>
            <button onClick={() => setModal(false)}>Close</button>
          </div> */}
          {/* <Component /> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
