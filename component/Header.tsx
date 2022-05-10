import React from "react";
import styles from "./Header.module.css";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{heading}</h1>
    </div>
  );
};

export default Header;
