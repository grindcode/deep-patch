var merge = require('lodash.merge')
var traverse = require('traverse')

/**
 * Modify an object recursively by an array of sequential patches.
 * @param {Object} input - Object input.
 * @param {Array} patches - Array of patches.
 * @returns {Object} Resulting object.
 */
module.exports = function (input, patches) {
  if (typeof input !== 'object') {
    throw new TypeError('Invalid first argument. Object is expected.')
  }
  if (!Array.isArray(patches)) {
    throw new TypeError('Invalid second argument. Array is expected.')
  }
  return patches.reduce(apply, input)
}

function apply (source, patch) {
  const tpatch = traverse(patch)
  const tsource = traverse(source)
  function transformNode (node) {
    if (typeof node !== 'object' || Array.isArray(node)) {
      return node
    }
    const path = this.path
    return operations.reduce((result, operation) => {
      if ({}.hasOwnProperty.call(node, operation.key)) {
        return operation.run(node[operation.key], tsource.get(path))
      }
      return result
    }, node)
  }
  return Object.assign({}, source, tpatch.map(transformNode))
}

var operations = [
  {
    key: '$set',
    run: function (node, source) {
      return node
    }
  },
  {
    key: '$push',
    run: function (node, source) {
      return source ? source.concat(node) : [node]
    }
  },
  {
    key: '$unshift',
    run: function (node, source) {
      return source ? [node].concat(source) : [node]
    }
  },
  {
    key: '$filter',
    run: function (node, source) {
      return source.filter(node)
    }
  },
  {
    key: '$map',
    run: function (node, source) {
      return source.map(node)
    }
  },
  {
    key: '$apply',
    run: function (node, source) {
      return node(source)
    }
  },
  {
    key: '$merge',
    run: function (node, source) {
      return merge({}, source, node)
    }
  }
]
