const TransformRoomData = (data) => {
  let transformedData = {};
  transformedData.roomCode = data.roomCode;
  transformedData.started = data.started
  transformedData.users = [];
  for (const userId in data.users) {
    transformedData.users.push({id: userId, ...data.users[userId]});
  }
  return transformedData;
};

export default TransformRoomData;
