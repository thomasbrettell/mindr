const canRoomStart = (users) => {
  for (let i = 0; i !== users.length; i++) {
    if (!users[i].ready) {
      return false;
    }
  }
  return true;
};

export default canRoomStart;
