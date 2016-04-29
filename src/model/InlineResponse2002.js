(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './County', './ZipCode', './ZipCounty'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./County'), require('./ZipCode'), require('./ZipCounty'));
  } else {
    // Browser globals (root is window)
    if (!root.VericredApi) {
      root.VericredApi = {};
    }
    root.VericredApi.InlineResponse2002 = factory(root.VericredApi.ApiClient, root.VericredApi.County, root.VericredApi.ZipCode, root.VericredApi.ZipCounty);
  }
}(this, function(ApiClient, County, ZipCode, ZipCounty) {
  'use strict';

  /**
   * The InlineResponse2002 model module.
   * @module model/InlineResponse2002
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>InlineResponse2002</code>.
   * @alias module:model/InlineResponse2002
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>InlineResponse2002</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InlineResponse2002} obj Optional instance to populate.
   * @return {module:model/InlineResponse2002} The populated <code>InlineResponse2002</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('zip_counties')) {
        obj['zip_counties'] = ApiClient.convertToType(data['zip_counties'], [ZipCounty]);
      }
      if (data.hasOwnProperty('counties')) {
        obj['counties'] = ApiClient.convertToType(data['counties'], [County]);
      }
      if (data.hasOwnProperty('zip_codes')) {
        obj['zip_codes'] = ApiClient.convertToType(data['zip_codes'], [ZipCode]);
      }
    }
    return obj;
  }


  /**
   * @member {Array.<module:model/ZipCounty>} zip_counties
   */
  exports.prototype['zip_counties'] = undefined;

  /**
   * @member {Array.<module:model/County>} counties
   */
  exports.prototype['counties'] = undefined;

  /**
   * @member {Array.<module:model/ZipCode>} zip_codes
   */
  exports.prototype['zip_codes'] = undefined;




  return exports;
}));
