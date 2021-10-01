import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {database} from "../../firebase/firebaseClient";
import {
  ref,
  onValue,
  onDisconnect,
  goOffline,
  goOnline,
} from "firebase/database";
import {useSelector} from "react-redux";
import transformRoomData from "../../utils/transformRoomData";
import {roomActions} from "../../store/room-slice";
import {useDispatch} from "react-redux";
import WaitingRoom from "../../components/Room/WaitingRoom";
import StartedRoom from "../../components/Room/StartedRoom";
import ResultsRoom from "../../components/Room/ResultsRoom";
import {appActions} from "../../store/app-slice";

const RoomPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.room.userId);
  const roomId = useSelector((state) => state.room.roomId);

  const [roomData, setRoomData] = useState({});
  const [userData, setUserData] = useState({});
  const [roomRef] = useState(ref(database, `rooms/${roomId}`));
  const [userRef] = useState(ref(database, `rooms/${roomId}/users/${userId}`));
  const [loading, setLoading] = useState(true);

  !userId && !roomId && history.replace("/");

  useEffect(() => {
    if (roomRef && userRef) {
      onValue(roomRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const transformedData = transformRoomData(data);
          const user = transformedData.users.find((user) => user.id === userId);
          setUserData(user);
          setRoomData(transformedData);
        } else {
          history.replace("/");
        }
      });
      onDisconnect(userRef).remove();
    }

    return () => {
      setRoomData({});
      goOffline(database);
      goOnline(database);
      dispatch(roomActions.RESET_ROOM());
    };
  }, [history, roomId, userId, dispatch, userRef, roomRef]);

  useEffect(() => {
    if (
      roomData &&
      userData &&
      Object.keys(roomData).length > 0 &&
      Object.keys(userData).length > 0
    ) {
      setLoading(false);
    } else if (!roomData || !userData) {
      history.replace("/");
    }

    return () => {
      setLoading(true);
    };
  }, [roomData, userData, history]);

  useEffect(() => {
    if (roomData.stage) {
      dispatch(appActions.SET_ROOM_STAGE(roomData.stage));
    }
  }, [dispatch, roomData.stage]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (roomData.stage === "started") {
    return (
      <StartedRoom
        roomRef={roomRef}
        roomData={roomData}
        userData={userData}
        userRef={userRef}
      />
    );
  }

  if (roomData.stage === "results") {
    return <ResultsRoom roomData={roomData} />;
  }

  return (
    <WaitingRoom
      roomData={roomData}
      userData={userData}
      roomRef={roomRef}
      userRef={userRef}
      roomCode={roomData.roomCode}
      userId={userId}
    />
  );
};

export default RoomPage;
