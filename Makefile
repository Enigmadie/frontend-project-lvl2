install:
	npm install
start:
	npx babel-node src/bin/gendiff.js --format plain /home/safaridie/base/pr2/__tests__/__fixtures__/before-nested.ini /home/safaridie/base/pr2/__tests__/__fixtures__/after-nested.ini
build:
	rm -rf dist
	npm run build
publish:
	npm publish
lint:
	npx eslint .
test:
	npm test
