var eventize = require('./eventize');

describe('eventize', function() {

  var async = new AsyncSpec(this);

  it('should add on, off, and trigger methods to a given object', function() {
    var result = eventize({});
    expect(typeof result.on).toBe('function');
    expect(typeof result.off).toBe('function');
    expect(typeof result.trigger).toBe('function');
  });

  describe('trigger', function() {

    async.it('should trigger the callbacks registered with on', function(done) {
      var result = eventize({});
      result.on('event', function() {
        done();
      });

      result.trigger('event');
    });

    it('should not trigger removed event listeners', function() {
      var result = eventize({});
      result.on('event', function() { expect(true).toBe(false); });
      result.off('event');

      result.trigger('event');
    });

    it('should not trigger other eventized object\'s listeners', function() {
      var a = eventize({});
      var b = eventize({});

      a.on('event', function() { expect(true).toBe(false); });
      b.trigger('event');
    });

    it('should trigger the listeners only once', function() {
      var result = eventize({});
      var cb     = jasmine.createSpy('spy');

      result.on('event', cb);
      result.trigger('event');

      expect(cb).toHaveBeenCalled();
      expect(cb.callCount).toEqual(1);
    });

  });

});
