const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createRoom = functions.https.onCall(async (data, context) => {
  const generateRoomCode = require("./utils/generateRoomCode");
  const userName = data.userName;
  const roomCode = generateRoomCode();

  const newRoomRef = admin.database().ref("rooms").push();
  await newRoomRef.set({roomCode: roomCode, stage: "waiting"});
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
          if (data[key].started === true || data[key] === "complete") {
            roomId = "started";
            return;
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

  if (roomId === "started") {
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

exports.calculateIfMatch = functions.database
  .ref("/rooms/{roomId}/responses/{id}")
  .onWrite(async (snapshot, context) => {
    const roomId = context.params.roomId;
    const responseId = context.params.id;
    const approvalCount = snapshot.after.val().approve;
    let usersAmount = 0;

    const roomRef = admin.database().ref(`rooms/${roomId}/`);

    await roomRef.get().then((snapshot) => {
      const users = snapshot.val().users;
      usersAmount = Object.keys(users).length;
    });

    if (approvalCount === usersAmount) {
      roomRef.child(`matches/${responseId}`).update({
        votes: 0,
      });
    }

    return;
  });

exports.shouldShowResults = functions.database
  .ref("/rooms/{roomId}/users/{userId}/continue")
  .onWrite(async (snapshot, context) => {
    const roomId = context.params.roomId;
    const roomRef = admin.database().ref(`rooms/${roomId}/`);
    let continueCount = 0;
    let usersAmount = 0;

    await roomRef.get().then((snapshot) => {
      const users = snapshot.val().users;
      usersAmount = Object.keys(users).length;
      for (const userId in users) {
        if (users[userId].continue) {
          continueCount++;
        }
      }
    });

    if (continueCount === usersAmount) {
      roomRef.update({
        stage: "results",
      });
    }
  });
