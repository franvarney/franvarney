/*
  @desc Submit milliseconds and return formatted minutes and seconds
  @param {Number} time - milliseconds
  @return {String} 'x:xx.xx'
*/
export default function(time) {
  const output = [];

  output.push(Math.floor(time / 60000)); // minutes
  output.push(((time % 60000) / 1000).toFixed(2)); // seconds

  return output.join(':');
}
