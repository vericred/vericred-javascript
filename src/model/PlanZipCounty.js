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
    root.vericred-client.PlanZipCounty = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The PlanZipCounty model module.
   * @module model/PlanZipCounty
   * @version 0.0.5
   */

  /**
   * Constructs a new <code>PlanZipCounty</code>.
   * @alias module:model/PlanZipCounty
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>PlanZipCounty</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PlanZipCounty} obj Optional instance to populate.
   * @return {module:model/PlanZipCounty} The populated <code>PlanZipCounty</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('plan_id')) {
        obj['plan_id'] = ApiClient.convertToType(data['plan_id'], 'Integer');
      }
      if (data.hasOwnProperty('county_id')) {
        obj['county_id'] = ApiClient.convertToType(data['county_id'], 'Integer');
      }
      if (data.hasOwnProperty('zip_code_id')) {
        obj['zip_code_id'] = ApiClient.convertToType(data['zip_code_id'], 'Integer');
      }
    }
    return obj;
  }


  /**
   * Foreign key to plan
   * @member {Integer} plan_id
   */
  exports.prototype['plan_id'] = undefined;

  /**
   * Foreign key to county
   * @member {Integer} county_id
   */
  exports.prototype['county_id'] = undefined;

  /**
   * Foreign key to zip code
   * @member {Integer} zip_code_id
   */
  exports.prototype['zip_code_id'] = undefined;




  return exports;
}));
