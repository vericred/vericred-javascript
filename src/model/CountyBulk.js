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
    root.vericred-client.CountyBulk = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The CountyBulk model module.
   * @module model/CountyBulk
   * @version 0.0.3
   */

  /**
   * Constructs a new <code>CountyBulk</code>.
   * @alias module:model/CountyBulk
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>CountyBulk</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CountyBulk} obj Optional instance to populate.
   * @return {module:model/CountyBulk} The populated <code>CountyBulk</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('state_id')) {
        obj['state_id'] = ApiClient.convertToType(data['state_id'], 'String');
      }
    }
    return obj;
  }


  /**
   * FIPs code for the county
   * @member {String} id
   */
  exports.prototype['id'] = undefined;

  /**
   * Name of the county
   * @member {String} name
   */
  exports.prototype['name'] = undefined;

  /**
   * State code
   * @member {String} state_id
   */
  exports.prototype['state_id'] = undefined;




  return exports;
}));
