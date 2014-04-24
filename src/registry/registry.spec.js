var Registry = require('./registry');

describe('Registry', function() {

  var async = new AsyncSpec(this);

  it('should be a function', function() {
    expect(typeof Registry).toBe('function');
  });

  it('should have has, get, and put methods', function() {
    var registry = new Registry();
    expect(typeof registry.has).toBe('function');
    expect(typeof registry.get).toBe('function');
    expect(typeof registry.put).toBe('function');
  });

  it('should create distinct registries', function() {
    var a = new Registry();
    var b = new Registry();
    a.put('something', {});

    expect(b.has('something')).toBe(false);
  });

  describe('put', function() {

    async.it('should trigger the \'put\' event when the put method is called', function(done) {
      var registry = new Registry();
      registry.on('put', function() {
        done();
      });

      registry.put('something', {});
    });

    async.it('should trigger the \'put\' event with the id and the thing being bound', function(done) {
      var registry = new Registry();
      registry.on('put', function(id, thing) {
        expect(id).toBe('something');
        expect(thing.key).toBe('set');
        registry.off('put');
        done();
      });

      registry.put('something', { key: 'set' });
    });

  });

  describe('keys', function() {

    it('should return a list of registered keys', function() {
      var registry = new Registry();
      registry.put('foo', 1);
      registry.put('bar', 2);
      registry.put('baz', 3);

      var keys = registry.keys();

      expect(keys.length).toBe(3);

      expect(keys).toContain('foo');
      expect(keys).toContain('bar');
      expect(keys).toContain('baz');
    });

  });

  describe('remove', function() {

    it('should remove an item from a registry', function() {
      var registry = new Registry();
      registry.put('foo', 1);
      registry.put('bar', 2);
      registry.put('baz', 3);

      registry.remove('bar');

      var keys = registry.keys();

      expect(keys.length).toBe(2);

      expect(keys).toContain('foo');
      expect(keys).toContain('baz');
    });

  });

});
