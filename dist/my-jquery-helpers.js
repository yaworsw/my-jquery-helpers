(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//
// Add Default to Registry
//
// Given either a registry class or an instance of a registry extend the
// registry to return whatever is set as 'default' when get is called without an
// argument.
//
var Registry = require('../registry/registry');
var slice    = require('../slice/slice');

module.exports = function(registry) {

  if (registry instanceof Registry) {

    // If we're given an instance of a Registry then all we need to do is to
    // overwrite it's get method.

    var oldGet = registry.get;

    registry.get = function(id) {
      if (id === undefined) {
        id = 'default';
      }
      return oldGet.call(this, id);
    };

    return registry;

  } else {

    // If we're given a Registry class then we need to create a subclass of the
    // given class with a new get method.

    var RegistryWithDefault = function() {
      registry.apply(this, slice(arguments));
    };

    RegistryWithDefault.prototype = $.extend({}, registry.prototype);

    RegistryWithDefault.prototype.get = function(id) {
      if (id === undefined) {
        id = 'default';
      }
      return registry.prototype.get.call(this, id);
    };

    return RegistryWithDefault;

  }

};

},{"../registry/registry":6,"../slice/slice":7}],2:[function(require,module,exports){
//
// Async Factory Registry
//
// An async factory functions similarly to a regular factory registry except it
// always returns a promise which resolves when the factory method completes.
// Whether the actual factory method is async or not does not matter.
//
var FactoryRegistry = require('../factory-registry/factory-registry');
var slice           = require('../slice/slice');

var AsyncFactoryRegistry = function() {
  FactoryRegistry.bind(this)();
};

AsyncFactoryRegistry.prototype = new FactoryRegistry();

AsyncFactoryRegistry.prototype.factory = function() {
  var result = FactoryRegistry.prototype.factory.apply(this, slice(arguments));
  return $.when(result);
};

module.exports = AsyncFactoryRegistry;

},{"../factory-registry/factory-registry":4,"../slice/slice":7}],3:[function(require,module,exports){
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

},{"../slice/slice":7}],4:[function(require,module,exports){
//
// Factory Registry
//
// A factory registry is a registry with a factory method which takes a type and
// a spec or just a spec and returns an object created with a registered
// factory.
//
var Registry = require('../registry/registry');

var FactoryRegistry = function() {
  Registry.bind(this)();
};

FactoryRegistry.prototype = new Registry();

FactoryRegistry.prototype.factory = function(type, spec) {
  if (spec === undefined) {
    spec = arguments[0];
    type = spec.type;
  }
  return this.get(type)(spec);
};

module.exports = FactoryRegistry;

},{"../registry/registry":6}],5:[function(require,module,exports){
//
// My jQuery Helpers
//
// Load up all of the helpers into the $.helpers object
//
$.helpers = {

  addDefaultToRegistry: require('./add-default-to-registry/add-default-to-registry'),

  AsyncFactoryRegistry: require('./async-factory-registry/async-factory-registry'),

  eventize:             require('./eventize/eventize'),

  FactoryRegistry:      require('./factory-registry/factory-registry'),

  Registry:             require('./registry/registry'),

  slice:                require('./slice/slice')

};

},{"./add-default-to-registry/add-default-to-registry":1,"./async-factory-registry/async-factory-registry":2,"./eventize/eventize":3,"./factory-registry/factory-registry":4,"./registry/registry":6,"./slice/slice":7}],6:[function(require,module,exports){
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

},{"../eventize/eventize":3}],7:[function(require,module,exports){
//
// Slice
//
// Slice is shorthand for Array.prototype.slice.call
//
var slice = Array.prototype.slice;

module.exports = function(array, begin, end) {
  return slice.call(array, begin, end);
};

},{}]},{},[5])