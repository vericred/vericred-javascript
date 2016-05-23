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
    root.vericred-client.ZipCountiesResponse = factory(root.vericred-client.ApiClient, root.vericred-client.County, root.vericred-client.State, root.vericred-client.ZipCode, root.vericred-client.ZipCounty);
  }
}(this, function(ApiClient, County, State, ZipCode, ZipCounty) {
  'use strict';

  /**
   * The ZipCountiesResponse model module.
   * @module model/ZipCountiesResponse
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>ZipCountiesResponse</code>.
   * @alias module:model/ZipCountiesResponse
   * @class
   */
  var exports = function() {





  };

  /**
   * Constructs a <code>ZipCountiesResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ZipCountiesResponse} obj Optional instance to populate.
   * @return {module:model/ZipCountiesResponse} The populated <code>ZipCountiesResponse</code> instance.
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
      if (data.hasOwnProperty('zip_counties')) {
        obj['zip_counties'] = ApiClient.convertToType(data['zip_counties'], [ZipCounty]);
      }
      if (data.hasOwnProperty('zip_codes')) {
        obj['zip_codes'] = ApiClient.convertToType(data['zip_codes'], [ZipCode]);
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
   * ZipCounties that exist in the provided zip prefix.
   * @member {Array.<module:model/ZipCounty>} zip_counties
   */
  exports.prototype['zip_counties'] = undefined;

  /**
   * ZipCodes that exist in the provided zip prefix.
   * @member {Array.<module:model/ZipCode>} zip_codes
   */
  exports.prototype['zip_codes'] = undefined;




  return exports;
}));
