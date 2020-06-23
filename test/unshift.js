var test = require('tape')
var patch = require('../index.js')

var data = {
  a: { aa: { aaa: [1, 2] } },
  b: [1, 2]
}

test('$unshift: modify existing', function (t) {
  t.plan(1)
  var result = patch(data, [
    { a: { aa: { aaa: { $unshift: 0 } } } },
    { b: { $unshift: 0 } }
  ])
  t.deepEqual(result, {
    a: { aa: { aaa: [0, 1, 2] } },
    b: [0, 1, 2]
  })
  t.end()
})

test('$unshift: create new', function (t) {
  t.plan(1)
  var result = patch(data, [
    { c: { cc: { ccc: { $unshift: 0 } } } },
    { d: { $unshift: 0 } }
  ])
  t.deepEqual(result, {
    a: { aa: { aaa: [1, 2] } },
    b: [1, 2],
    c: { cc: { ccc: [0] } },
    d: [0]
  })
  t.end()
})
