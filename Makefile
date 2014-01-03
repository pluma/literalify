test:
	@./node_modules/.bin/mocha \
		--growl \
		--reporter spec \
		spec/*.spec.js

lint:
	@./node_modules/.bin/jshint index.js spec

.PHONY: lint test clean
