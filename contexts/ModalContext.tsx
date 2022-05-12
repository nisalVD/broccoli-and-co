import { createContext, useContext, ReactNode, useState } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  setModalOpen: (modalState: boolean) => void;
};

const initialModalContext: ModalContextType = {
  isModalOpen: false,
  setModalOpen: () => {},
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
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ModalContext.Provider
        value={{
          isModalOpen,
          setModalOpen,
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
};
