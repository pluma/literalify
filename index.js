/*! literalify 0.1.1 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */
var transformTools = require('browserify-transform-tools');

module.exports = transformTools.makeRequireTransform('literalify', {}, function(args, opts, cb) {
  if (args[0] in opts.config) {
    return cb(null, opts.config[args[0]]);
  } else {
    return cb();
  }
});