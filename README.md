# Synopsis

**literalify** is a [browserify](https://github.com/substack/node-browserify) transform for replacing require calls with arbitrary code, e.g. to pretend browser globals are actually CommonJS modules.

This library uses [browserify-transform-tools](https://github.com/benbria/browserify-transform-tools), so you can also supply the configuration by adding a `literalify` field to your project's `package.json` file.

[![license - MIT](https://img.shields.io/npm/l/literalify.svg)](http://pluma.mit-license.org) [![Dependencies](https://img.shields.io/david/pluma/literalify.svg)](https://david-dm.org/pluma/literalify)

[![NPM status](https://nodei.co/npm/literalify.png?compact=true)](https://npmjs.org/package/literalify)

[![Build Status](https://img.shields.io/travis/pluma/literalify.svg)](https://travis-ci.org/pluma/literalify) [![Coverage Status](https://img.shields.io/coveralls/pluma/literalify.svg)](https://coveralls.io/r/pluma/literalify?branch=master)

# Rationale

If you only want to convert globals-polluting libraries into CommonJS modules, [moduleify](https://github.com/pluma/moduleify) would be sufficient. But in some cases you still want these libraries to be loaded via script-tags or have to use an existing non-browserified bundle.

In these cases the recommended approach seems to be to create shim modules for each browser global you want to use. But compared to just using `window.myLibrary` the overhead of creating a new shim module seems a bit extreme.

With `literalify` you don't have to choose: you can use `require` to load your legacy libraries *without* having to pollute your filesystem with those pesky shims.

# Use Case: AngularJS

In the 1.2 release AngularJS has begun to move some core features into separate files. If you want to use AngularJS with browserify `require` calls that means you now have the option of either bundling AngularJS with all the extensions you want to use before browserify is applied or to wrap each extension in a separate module and make sure to load all of them explicitly in your start script. In either case you need to run the AngularJS files through browserify in order to be able to `require` them.

With `literalify` you can keep the AngularJS files out of browserify and let it simply replace all calls of `require("angular")` with references to `window.angular` without having to make manual changes to your code or AngularJS.

# Install

## Node.js

### With NPM

```sh
npm install literalify
```

### From source

```sh
git clone https://github.com/pluma/literalify.git
cd literalify
npm install
make test
```

# Basic usage example

## example/vendor/some-dependency.js

```javascript
window.$ = {
  makeAwesome: function(str) {
    return str.toUpperCase();
  }
};
```

## example/app.js

```javascript
var makeAwesome = require('some-dependency').makeAwesome;
console.log(makeAwesome('needs more caps'));
```

## example/index.html
```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Look at the console!</title>
</head>
<body>
<script src="vendor/some-dependency.js"></script>
<script src="bundle.js"></script>
</body>
</html>
```

## Usage

```javascript
var browserify = require('browserify'),
    literalify = require('literalify'),
    b = browserify();

b.transform(literalify.configure({
    'some-dependency': 'window.$'
}));
b.add('./app.js');
b.bundle().pipe(require('fs').createWriteStream('bundle.js'));
```

# Usage example with package.json

## package.json

```json
{
    "name": "my-awesome-project",
    "devDependencies": {
        "browserify": "*",
        "literalify": "*"
    },
    "literalify": {"some-dependency": "window.$"}
}
```

### Usage (API)

```javascript
var browserify = require('browserify'),
    literalify = require('literalify'),
    b = browserify();

b.transform(literalify);
b.add('./app.js');
b.bundle().pipe(require('fs').createWriteStream('bundle.js'));
```

### Usage (Shell)

```sh
browserify -t literalify ./app.js > bundle.js
```

# API

## literalify.configure(rules):transform

Creates a browserify transform that will replace the given require calls with the given JavaScript expressions.

# License

The MIT/Expat license. For more information, see http://pluma.mit-license.org/ or the accompanying [LICENSE](https://github.com/pluma/counting/blob/master/LICENSE) file.