import React from "react";
import styles from "./Footer.module.css";

interface Props {
  topText: string;
  bottomText: string;
}

const Footer: React.FC<Props> = ({ topText, bottomText }) => {
  return (
    <footer className={styles.container}>
      <p className={styles.text}>{topText}</p>
      <p className={styles.text}>{bottomText}</p>
    </footer>
  );
};

export default Footer;
