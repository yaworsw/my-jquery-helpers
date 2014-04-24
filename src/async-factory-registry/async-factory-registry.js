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
