install: 
	install-deps

install-deps:
	npm ci

gendiff: 
	node --experimental-json-modules bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage