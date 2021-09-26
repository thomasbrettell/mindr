const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createRoom = functions.https.onCall(async (data, context) => {
  const generateRoomCode = require("./utils/generateRoomCode");
  const userName = data.userName;
  const roomCode = generateRoomCode();

  const newRoomRef = admin.database().ref("rooms").push();
  await newRoomRef.set({roomCode: roomCode});
  const newUserRef = admin
    .database()
    .ref(`rooms/${newRoomRef.key}/users`)
    .push();
  await newUserRef.set({
    name: userName,
    isHost: true,
    ready: true,
  });

  return {
    roomId: newRoomRef.key,
    userId: newUserRef.key,
  };
});



exports.joinRoom = functions.https.onCall(async (data, context) => {
  const roomCode = data.roomCode;
  const userName = data.userName;

  if (!userName || !roomCode) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing roomcode or username",
      {
        message: "Missing roomcode or username",
      }
    );
  }

  const roomsRef = admin.database().ref("rooms");
  let roomId = "";
  await roomsRef
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      for (const key in data) {
        if (data[key].roomCode === roomCode) {
          if(data[key].started === true) {
            roomId = 'started'
            return
          }
          roomId = key;
          return;
        }
      }
    })
    .catch((error) => {
      throw new functions.https.HttpsError(error);
    });

  if (!roomId) {
    throw new functions.https.HttpsError(
      "not-found",
      "No room associated with that code was found.",
      {message: "No room associated with that code was found."}
    );
  }

  if(roomId === 'started') {
    throw new functions.https.HttpsError(
      "permission-denied",
      "This room has already started",
      {message: "This room has already started"}
    );
  }

  const newUserRef = roomsRef.child(roomId).child("users").push();
  await newUserRef
    .set({
      name: userName,
      isHost: false,
      ready: false,
    })
    .catch((error) => {
      throw new functions.https.HttpsError(error);
    });

  return {
    roomId: roomId,
    userId: newUserRef.key,
  };
});
