import {
  Box,
  Button,
  HStack,
  PinInput,
  PinInputField,
  Flex,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import RightArrowIcon from "../../assets/RightArrowIcon";
import {Link} from "react-router-dom";
import {httpsCallable} from "@firebase/functions";
import {functions} from "../../firebase/firebaseClient";
import {useHistory} from "react-router";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import { roomActions } from "../../store/room-slice";

const JoinPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const joinRoom = httpsCallable(functions, "joinRoom");
  const userName = useSelector((state) => state.app.userName);

  const codeChangeHandler = (e) => {
    setRoomCode(e.toUpperCase());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError();
    setLoading(true);

    joinRoom({roomCode: roomCode, userName: userName})
      .then((result) => {
        dispatch(roomActions.SET_USER_ID(result.data.userId));
        dispatch(roomActions.SET_ROOM_ID(result.data.roomId))
        history.push(`/room`);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const errorAlert = (
    <Alert status="error" mt="20px">
      <AlertIcon />
      <AlertTitle mr={2}>{error}</AlertTitle>
    </Alert>
  );

  return (
    <Box onSubmit={submitHandler} as="form" pos="relative">
      <Box mb="10px">
        <Button size="xs" as={Link} to="/">
          Back
        </Button>
      </Box>
      <VStack spacing={6}>
        {error && errorAlert}
        <Box>
          <Text>Enter your rooms code.</Text>
          <Text>If you don't know it, try asking the host.</Text>
        </Box>
        <Flex justifyContent="center">
          <HStack>
            <PinInput
              type="alphanumeric"
              size="lg"
              value={roomCode}
              onChange={codeChangeHandler}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
            <Button
              colorScheme="purple"
              disabled={roomCode.length !== 4}
              type="submit"
              isLoading={loading}
            >
              <Box h="24px" w="24px">
                <RightArrowIcon />
              </Box>
            </Button>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default JoinPage;
