gendiff:
	node	src/bin/gendiff.js

gendiff-test:
	node	src/bin/gendiff-test.js

lint:
	npx eslint .
		
install:
	npm ci

publish:
	npm publish --dry-run
		