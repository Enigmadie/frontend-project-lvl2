install:
	npm install
start:
	npx babel-node src/bin/gendiff.js /home/safaridie/base/pr2/__tests__/__fixtures__/before.json /home/safaridie/base/pr2/__tests__/__fixtures__/after.json
build:
	rm -rf dist
	npm run build
publish:
	npm publish
lint:
	npx eslint .
test:
	npm test
