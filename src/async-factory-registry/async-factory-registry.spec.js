var AsyncFactoryRegistry = require('./async-factory-registry');

describe('AsyncFactoryRegistry', function() {

  it('should be a registry', function() {
    var registry = new AsyncFactoryRegistry();
    expect(typeof registry.has).toBe('function');
    expect(typeof registry.get).toBe('function');
    expect(typeof registry.put).toBe('function');
  });

  it('should not create conflicting registries', function() {
    var a = new AsyncFactoryRegistry();
    var b = new AsyncFactoryRegistry();
    a.put('something', {});

    expect(a.has('something')).toBe(true);
    expect(b.has('something')).toBe(false);
  });

});
