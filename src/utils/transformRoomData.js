const transformRoomData = (data) => {
  let transformedData = {};
  transformedData.roomCode = data.roomCode;
  transformedData.stage = data.stage;
  transformedData.mode = data.mode;

  transformedData.users = [];
  for (const userId in data.users) {
    transformedData.users.push({id: userId, ...data.users[userId]});
  }

  transformedData.movieList = [];
  for (const movieKey in data.movieList) {
    transformedData.movieList.push(data.movieList[movieKey]);
  }

  transformedData.responses = [];
  for (const movieId in data.responses) {
    transformedData.responses.push({
      id: movieId,
      approvals: data.responses[movieId].approve,
    });
  }

  if (data.matches) {
    transformedData.match = {
      id: Object.keys(data.matches)[0],
      votes: data.matches[Object.keys(data.matches)].votes,
    };
  }

  return transformedData;
};

export default transformRoomData;
