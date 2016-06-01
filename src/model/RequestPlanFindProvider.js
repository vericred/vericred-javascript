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
    root.vericred-client.RequestPlanFindProvider = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The RequestPlanFindProvider model module.
   * @module model/RequestPlanFindProvider
   * @version 0.0.4
   */

  /**
   * Constructs a new <code>RequestPlanFindProvider</code>.
   * @alias module:model/RequestPlanFindProvider
   * @class
   */
  var exports = function() {


  };

  /**
   * Constructs a <code>RequestPlanFindProvider</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RequestPlanFindProvider} obj Optional instance to populate.
   * @return {module:model/RequestPlanFindProvider} The populated <code>RequestPlanFindProvider</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('npi')) {
        obj['npi'] = ApiClient.convertToType(data['npi'], 'Integer');
      }
    }
    return obj;
  }


  /**
   * NPI of provider to search for
   * @member {Integer} npi
   */
  exports.prototype['npi'] = undefined;




  return exports;
}));
