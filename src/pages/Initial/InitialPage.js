import {
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  Text,
  Box,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {roomActions} from "../../store/room-slice";
import {appActions} from "../../store/app-slice";
import {useHistory} from "react-router";
import {httpsCallable} from "@firebase/functions";
import {functions} from "../../firebase/firebaseClient";
import LoadingOverlay from "../../components/LoadingOverlay";
import Modal from "../../components/Modal/Modal";

const InitialPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const appUsername = useSelector((state) => state.app.userName);
  const [userName, setUserName] = useState(appUsername || "");
  const [roomOption, setRoomOption] = useState("");
  const createRoom = httpsCallable(functions, "createRoom");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(appActions.SET_USER_NAME(userName));

    if (roomOption === "join") {
      history.push("/join");
    }

    if (roomOption === "host") {
      setLoading(true);
      setError(null);
      createRoom({userName: userName})
        .then((result) => {
          dispatch(roomActions.SET_USER_ID(result.data.userId));
          dispatch(roomActions.SET_ROOM_ID(result.data.roomId));
          history.push(`/room`);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const errorAlert = (
    <Alert status="error" mb="20px">
      <AlertIcon />
      <AlertTitle mr={2}>{error}</AlertTitle>
    </Alert>
  );

  return (
    <>
      {loading && <LoadingOverlay />}
      {error && errorAlert}
      <form onSubmit={submitHandler}>
        <Stack spacing={6}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter your name"
              size="md"
              value={userName}
              onChange={userNameChangeHandler}
            />
          </FormControl>
          <Button
            colorScheme="purple"
            type="submit"
            onClick={() => setRoomOption("join")}
          >
            Join a room
          </Button>
          <Button
            colorScheme="purple"
            type="submit"
            onClick={() => setRoomOption("host")}
          >
            Host a room
          </Button>
          <Text textAlign="center" fontSize="xs">
            Confused?{" "}
            <Box
              as="button"
              textDecor="underline"
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
            >
              Click here
            </Box>{" "}
            for some instructions.
          </Text>
        </Stack>
      </form>
      <Modal open={openModal} closeHandler={setOpenModal}>
        <Box
          bg="white"
          maxW="500px"
          borderRadius="10px"
          overflow="hidden"
          height="max-content"
          w="full"
          p="20px"
        >
          Mindr is here to help you and your friends and your family decide what
          movie you're gonna watch.
          <br />
          <br />
          Here's how it works:
          <br />
          You'll nominate a host to create a room which the rest of you will
          join through the 4 character code which the host will give you.
          <br />
          The host will then choose the room settings while everyone joins.
          <br />
          Once everyone has readied up the host will then be able the start the
          room.
          <br />
          <br />
          Now the tricky stuff is out of the way...
          <br />
          All you need to do from this point on is response to the movies presented
          to you by rejecting it or approving it. This can be done by by swiping left and right or using the buttons.
          <br />
          You can press the 'i' information button to reveal more information
          about the film.
          <br />
          Once a match is found you will all be notified and then its time to
          make the popcorn, turn on your film and enjoy :)
        </Box>
      </Modal>
    </>
  );
};

export default InitialPage;
