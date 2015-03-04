/*global describe, it */
var expect = require('expect.js'),
  literalify = require('../'),
  browserify = require('browserify'),
  vm = require('vm');

describe('browserify -t literalify', function () {
  it('handles JavaScript files', function (done) {
    var b = browserify({basedir: __dirname});
    b.transform(literalify.configure({'some-dependency': 'alert'}));
    b.add('./fixtures/simple.js');
    b.bundle(function (err, buf) {
      expect(err).not.to.be.ok();
      var c = vm.createContext();
      var timesCalled = 0;
      c.alert = function (arg) {
        expect(arg).to.eql('potato');
        timesCalled++;
      };
      vm.runInContext(buf.toString('utf-8'), c);
      expect(timesCalled).to.equal(1);
      done();
    });
  });
  it('handles JSON files', function (done) {
    var b = browserify({basedir: __dirname});
    b.transform(literalify.configure({'some-dependency': 'alert'}));
    b.add('./fixtures/with-json.js');
    b.bundle(function (err, buf) {
      expect(err).not.to.be.ok();
      var c = vm.createContext();
      var timesCalled = 0;
      c.alert = function (arg) {
        expect(arg).to.eql(require('./fixtures/json-dep'));
        timesCalled++;
      };
      vm.runInContext(buf.toString('utf-8'), c);
      expect(timesCalled).to.equal(1);
      done();
    });
  });
});