const base64 = require('./base64');

const random = {};

random.integer = function (min, max) {
  if (arguments.length < 2) {
    return random.integer(0, ...arguments);
  }
  const betweenZeroAndOne = Math.random();
  const betweenMinAndMax = min + betweenZeroAndOne * (max - min + 1);
  return Math.floor(betweenMinAndMax);
};

const charSet = base64._charSet;
random.base64 = function (length) {
  let str = '';
  while (length--) {
    const charIdx = random.integer(0, 63);
    str += charSet[charIdx];
  };
  return str;
};

module.exports = random;
