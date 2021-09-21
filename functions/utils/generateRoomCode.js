const generateRoomCode = () => {
  const length = 4;
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (var i = 0; i < length; i++) {
    code += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return code;
};

module.exports = generateRoomCode;