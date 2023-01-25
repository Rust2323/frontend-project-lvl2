gendiff:
	node	src/bin/gendiff.js

lint:
	npx eslint .
		
install:
	npm ci

publish:
	npm publish --dry-run
		