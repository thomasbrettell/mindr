import {
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {roomActions} from "../../store/room-slice";
import {appActions} from "../../store/app-slice";
import {useHistory} from "react-router";
import {httpsCallable} from "@firebase/functions";
import {functions} from "../../firebase/firebaseClient";
import LoadingOverlay from "../../components/LoadingOverlay";

const InitialPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const appUsername = useSelector((state) => state.app.userName);
  const [userName, setUserName] = useState(appUsername || "");
  const [roomOption, setRoomOption] = useState("");
  const createRoom = httpsCallable(functions, "createRoom");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        </Stack>
      </form>
    </>
  );
};

export default InitialPage;
