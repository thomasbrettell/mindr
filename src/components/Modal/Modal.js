import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';

const Modal = ({ children, open, closeHandler }) => {
  const clickHandler = () => {
    closeHandler(false);
  };

  return (
    <ChakraModal isOpen={open} onOverlayClick={clickHandler} onClose={() => {}}>
      <ModalOverlay onClick={clickHandler} />
      <ModalContent>
        <ModalCloseButton onClick={clickHandler} />
        {children}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
