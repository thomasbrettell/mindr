import { Spinner, Box, Portal } from '@chakra-ui/react';

const LoadingOverlay = () => {
  return (
    <Portal>
      <Box w="100vw" h="100vh" pos="absolute" top='0' left='0' backgroundColor='#f7fafc80'>
        <Spinner
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </Box>
    </Portal>
  );
};

export default LoadingOverlay;
