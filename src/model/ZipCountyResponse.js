(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './County', './ZipCode', './ZipCounty'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./County'), require('./ZipCode'), require('./ZipCounty'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.ZipCountyResponse = factory(root.vericred-client.ApiClient, root.vericred-client.County, root.vericred-client.ZipCode, root.vericred-client.ZipCounty);
  }
}(this, function(ApiClient, County, ZipCode, ZipCounty) {
  'use strict';

  /**
   * The ZipCountyResponse model module.
   * @module model/ZipCountyResponse
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>ZipCountyResponse</code>.
   * @alias module:model/ZipCountyResponse
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>ZipCountyResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ZipCountyResponse} obj Optional instance to populate.
   * @return {module:model/ZipCountyResponse} The populated <code>ZipCountyResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('counties')) {
        obj['counties'] = ApiClient.convertToType(data['counties'], [County]);
      }
      if (data.hasOwnProperty('zip_codes')) {
        obj['zip_codes'] = ApiClient.convertToType(data['zip_codes'], [ZipCode]);
      }
      if (data.hasOwnProperty('zip_counties')) {
        obj['zip_counties'] = ApiClient.convertToType(data['zip_counties'], [ZipCounty]);
      }
    }
    return obj;
  }


  /**
   * Counties that exist in the provided zip prefix.
   * @member {Array.<module:model/County>} counties
   */
  exports.prototype['counties'] = undefined;

  /**
   * ZipCodes that exist in the provided zip prefix.
   * @member {Array.<module:model/ZipCode>} zip_codes
   */
  exports.prototype['zip_codes'] = undefined;

  /**
   * ZipCounties that exist in the provided zip prefix.
   * @member {Array.<module:model/ZipCounty>} zip_counties
   */
  exports.prototype['zip_counties'] = undefined;




  return exports;
}));
