//
// Eventize
//
// Eventize is a decorator to make a given object be able to trigger events.
//
var slice = require('../slice/slice');

var on = function(event, cb) {
  if (this[event] === undefined) {
    this[event] = $.Callbacks();
  }
  this[event].add(cb);
};

var off = function(event) {
  delete this[event];
};

var trigger = function(event) {
  if (this[event]) {
    var args = slice(arguments, 1);
    this[event].fire.apply(this[event], args);
  }
};

module.exports = function(obj) {

  var callbacks = {};

  obj.on      = on.bind(callbacks);
  obj.off     = off.bind(callbacks);
  obj.trigger = trigger.bind(callbacks);

  return obj;

};
