var slice = require('./slice');

describe('slice', function() {

  it('should function as though you\'re using Array.prototype.slice.call', function() {
    var array  = [1, 2, 3, 4, 5];
    var result = slice(array, 1);
    expect(result).toEqual([2, 3, 4, 5]);
  });

});
