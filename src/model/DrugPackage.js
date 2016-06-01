(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.DrugPackage = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The DrugPackage model module.
   * @module model/DrugPackage
   * @version 0.0.4
   */

  /**
   * Constructs a new <code>DrugPackage</code>.
   * @alias module:model/DrugPackage
   * @class
   */
  var exports = function() {



  };

  /**
   * Constructs a <code>DrugPackage</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DrugPackage} obj Optional instance to populate.
   * @return {module:model/DrugPackage} The populated <code>DrugPackage</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
    }
    return obj;
  }


  /**
   * National Drug Code ID (Package)
   * @member {String} id
   */
  exports.prototype['id'] = undefined;

  /**
   * Package description
   * @member {String} description
   */
  exports.prototype['description'] = undefined;




  return exports;
}));
