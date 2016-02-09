var assign = require('lodash.assign')
var merge = require('lodash.merge')
var reduce = require('lodash.reduce')
var concat = require('lodash.concat')
var traverse = require('traverse')
/**
 * Modify an object recursively by an array of sequential patches.
 * @param {Object} obj - Object input.
 * @param {Array} mods - Array of patches.
 * @returns {Object} Resulting object.
 */
module.exports = function (obj, mods) {
  if (typeof obj !== 'object')
    throw new TypeError('Invalid first argument. Object is expected.')
  if (!Array.isArray(mods))
    throw new TypeError('Invalid second argument. Array is expected.')
  var apply = function (source, mod) {
    var traversedMod = traverse(mod)
    var traversedSource = traverse(source)
    var transformNode = function (node) {
      var isOperation = function (name) {
        return node.hasOwnProperty(name)
      }
      if (typeof node !== 'object')
        return node
      if (isOperation('$set'))
        return node.$set
      var sourceNode = traversedSource.get(this.path)
      if (isOperation('$push'))
        return (sourceNode)? concat(sourceNode, [node.$push]): [node.$push]
      if (isOperation('$unshift'))
        return (sourceNode)? concat([node.$unshift], sourceNode): [node.$unshift]
      if (isOperation('$filter'))
        return sourceNode.filter(node.$filter)
      if (isOperation('$map'))
        return sourceNode.map(node.$map)
      if (isOperation('$apply'))
        return node.$apply.call(source, sourceNode)
      if (isOperation('$merge'))
        return merge(sourceNode, node.$merge)
      return node
    }
    return assign({}, source, traversedMod.map(transformNode))
  }
  return reduce(mods, apply, obj)
}
