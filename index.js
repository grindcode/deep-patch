var assign = require('lodash.assign')
var merge = require('lodash.merge')
var reduce = require('lodash.reduce')
var concat = require('lodash.concat')
var traverse = require('traverse')
/**
 * Modify an object recursively by an array of sequential patches.
 * @param {Object} input - Object input.
 * @param {Array} mods - Array of patches.
 * @returns {Object} Resulting object.
 */
module.exports = function (input, patches) {
  if (typeof input !== 'object')
    throw new TypeError('Invalid first argument. Object is expected.')
  if (!Array.isArray(patches))
    throw new TypeError('Invalid second argument. Array is expected.')
  var apply = function (source, patch) {
    var traversedPatch = traverse(patch)
    var traversedSource = traverse(source)
    var getSource = function (path) {
      return traversedSource.get(path)
    }
    var transformNode = function (node) {
      var isOperation = function (name) {
        return node.hasOwnProperty(name)
      }
      if (typeof node !== 'object') {
        return node
      }
      if (isOperation('$set')) {
        return node.$set
      }
      if (isOperation('$push')) {
        var sourceNode = getSource(this.path)
        return (sourceNode)? concat(sourceNode, [node.$push]): [node.$push]
      }
      if (isOperation('$unshift')) {
        var sourceNode = getSource(this.path)
        return (sourceNode)? concat([node.$unshift], sourceNode): [node.$unshift]
      }
      if (isOperation('$filter')) {
        return getSource(this.path).filter(node.$filter)
      }
      if (isOperation('$map')) {
        return getSource(this.path).map(node.$map)
      }
      if (isOperation('$apply')) {
        return node.$apply.call(source, getSource(this.path))
      }
      if (isOperation('$merge')) {
        return merge(getSource(this.path), node.$merge)
      }
      return node
    }
    return assign({}, source, traversedPatch.map(transformNode))
  }
  return reduce(patches, apply, input)
}
