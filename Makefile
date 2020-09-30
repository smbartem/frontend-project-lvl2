install: 
	npm install

gendiff: 
	node --experimental-json-modules bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8