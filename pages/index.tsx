import { useState } from "react";
import { NextPage, GetStaticProps } from "next";
import styles from "../styles/Home.module.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
import RequestInviteModal from "../components/RequestInviteModal";

interface Props {
  heading: string;
  footerTopText: string;
  footerBottomText: string;
}

const Home: NextPage<Props> = ({
  heading,
  footerTopText,
  footerBottomText,
}) => {
  return (
    <>
      <div className={styles.container}>
        <Header heading={heading} />
        <div className={styles.contentContainer}>
          <Content />
        </div>
        <Footer topText={footerTopText} bottomText={footerBottomText} />
      </div>
      <RequestInviteModal />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  // Get this data from crm, for dynamic content changes
  return {
    props: {
      heading: "BROCCOLI & CO",
      footerTopText: "Made With ♥ In Melbourne",
      footerBottomText: "",
    },
  };
};

export default Home;
