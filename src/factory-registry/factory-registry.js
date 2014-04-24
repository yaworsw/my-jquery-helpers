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
