import {
  Button,
  useClipboard,
  VStack,
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
import ModeSelection from "./ModeSelection";

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
      <ModeSelection
        roomRef={roomRef}
        mode={roomData.mode || ""}
        isHost={userData.isHost}
      />
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
          canStart={canRoomStart(roomData.users, roomData.mode)}
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
