var test = require('tape')
var patch = require('../index.js')

var data = {
  a: { aa: { aaa: [1, 2, 3] } },
  b: [1, 2]
}

test('$map', function (t) {
  t.plan(1)
  var result = patch(data, [
    {
      a: {
        aa: {
          aaa: {
            $map: function (v, i) {
              return { v: v }
            }
          }
        }
      }
    },
    {
      b: {
        $map: function (v, i) {
          return { v: v, i: i }
        }
      }
    }
  ])
  t.deepEqual(result, {
    a: { aa: { aaa: [{ v: 1 }, { v: 2 }, { v: 3 }] } },
    b: [
      { v: 1, i: 0 },
      { v: 2, i: 1 }
    ]
  })
  t.end()
})
