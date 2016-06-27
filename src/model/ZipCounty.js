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
    root.vericred-client.ZipCounty = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The ZipCounty model module.
   * @module model/ZipCounty
   * @version 0.0.5
   */

  /**
   * Constructs a new <code>ZipCounty</code>.
   * @alias module:model/ZipCounty
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>ZipCounty</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ZipCounty} obj Optional instance to populate.
   * @return {module:model/ZipCounty} The populated <code>ZipCounty</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('county_id')) {
        obj['county_id'] = ApiClient.convertToType(data['county_id'], 'Integer');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Integer');
      }
      if (data.hasOwnProperty('zip_code_id')) {
        obj['zip_code_id'] = ApiClient.convertToType(data['zip_code_id'], 'Integer');
      }
    }
    return obj;
  }


  /**
   * ID of the parent County in Vericred's API
   * @member {Integer} county_id
   */
  exports.prototype['county_id'] = undefined;

  /**
   * Primary key
   * @member {Integer} id
   */
  exports.prototype['id'] = undefined;

  /**
   * ID of the parent Zip Code in Vericred's API
   * @member {Integer} zip_code_id
   */
  exports.prototype['zip_code_id'] = undefined;




  return exports;
}));
