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
    root.vericred-client.Pricing = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The Pricing model module.
   * @module model/Pricing
   * @version 0.0.1
   */

  /**
   * Constructs a new <code>Pricing</code>.
   * @alias module:model/Pricing
   * @class
   */
  var exports = function() {






  };

  /**
   * Constructs a <code>Pricing</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Pricing} obj Optional instance to populate.
   * @return {module:model/Pricing} The populated <code>Pricing</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('age')) {
        obj['age'] = ApiClient.convertToType(data['age'], 'Integer');
      }
      if (data.hasOwnProperty('effective_date')) {
        obj['effective_date'] = ApiClient.convertToType(data['effective_date'], 'Date');
      }
      if (data.hasOwnProperty('expiration_date')) {
        obj['expiration_date'] = ApiClient.convertToType(data['expiration_date'], 'Date');
      }
      if (data.hasOwnProperty('plan_id')) {
        obj['plan_id'] = ApiClient.convertToType(data['plan_id'], 'Integer');
      }
      if (data.hasOwnProperty('rating_area_id')) {
        obj['rating_area_id'] = ApiClient.convertToType(data['rating_area_id'], 'Integer');
      }
    }
    return obj;
  }


  /**
   * Age of applicant
   * @member {Integer} age
   */
  exports.prototype['age'] = undefined;

  /**
   * Effective date of plan
   * @member {Date} effective_date
   */
  exports.prototype['effective_date'] = undefined;

  /**
   * Plan expiration date
   * @member {Date} expiration_date
   */
  exports.prototype['expiration_date'] = undefined;

  /**
   * Foreign key to plans
   * @member {Integer} plan_id
   */
  exports.prototype['plan_id'] = undefined;

  /**
   * Foreign key to rating areas
   * @member {Integer} rating_area_id
   */
  exports.prototype['rating_area_id'] = undefined;




  return exports;
}));
