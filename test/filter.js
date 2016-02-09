var test = require('tape')
var patch = require('../index.js')

var data = {
  a: {aa: {aaa: [1, 2, 3]}},
  b: [1, 2],
}

test('$filter', function (t) {
  t.plan(1)
  var result = patch(data, [
    {a: {aa: {aaa: {$filter: function (v, i) { return v > 1 }}}}},
    {b: {$filter: function (v, i) { return v === 1 }}}
  ])
  t.deepEqual(result, {
    a: {aa: {aaa: [2, 3]}},
    b: [1]
  });
  t.end()
})
