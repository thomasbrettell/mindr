import {Box, Text} from "@chakra-ui/react";
import {motion} from "framer-motion";

const ApproveText = () => {
  return (
    <Box
      pos="absolute"
      top="15px"
      left="15px"
      color="green.400"
      fontWeight="bold"
      fontSize="2xl"
      border="5px solid"
      borderColor="green.400"
      borderRadius="10px"
      padding="2px 10px"
      position="absolute"
      zIndex="3"
      _after={{
        content: "' '",
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "green.400",
        opacity: 0.25,
        top: 0,
        left: 0,
      }}
      as={motion.div}
      initial={{opacity: 0, transition: {duration: 0.2}}}
      animate={{opacity: 1, transition: {duration: 0.2}}}
      exit={{opacity: 0, transition: {duration: 0.2}}}
    >
      <Text>APPROVE</Text>
    </Box>
  );
};

export default ApproveText;
