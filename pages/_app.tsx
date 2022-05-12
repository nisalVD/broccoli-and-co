import "../styles/globals.css";
import { AppProps } from "next/app";
import { ModalProvider } from "../contexts/ModalContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}

export default MyApp;
