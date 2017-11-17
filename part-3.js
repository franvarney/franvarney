const Assert = require('assert');

function getQuoteIndices(str, wrapper='"') {
  const indices = [];
  let left = -1;
  let right = -1;

  for (let i = 0; i < str.length; ++i) {
    if (str[i] === wrapper) {
      if (left < 0) left = i;
      else right = i;
    }

    if (right - left === 1) {
      right = -1;
    }

    if (left >= 0 && right >= 0) {
      indices.push(left);
      indices.push(right);
      left = -1;
      right = -1;
    }
  }

  return indices;
}

function getSeparatorIndices(str, separator) {
  const indices = [];
  let currentIndex = -1;

  while ((currentIndex = str.indexOf(separator, currentIndex + 1)) >= 0) {
    indices.push(currentIndex);
  }

  return indices;
}

function filterAndMerge(quoteIndices, separatorIndices) {
  let indices = [];
  let i = 0;
  let j = 0;

  while (i + j < quoteIndices.length + separatorIndices.length) {
    if (i >= quoteIndices.length) {
      indices.push(separatorIndices[j++]);
    } else {
      if (separatorIndices[j] > quoteIndices[i] &&
          separatorIndices[j] < quoteIndices[i + 1]) {
        ++j;
      } else {
        indices.push(quoteIndices[i++]); // left quote
        indices.push(quoteIndices[i++]); // right quote
        indices.push(separatorIndices[j++]);
      }
    }
  }

  return indices;
}

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

  // get indices of quotes
  const quoteIndices = getQuoteIndices(str);

  // get indices of separators
  const separatorIndices = getSeparatorIndices(str, separator);

  // filter separatorIndices and merge
  let indices = separatorIndices;

  if (quoteIndices.length) {
    indices = filterAndMerge(quoteIndices, separatorIndices);
  }

  // split up the string
  const results = [];
  let charIndex = 0;
  let separatorIndex = indices.shift();
  let part = '';

  while (charIndex < str.length) {
    // build up partial string
    if (charIndex !== separatorIndex) {
      let char = str[charIndex++];
      if (char + str[charIndex] === '""') {
        // collapse quote
        part += '"';
        ++charIndex;
      } else {
        part += char;
      }
    }

    // add to results when reaching a separator
    if (charIndex >= separatorIndex) {
      if (str[separatorIndex] === '"') {
        charIndex = separatorIndex + 1;
      } else {
        charIndex = separatorIndex + separator.length;
        results.push(part);
        part = '';
      }

      separatorIndex = indices.shift();
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
Assert.deepEqual(split('Name,Age,Role', ','), ['Name', 'Age', 'Role']);
Assert.deepEqual(split('"Gates, Bill",60,Chairman', ','), ['Gates, Bill', '60', 'Chairman']);
Assert.deepEqual(split('"Ballmer, Steve",60,CEO', ','), ['Ballmer, Steve', '60', 'CEO']);
Assert.deepEqual(split('"Ballmer, Steve, Jobs",60,CEO', ','), ['Ballmer, Steve, Jobs', '60', 'CEO']);
Assert.deepEqual(split('"Ballmer, Steve",6""0,CEO', ','), ['Ballmer, Steve', '6"0', 'CEO']);
Assert.deepEqual(split('"Ballmer, Steve",6""""0,CEO', ','), ['Ballmer, Steve', '6""0', 'CEO']);
