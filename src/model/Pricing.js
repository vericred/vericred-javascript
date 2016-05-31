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
   * @version 0.0.3
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
      if (data.hasOwnProperty('premium_child_only')) {
        obj['premium_child_only'] = ApiClient.convertToType(data['premium_child_only'], 'Number');
      }
      if (data.hasOwnProperty('premium_family')) {
        obj['premium_family'] = ApiClient.convertToType(data['premium_family'], 'Number');
      }
      if (data.hasOwnProperty('premium_single')) {
        obj['premium_single'] = ApiClient.convertToType(data['premium_single'], 'Number');
      }
      if (data.hasOwnProperty('premium_single_and_children')) {
        obj['premium_single_and_children'] = ApiClient.convertToType(data['premium_single_and_children'], 'Number');
      }
      if (data.hasOwnProperty('premium_single_and_spouse')) {
        obj['premium_single_and_spouse'] = ApiClient.convertToType(data['premium_single_and_spouse'], 'Number');
      }
      if (data.hasOwnProperty('premium_single_smoker')) {
        obj['premium_single_smoker'] = ApiClient.convertToType(data['premium_single_smoker'], 'Number');
      }
      if (data.hasOwnProperty('rating_area_id')) {
        obj['rating_area_id'] = ApiClient.convertToType(data['rating_area_id'], 'String');
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
   * Child-only premium
   * @member {Number} premium_child_only
   */
  exports.prototype['premium_child_only'] = undefined;

  /**
   * Family premium
   * @member {Number} premium_family
   */
  exports.prototype['premium_family'] = undefined;

  /**
   * Single-person premium
   * @member {Number} premium_single
   */
  exports.prototype['premium_single'] = undefined;

  /**
   * Single person including children premium
   * @member {Number} premium_single_and_children
   */
  exports.prototype['premium_single_and_children'] = undefined;

  /**
   * Person with spouse premium
   * @member {Number} premium_single_and_spouse
   */
  exports.prototype['premium_single_and_spouse'] = undefined;

  /**
   * Premium for single smoker
   * @member {Number} premium_single_smoker
   */
  exports.prototype['premium_single_smoker'] = undefined;

  /**
   * Foreign key to rating areas
   * @member {String} rating_area_id
   */
  exports.prototype['rating_area_id'] = undefined;




  return exports;
}));
