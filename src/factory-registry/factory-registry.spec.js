var FactoryRegistry = require('./factory-registry');

describe('FactoryRegistry', function() {

  var async = new AsyncSpec(this);

  it('should have a factory method', function() {
    var registry = new FactoryRegistry();
    expect(typeof registry.factory).toBe('function');
  });

  it('should have the registry methods', function() {
    var registry = new FactoryRegistry();
    window.reg = registry;
    expect(typeof registry.has).toBe('function');
    expect(typeof registry.get).toBe('function');
    expect(typeof registry.put).toBe('function');
  });

  it('should not create conflicting registries', function() {
    var a = new FactoryRegistry();
    var b = new FactoryRegistry();
    a.put('something', {});

    expect(a.has('something')).toBe(true);
    expect(b.has('something')).toBe(false);
  });

  describe('factory', function() {

    async.it('should call the registered factory function when given a spec for it', function(done) {
      var registry = new FactoryRegistry();

      registry.put('something', done);
      registry.factory({ type: 'something' });
    });

  });

});
