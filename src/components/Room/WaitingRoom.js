import {
  Button,
  useClipboard,
  VStack,
  Grid,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import StartButton from "../../components/Room/StartButton";
import ReadyButton from "../../components/Room/ReadyButton";
import UserTableUser from "../../components/Room/UserTableUser";
import canRoomStart from "../../utils/canRoomStart";

const WaitingRoom = (props) => {
  const {userData, roomData, roomCode, userId, userRef, roomRef} = props;
  const {hasCopied, onCopy} = useClipboard(roomCode);
  const [copyContent, setCopyContent] = useState("COPY");

  useEffect(() => {
    if (hasCopied) {
      setCopyContent("COPIED");
    } else {
      setCopyContent("COPY");
    }
  }, [hasCopied]);

  return (
    <VStack spacing={6}>
      <Box
        d="flex"
        justifyContent="space-between"
        w="full"
        p="2"
        boxShadow="xs"
        rounded="md"
        bg="white"
        justifyItems="center"
      >
        <Box fontSize={20} fontWeight={"bold"}>
          {roomData.roomCode}
        </Box>
        <Button h="1.75rem" size="sm" color="gray.600" onClick={onCopy}>
          {copyContent}
        </Button>
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
        <Box
          boxShadow="base"
          p="6"
          rounded="md"
          w="100%"
          bgGradient="linear(to-r, cyan.300, cyan.500)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          cursor="pointer"
        >
          Top rated films
        </Box>
        <Box
          display="flex"
          boxShadow="base"
          p="6"
          rounded="md"
          w="100%"
          bgGradient="linear(to-r, purple.300, purple.500)"
          alignItems="center"
          justifyContent="center"
          color="white"
          cursor="pointer"
        >
          Popular films
        </Box>
      </Grid>
      <Box w="full" boxShadow="xs" p="2" rounded="md" backgroundColor="gray.50">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Ready status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {roomData.users &&
              roomData.users.map((user) => (
                <UserTableUser
                  key={user.id}
                  name={user.name}
                  isHost={user.isHost}
                  isReady={user.ready}
                  isYou={userId === user.id}
                />
              ))}
          </Tbody>
        </Table>
      </Box>
      {userData.isHost && (
        <StartButton
          canStart={canRoomStart(roomData.users)}
          roomRef={roomRef}
        />
      )}
      {!userData.isHost && (
        <ReadyButton userRef={userRef} isReady={userData.ready} />
      )}
    </VStack>
  );
};

export default WaitingRoom;
