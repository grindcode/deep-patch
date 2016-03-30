var Benchmark = require('benchmark')
var Suite = new Benchmark.Suite
var patch = require('./index.js')

var data = {
  a: {aa: {aaa: 'string' }},
  b: 'string'
}

Suite
  .add('$set', function () {
    patch(data, [
      {a: {aa: {aaa: {$set: 'modified string' }}}},
      {b: {$set: 'modified string' }}
    ])
  })
  .on('cycle', function (e) {
    console.log(String(e.target))
  })
  .run({ async: true })
