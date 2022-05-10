import type { NextPage, GetStaticProps  } from "next";
import Header from "../component/Header";
import Footer from "../component/Footer";

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
    <div>
      <Header heading={heading} />
      <main>
        Brocolli
      </main>
      <Footer
        topText={footerTopText}
        bottomText={footerBottomText}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  // Get this data from crm, for dynamic content changes
  return {
    props: {
      heading: "BROCCOLI & CO",
      footerTopText: "Made With ♥ In Melbourne",
      footerBottomText: "2016. All Right Reserved",
    },
  };
};

export default Home;
