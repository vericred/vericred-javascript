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
    root.vericred-client.DrugCoverage = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The DrugCoverage model module.
   * @module model/DrugCoverage
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>DrugCoverage</code>.
   * @alias module:model/DrugCoverage
   * @class
   */
  var exports = function() {







  };

  /**
   * Constructs a <code>DrugCoverage</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DrugCoverage} obj Optional instance to populate.
   * @return {module:model/DrugCoverage} The populated <code>DrugCoverage</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('ndc_package_code')) {
        obj['ndc_package_code'] = ApiClient.convertToType(data['ndc_package_code'], 'String');
      }
      if (data.hasOwnProperty('plan_id')) {
        obj['plan_id'] = ApiClient.convertToType(data['plan_id'], 'String');
      }
      if (data.hasOwnProperty('prior_authorization')) {
        obj['prior_authorization'] = ApiClient.convertToType(data['prior_authorization'], 'Boolean');
      }
      if (data.hasOwnProperty('quantity_limit')) {
        obj['quantity_limit'] = ApiClient.convertToType(data['quantity_limit'], 'Boolean');
      }
      if (data.hasOwnProperty('step_therapy')) {
        obj['step_therapy'] = ApiClient.convertToType(data['step_therapy'], 'Boolean');
      }
      if (data.hasOwnProperty('tier')) {
        obj['tier'] = ApiClient.convertToType(data['tier'], 'String');
      }
    }
    return obj;
  }


  /**
   * NDC package code
   * @member {String} ndc_package_code
   */
  exports.prototype['ndc_package_code'] = undefined;

  /**
   * Health Insurance Oversight System id
   * @member {String} plan_id
   */
  exports.prototype['plan_id'] = undefined;

  /**
   * Prior authorization required
   * @member {Boolean} prior_authorization
   * @default false
   */
  exports.prototype['prior_authorization'] = false;

  /**
   * Quantity limit exists
   * @member {Boolean} quantity_limit
   * @default false
   */
  exports.prototype['quantity_limit'] = false;

  /**
   * Step Treatment required
   * @member {Boolean} step_therapy
   * @default false
   */
  exports.prototype['step_therapy'] = false;

  /**
   * Tier Name
   * @member {String} tier
   */
  exports.prototype['tier'] = undefined;




  return exports;
}));
