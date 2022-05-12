import React from "react";
import Image from "next/image";
import styles from "./Content.module.css";
import { useModal } from "../contexts/ModalContext";

const Content: React.FC = () => {
  const { setModalState } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.primaryText}>A BETTER WAY TO</p>
        <p className={styles.primaryText}>ENJOY EVERY DAY</p>
        <p className={styles.secondaryText}>Be first to know when we launch.</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            setModalState(true);
          }}
          className={styles.inviteButton}
        >
          <span className={styles.inviteButtonText}>Request An Invite</span>
        </button>
      </div>
      <div className={styles.broccoliContainer}>
        <Image
          src="/cute-broccoli.png"
          height={400}
          width={400}
          alt="Cute Broccoli"
        />
      </div>
    </div>
  );
};

export default Content;
