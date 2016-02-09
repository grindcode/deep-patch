# Deep Patch
[![Build Status](https://travis-ci.org/grindcode/deep-patch.svg?branch=master)](https://travis-ci.org/grindcode/deep-patch) [![Dependency Status](https://david-dm.org/grindcode/deep-patch.svg)](https://david-dm.org/grindcode/deep-patch) [![devDependency Status](https://david-dm.org/grindcode/deep-patch/dev-status.svg)](https://david-dm.org/grindcode/deep-patch#info=devDependencies)

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
* `{path: {$set: value}}`:
* `{path: {$push: value}}`:
* `{path: {$unshift: value}}`:
* `{path: {$filter: value}}`:
* `{path: {$map: value}}`:
* `{path: {$apply: value}}`:
* `{path: {$merge: value}}`:

### Usage
```javascript
// → {}
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
