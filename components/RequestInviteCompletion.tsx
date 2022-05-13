import { useModal } from "../contexts/ModalContext";
import styles from "./RequestInviteModal.module.css";

const RequestInviteCompletion = () => {
  const { setModalState } = useModal();
  return (
    <div
      id="requestInviteCompletion"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p className={styles.submitButtonText}>All Done</p>
      <p className={styles.secondaryText}>Thank you we will be in touch soon</p>
      <button
        onClick={() => setModalState(false)}
        type="submit"
        style={{ marginTop: 8 }}
        className={styles.submitButton}
      >
        <span className={styles.submitButtonText}>OK</span>
      </button>
    </div>
  );
};

export default RequestInviteCompletion;
