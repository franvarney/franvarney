/*
  @desc Submit milliseconds and return formatted minutes and seconds
  @param {Number} time - milliseconds
  @return {String} 'x:xx.xx'
*/
export default function(time) {
  const output = [];

  output.push(Math.floor(time / 60000)); // minutes
  const seconds = ((time % 60000) / 1000).toFixed(2);
  output.push(seconds < 10 ? `0${seconds}` : seconds); // seconds

  return output.join(':');
}
