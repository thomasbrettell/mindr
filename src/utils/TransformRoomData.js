const transformRoomData = (data) => {
  let transformedData = {};
  transformedData.roomCode = data.roomCode;
  transformedData.started = data.started;
  transformedData.users = [];
  for (const userId in data.users) {
    transformedData.users.push({id: userId, ...data.users[userId]});
  }
  transformedData.movieList = []
  for(const movieKey in data.movieList) {
    transformedData.movieList.push(data.movieList[movieKey])
  }
  return transformedData;
};

export default transformRoomData;
