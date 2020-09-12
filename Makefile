install: 
	npm install

gendiff: 
	node --experimental-json-modules src/bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage