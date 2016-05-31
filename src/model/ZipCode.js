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
    root.vericred-client.ZipCode = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The ZipCode model module.
   * @module model/ZipCode
   * @version 0.0.3
   */

  /**
   * Constructs a new <code>ZipCode</code>.
   * @alias module:model/ZipCode
   * @class
   */
  var exports = function() {



  };

  /**
   * Constructs a <code>ZipCode</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ZipCode} obj Optional instance to populate.
   * @return {module:model/ZipCode} The populated <code>ZipCode</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Integer');
      }
    }
    return obj;
  }


  /**
   * 5 digit code (e.g. 11215)
   * @member {String} code
   */
  exports.prototype['code'] = undefined;

  /**
   * Primary key
   * @member {Integer} id
   */
  exports.prototype['id'] = undefined;




  return exports;
}));
