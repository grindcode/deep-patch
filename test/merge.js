var test = require('tape')
var patch = require('../index.js')

var data = {
  a: { aa: { aaa: { initial: 'value' } } },
  b: { initial: 'value' }
}

test('$merge', function (t) {
  t.plan(1)
  var result = patch(data, [
    { a: { aa: { aaa: { $merge: { modified: 'value' } } } } },
    { b: { $merge: { modified: 'value' } } }
  ])
  t.deepEqual(result, {
    a: { aa: { aaa: { initial: 'value', modified: 'value' } } },
    b: { initial: 'value', modified: 'value' }
  })
  t.end()
})
