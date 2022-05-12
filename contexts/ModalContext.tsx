import { createContext, useContext, ReactNode, useState } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  setModalState: (modalState: boolean) => void;
};

const initialModalContext: ModalContextType = {
  isModalOpen: false,
  setModalState: () => {},
};

export const ModalContext =
  createContext<ModalContextType>(initialModalContext);

export const useModal = () => {
  return useContext(ModalContext);
};

type Props = {
  children: ReactNode;
};

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [isModalOpen, setModalState] = useState(false);

  return (
    <>
      <ModalContext.Provider
        value={{
          isModalOpen,
          setModalState,
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
};
