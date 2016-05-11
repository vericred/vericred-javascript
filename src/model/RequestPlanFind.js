(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './Applicant', './Provider'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Applicant'), require('./Provider'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.RequestPlanFind = factory(root.vericred-client.ApiClient, root.vericred-client.Applicant, root.vericred-client.Provider);
  }
}(this, function(ApiClient, Applicant, Provider) {
  'use strict';

  /**
   * The RequestPlanFind model module.
   * @module model/RequestPlanFind
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>RequestPlanFind</code>.
   * @alias module:model/RequestPlanFind
   * @class
   */
  var exports = function() {









  };

  /**
   * Constructs a <code>RequestPlanFind</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RequestPlanFind} obj Optional instance to populate.
   * @return {module:model/RequestPlanFind} The populated <code>RequestPlanFind</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('applicants')) {
        obj['applicants'] = ApiClient.convertToType(data['applicants'], [Applicant]);
      }
      if (data.hasOwnProperty('enrollment_date')) {
        obj['enrollment_date'] = ApiClient.convertToType(data['enrollment_date'], 'String');
      }
      if (data.hasOwnProperty('fips_code')) {
        obj['fips_code'] = ApiClient.convertToType(data['fips_code'], 'String');
      }
      if (data.hasOwnProperty('household_income')) {
        obj['household_income'] = ApiClient.convertToType(data['household_income'], 'Integer');
      }
      if (data.hasOwnProperty('household_size')) {
        obj['household_size'] = ApiClient.convertToType(data['household_size'], 'Integer');
      }
      if (data.hasOwnProperty('market')) {
        obj['market'] = ApiClient.convertToType(data['market'], 'String');
      }
      if (data.hasOwnProperty('providers')) {
        obj['providers'] = ApiClient.convertToType(data['providers'], [Provider]);
      }
      if (data.hasOwnProperty('zip_code')) {
        obj['zip_code'] = ApiClient.convertToType(data['zip_code'], 'String');
      }
    }
    return obj;
  }


  /**
   * Applicants for desired plans.
   * @member {Array.<module:model/Applicant>} applicants
   */
  exports.prototype['applicants'] = undefined;

  /**
   * Date of enrollment
   * @member {String} enrollment_date
   */
  exports.prototype['enrollment_date'] = undefined;

  /**
   * County code to determine eligibility
   * @member {String} fips_code
   */
  exports.prototype['fips_code'] = undefined;

  /**
   * Total household income.
   * @member {Integer} household_income
   */
  exports.prototype['household_income'] = undefined;

  /**
   * Number of people living in household.
   * @member {Integer} household_size
   */
  exports.prototype['household_size'] = undefined;

  /**
   * Type of plan to search for.
   * @member {String} market
   */
  exports.prototype['market'] = undefined;

  /**
   * List of providers to search for.
   * @member {Array.<module:model/Provider>} providers
   */
  exports.prototype['providers'] = undefined;

  /**
   * 5-digit zip code - this helps determine pricing.
   * @member {String} zip_code
   */
  exports.prototype['zip_code'] = undefined;




  return exports;
}));
