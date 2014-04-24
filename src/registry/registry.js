//
// Registry
//
// A registry is basically just a key value store.  Each key can have at most
// one value and keys must be strings.
//
var eventize = require('../eventize/eventize');

var Registry = function() {
  this.things = {};
  eventize(this);
};

Registry.prototype.put = function(id, thing) {
  this.things[id] = thing;
  this.trigger('put', id, thing);
};

Registry.prototype.get = function(id) {
  return this.things[id];
};

Registry.prototype.has = function(id) {
  return id in this.things;
};

Registry.prototype.keys = function() {
  return Object.keys(this.things);
};

Registry.prototype.remove = function(id) {
  delete this.things[id];
};

module.exports = Registry;
