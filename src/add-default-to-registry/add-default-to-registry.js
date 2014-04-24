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
