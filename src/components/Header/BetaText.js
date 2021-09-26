import {Box, Text} from "@chakra-ui/react";

const BetaText = () => {
  return (
    <Box
      pos="absolute"
      bottom="2px"
      right="0"
      color="blue.400"
      fontWeight="bold"
      fontSize="sm"
      border="3px solid"
      borderColor="blue.400"
      borderRadius="8px"
      padding="0 5px"
      position="absolute"
      transform="translate(50%, 50%) rotate(-20deg)"
      _after={{
        content: "' '",
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "blue.400",
        opacity: 0.25,
        top: 0,
        left: 0,
      }}
    >
      <Text>BETA</Text>
    </Box>
  );
};

export default BetaText;
