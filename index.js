var transformTools = require('browserify-transform-tools');

module.exports = transformTools.makeRequireTransform('literalify', {excludeExtensions: ['json']}, function(args, opts, cb) {
  if (opts.config && args[0] in opts.config) {
    return cb(null, opts.config[args[0]]);
  } else {
    return cb();
  }
});
