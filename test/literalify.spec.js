/*global describe, it */
var expect = require('expect.js'),
  literalify = require('../');

describe('literalify', function() {
  it('is a function', function() {
    expect(literalify).to.be.a('function');
  });
  it('replaces matching require calls', function(done) {
    var tr = literalify.configure({'some-dependency': '25'})('foo.js');
    var data = '';
    tr.on('data', function(chunk) {
      data += chunk;
    });
    tr.on('end', function() {
      expect(data).to.equal('var dep = 25;');
      done();
    });
    tr.write('var dep = require(\'some-dependency\');');
    tr.end();
  });
  it('replaces matching require calls', function(done) {
    var tr = literalify.configure({'some-dependency': '25'})('foo.js');
    var str = 'var dep = require(\'other-dependency\');';
    var data = '';
    tr.on('data', function(chunk) {
      data += chunk;
    });
    tr.on('end', function() {
      expect(data).to.equal(str);
      done();
    });
    tr.write(str);
    tr.end();
  });
});