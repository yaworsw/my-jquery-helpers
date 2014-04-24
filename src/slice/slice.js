//
// Slice
//
// Slice is shorthand for Array.prototype.slice.call
//
var slice = Array.prototype.slice;

module.exports = function(array, begin, end) {
  return slice.call(array, begin, end);
};
