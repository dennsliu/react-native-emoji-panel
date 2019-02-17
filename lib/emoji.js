const emojiMap = require('./emojiMap.js');

const Emoji = {
  map: emojiMap
};

/**
 * get emoji code from name
 * @param  {string} name
 * @return {string}
 */
Emoji.get = (name) => {
  const got = Emoji.map.get(name);

  if (got) {
    return got;
  }
  return '';
};

module.exports = Emoji;
