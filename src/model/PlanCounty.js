(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.VericredApi) {
      root.VericredApi = {};
    }
    root.VericredApi.PlanCounty = factory(root.VericredApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The PlanCounty model module.
   * @module model/PlanCounty
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>PlanCounty</code>.
   * @alias module:model/PlanCounty
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>PlanCounty</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PlanCounty} obj Optional instance to populate.
   * @return {module:model/PlanCounty} The populated <code>PlanCounty</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Integer');
      }
      if (data.hasOwnProperty('plan_id')) {
        obj['plan_id'] = ApiClient.convertToType(data['plan_id'], 'Integer');
      }
      if (data.hasOwnProperty('county_id')) {
        obj['county_id'] = ApiClient.convertToType(data['county_id'], 'Integer');
      }
    }
    return obj;
  }


  /**
   * Primary key
   * @member {Integer} id
   */
  exports.prototype['id'] = undefined;

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




  return exports;
}));
