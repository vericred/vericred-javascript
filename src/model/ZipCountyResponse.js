(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './County', './State', './ZipCode', './ZipCounty'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./County'), require('./State'), require('./ZipCode'), require('./ZipCounty'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.ZipCountyResponse = factory(root.vericred-client.ApiClient, root.vericred-client.County, root.vericred-client.State, root.vericred-client.ZipCode, root.vericred-client.ZipCounty);
  }
}(this, function(ApiClient, County, State, ZipCode, ZipCounty) {
  'use strict';

  /**
   * The ZipCountyResponse model module.
   * @module model/ZipCountyResponse
   * @version 0.0.4
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
      if (data.hasOwnProperty('states')) {
        obj['states'] = ApiClient.convertToType(data['states'], [State]);
      }
      if (data.hasOwnProperty('zip_codes')) {
        obj['zip_codes'] = ApiClient.convertToType(data['zip_codes'], [ZipCode]);
      }
      if (data.hasOwnProperty('zip_county')) {
        obj['zip_county'] = ZipCounty.constructFromObject(data['zip_county']);
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
   * States that exist in the provided zip prefix.
   * @member {Array.<module:model/State>} states
   */
  exports.prototype['states'] = undefined;

  /**
   * ZipCodes that exist in the provided zip prefix.
   * @member {Array.<module:model/ZipCode>} zip_codes
   */
  exports.prototype['zip_codes'] = undefined;

  /**
   * ZipCounty data
   * @member {module:model/ZipCounty} zip_county
   */
  exports.prototype['zip_county'] = undefined;




  return exports;
}));
