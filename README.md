# Deep Patch
[![Build Status](https://travis-ci.org/grindcode/deep-patch.svg?branch=master)](https://travis-ci.org/grindcode/deep-patch) [![Test Coverage](https://codeclimate.com/github/grindcode/deep-patch/badges/coverage.svg)](https://codeclimate.com/github/grindcode/deep-patch/coverage) [![Dependency Status](https://david-dm.org/grindcode/deep-patch.svg)](https://david-dm.org/grindcode/deep-patch) [![devDependency Status](https://david-dm.org/grindcode/deep-patch/dev-status.svg)](https://david-dm.org/grindcode/deep-patch#info=devDependencies)

Modify an object recursively by an array of sequential patches.

## Get Started
```shell
npm install deep-patch
```

## API
### patch(input, patches)
Returns new _Object_ modified recursively by `mods`, an array of one or more sequential patches.
* `input`: Object input. (**Object**)
* `patches`: Array of patches. (**Array**)

### patch operations
If `path` is not found in `input`, a new value is created. Type is defined by expected value.
* `{path: {$set: value}}`: Set a _mixed_ value to `path`.
* `{path: {$push: value}}`: Push `value` to _Array_ in `path`.
* `{path: {$unshift: value}}`: Unshift `value` to _Array_ in `path`.
* `{path: {$filter: value}}`: Runs `value` as filter _Function_ to _Array_ in `path`.
* `{path: {$map: value}}`: Runs `value` as map _Function_ to _Array_ in `path`.
* `{path: {$apply: value}}`: Runs `value` as _Function_ to _any_ value in `path`. Input value in same `path` is provided as first argument.
* `{path: {$merge: value}}`: Merges `value` into `path` _Object_.

### Usage
```javascript
var patch = require('deep-patch')

var data = {
  a: {aa: {aaa: 'string' }},
  b: 'string',
}

patch(data, [
  {a: {aa: {aaa: {$set: 'modified string' }}}},
  {b: {$set: 'modified string' }}
])

// →
// {
//   a: {aa: {aaa: 'modified string' }},
//   b: 'modified string'
// }
```

## Benchmark
```shell
node benchmark.js
```

### Results
```shell
$set x 26,479 ops/sec ±6.34% (78 runs sampled)
```

## License
See the [License](LICENSE) file.
