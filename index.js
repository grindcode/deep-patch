var assign = require('lodash.assign')
var merge = require('lodash.merge')
var reduce = require('lodash.reduce')
var concat = require('lodash.concat')
var traverse = require('traverse')

// List of available operations
var operations = [{
    key: '$set',
    run: function (node, source) {
      return node
    }
  }, {
    key: '$push',
    run: function (node, source) {
      return (source)? concat(source, [node]): [node]
    }
  }, {
    key: '$unshift',
    run: function (node, source) {
      return (source)? concat([node], source): [node]
    }
  }, {
    key: '$filter',
    run: function (node, source) {
      return source.filter(node)
    }
  }, {
    key: '$map',
    run: function (node, source) {
      return source.map(node)
    }
  }, {
    key: '$apply',
    run: function (node, source) {
      return node.call(null, source)
    }
  }, {
    key: '$merge',
    run: function (node, source) {
      return merge(source, node)
    }
  }]

/**
 * Modify an object recursively by an array of sequential patches.
 * @param {Object} input - Object input.
 * @param {Array} patches - Array of patches.
 * @returns {Object} Resulting object.
 */
module.exports = function (input, patches) {
  if (typeof input !== 'object')
    throw new TypeError('Invalid first argument. Object is expected.')
  if (!Array.isArray(patches))
    throw new TypeError('Invalid second argument. Array is expected.')
  var apply = function (source, patch) {
    var tpatch = traverse(patch)
    var tsource = traverse(source)
    var transformNode = function (node) {
      if (typeof node !== 'object' || Array.isArray(node))
        return node
      var path = this.path
      var reduceOperations = function (result, operation) {
        if ({}.hasOwnProperty.call(node, operation.key)) {
          return operation.run(node[operation.key], tsource.get(path))
        }
        return result
      }
      return reduce(operations, reduceOperations, node)
    }
    return assign({}, source, tpatch.map(transformNode))
  }
  return reduce(patches, apply, input)
}
