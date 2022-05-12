import Image from "next/image";
import React from "react";
import styles from "./Header.module.css";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  return (
    <div className={styles.container}>
      <div className={styles.broccoliContainer}>
      <Image
        src="/broccoli-header.svg"
        height={32}
        width={32}
        alt="Broccoli"
      />
      </div>
      <h1 className={styles.heading}>{heading}</h1>
    </div>
  );
};

export default Header;
