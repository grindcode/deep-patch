var test = require('tape')
var patch = require('../index.js')

var data = {
  a: {aa: {aaa: [1, 2]}},
  b: [1, 2],
}

test('$push: modify existing', function (t) {
  t.plan(1)
  var result = patch(data, [
    {a: {aa: {aaa: {$push: 3 }}}},
    {b: {$push: 3 }}
  ])
  t.deepEqual(result, {
    a: {aa: {aaa: [1, 2, 3]}},
    b: [1, 2, 3]
  });
  t.end()
})

test('$push: create new', function (t) {
  t.plan(1)
  var result = patch(data, [
    {c: {cc: {ccc: {$push: 1 }}}},
    {d: {$push: 1 }}
  ])
  t.deepEqual(result, {
    a: {aa: {aaa: [1, 2]}},
    b: [1, 2],
    c: {cc: {ccc: [1] }},
    d: [1]
  });
  t.end()
})
