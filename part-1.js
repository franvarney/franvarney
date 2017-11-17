const Assert = require('assert');

function split(str, separator) {
  // error checking
  if (typeof str !== 'string') {
    throw new TypeError('`str` must be a string');
  }

  if (typeof separator !== 'string') {
    throw new TypeError('`separator` must be a string');
  }

  if (separator.length < 1) {
    throw new Error('`separator` must have one or more characters');
  }

  // exit early
  if (str.indexOf(separator) < 0) {
    return [str];
  }

  // get indices of separators
  const indices = [];
  let currentIndex = -1;

  while ((currentIndex = str.indexOf(separator, currentIndex + 1)) >= 0) {
    indices.push(currentIndex);
  }

  // split up the string
  const results = [];
  let charIndex = 0;
  let separatorIndex = indices.shift();
  let part = '';

  while (charIndex < str.length) {
    // build up partial string
    if (charIndex !== separatorIndex) {
      part += str[charIndex++];
    }

    // add to results when reaching a separator
    if (charIndex >= separatorIndex) {
      charIndex = separatorIndex + separator.length;
      separatorIndex = indices.shift();
      results.push(part);
      part = '';
    }

    // add to results if there is still a partial string and no more separators
    if (charIndex === str.length) {
      results.push(part);
    }
  }

  return results;
}

Assert.deepEqual(split('Hello everyone here', ' '), ['Hello', 'everyone', 'here']);
Assert.deepEqual(split('abracadabra', 'a'), ['', 'br', 'c', 'd', 'br', '']);
Assert.deepEqual(split('abracadabra', ' '), ['abracadabra']);
Assert.deepEqual(split('abcfunxyz', 'fun'), ['abc', 'xyz']);
Assert.throws(split.bind(null, 123, ''), TypeError);
Assert.throws(split.bind(null, 'abc', 123), TypeError);
Assert.throws(split.bind(null, 'abc', ''), Error);
Assert.deepEqual(split('', ' '), ['']);
