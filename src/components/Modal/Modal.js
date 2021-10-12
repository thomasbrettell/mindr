import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

const Modal = ({children, open, closeHandler}) => {
  const clickHandler = () => {
    closeHandler(false);
  };

  return (
    <ChakraModal isOpen={open} onOverlayClick={clickHandler}>
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </ChakraModal>
  );
};

export default Modal;
