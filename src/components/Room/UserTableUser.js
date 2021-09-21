import {Tr, Td, Box} from "@chakra-ui/react";
import {RiVipCrown2Fill} from "react-icons/ri";

const UserTableUser = (props) => {
  const {name, isHost, isReady, isYou} = props;

  return (
    <Tr>
      <Td>
        <Box d="inline-flex" alignItems="center">
          {isHost && (
            <Box d="inline-block" mr="5px">
              <RiVipCrown2Fill />
            </Box>
          )}
          {name} {isYou ? "(You)" : ""}
        </Box>
      </Td>
      {isReady && <Td color="green">Ready</Td>}
      {!isReady && <Td color="red">Not ready</Td>}
    </Tr>
  );
};

export default UserTableUser;
