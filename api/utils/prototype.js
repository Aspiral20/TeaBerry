const Closure = require('./closure')

class Prototype {
  constructor() {
    this.ArrayPrototype()
    this.ObjectPrototype()
  }
  ArrayPrototype() {
    Array.prototype.getMaxItemLength = function () {
      let maxLength = this[0].length

      this.forEach(item => {
        if (item.length > maxLength) {
          maxLength = item.length
        }
      })

      return maxLength
    }
    Array.prototype.getMinItemLength = function () {
      let minLength = this[0].length

      this.forEach(item => {
        if (item.length < minLength) {
          minLength = item.length
        }
      })

      return minLength
    }
  }
  ObjectPrototype() {

  }
}


module.exports = new Prototype()