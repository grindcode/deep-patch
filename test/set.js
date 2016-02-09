var test = require('tape')
var patch = require('../index.js')

var data = {
  a: {aa: {aaa: 'string' }},
  b: 'string',
}

test('$set: modify existing', function (t) {
  t.plan(1)
  var result = patch(data, [
    {a: {aa: {aaa: {$set: 'modified string' }}}},
    {b: {$set: 'modified string' }}
  ])
  t.deepEqual(result, {
    a: {aa: {aaa: 'modified string' }},
    b: 'modified string'
  });
  t.end()
})

test('$set: create new', function (t) {
  t.plan(1)
  var result = patch(data, [
    {c: {cc: {ccc: {$set: 'new string' }}}},
    {d: {$set: 'new string' }}
  ])
  t.deepEqual(result, {
    a: {aa: {aaa: 'string' }},
    b: 'string',
    c: {cc: {ccc: 'new string' }},
    d: 'new string'
  });
  t.end()
})
