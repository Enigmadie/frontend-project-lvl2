install:
	npm install
start:
	npx babel-node src/bin/gendiff.js src/before.json src/after.json
build:
	rm -rf dist
	npm run build
publish:
	npm publish
lint:
	npx eslint .
