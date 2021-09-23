const canRoomStart = (users, mode) => {
  for (let i = 0; i !== users.length; i++) {
    if (!users[i].ready) {
      return false;
    }
  }
  if (!mode) {
    return false;
  }
  return true;
};

export default canRoomStart;
