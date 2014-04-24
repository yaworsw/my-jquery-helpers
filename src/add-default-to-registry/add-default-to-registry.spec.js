var Registry = require('../registry/registry');

var addDefaultToRegistry = require('./add-default-to-registry');

describe('addDefaultToRegistry', function() {

  it('should make get respond with a default value when called with no arguments', function() {
    var reg = new Registry();
    addDefaultToRegistry(reg);
    reg.put('default', 'what i put there');

    expect(reg.get()).toBe('what i put there');
  });

  it('should also work if applied to a class', function() {
    var RegistryWithDefault = addDefaultToRegistry(Registry);
    var reg = new RegistryWithDefault();

    reg.put('default', 'what i put there');

    expect(reg.get()).toBe('what i put there');
  });

});
