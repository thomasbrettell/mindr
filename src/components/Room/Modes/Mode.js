import {Box} from "@chakra-ui/react";
import {update} from "@firebase/database";
import {motion} from "framer-motion";

const Mode = (props) => {
  const {name, value, color, selected, isHost, roomRef} = props;

  const selectHandler = () => {
    update(roomRef, {
      mode: value,
    });
  };

  return (
    <Box
      display="flex"
      boxShadow="base"
      p="6"
      rounded="md"
      w="100%"
      bgGradient={`linear(to-r, ${color}.300, ${color}.500)`}
      alignItems="center"
      justifyContent="center"
      color="white"
      cursor="pointer"
      as="button"
      onClick={isHost ? selectHandler : undefined}
      pos="relative"
    >
      {name}
      {selected && (
        <Box
          as={motion.div}
          pos="absolute"
          w="calc(100% + 14px);"
          h="calc(100% + 14px);"
          border="4px solid"
          borderColor={`${color}.300`}
          borderRadius="11px"
          initial={false}
          animate={{
            borderColor: `${color}.300`,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 30,
            },
          }}
          layoutId="outline"
        />
      )}
    </Box>
  );
};

export default Mode;
