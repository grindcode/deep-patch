var test = require('tape')
var patch = require('../index.js')

var data = {
  a: { aa: { aaa: 'initial value' } },
  b: 'initial value'
}

test('$apply', function (t) {
  t.plan(1)
  var result = patch(data, [
    {
      a: {
        aa: {
          aaa: {
            $apply: function (v) {
              return 'modified ' + v
            }
          }
        }
      }
    },
    {
      b: {
        $apply: function (v) {
          return 'modified ' + v
        }
      }
    }
  ])
  t.deepEqual(result, {
    a: { aa: { aaa: 'modified initial value' } },
    b: 'modified initial value'
  })
  t.end()
})
