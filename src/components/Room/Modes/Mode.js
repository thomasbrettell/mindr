import {Box} from "@chakra-ui/react";
import {update} from "@firebase/database";

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
      onClick={isHost ? selectHandler : ""}
      pos="relative"
    >
      {name}
      {selected && (
        <Box
          pos="absolute"
          w="100%"
          h="100%"
          transform="scaleX(1.075) scaleY(1.2)"
          border="4px solid"
          borderColor={`${color}.300`}
          borderRadius="11px"
        />
      )}
    </Box>
  );
};

export default Mode;
