import React from "react";
import Image from "next/image";
import styles from "./Content.module.css";
import { useModal } from "../contexts/ModalContext";

interface Props {
  headingOne: string;
  headingTwo: string;
  secondaryText: string;
  inviteButtonText: string;
}

const Content: React.FC<Props> = ({
  headingOne,
  headingTwo,
  secondaryText,
  inviteButtonText
}) => {
  const { setModalState } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.primaryText}>{headingOne}</p>
        <p className={styles.primaryText}>{headingTwo}</p>
        <p className={styles.secondaryText}>{secondaryText}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            setModalState(true);
          }}
          className={styles.inviteButton}
        >
          <span className={styles.inviteButtonText}>{inviteButtonText}</span>
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
