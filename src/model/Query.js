(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './Applicant'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Applicant'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.Query = factory(root.vericred-client.ApiClient, root.vericred-client.Applicant);
  }
}(this, function(ApiClient, Applicant) {
  'use strict';

  /**
   * The Query model module.
   * @module model/Query
   * @version 0.0.1
   */

  /**
   * Constructs a new <code>Query</code>.
   * @alias module:model/Query
   * @class
   */
  var exports = function() {









  };

  /**
   * Constructs a <code>Query</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Query} obj Optional instance to populate.
   * @return {module:model/Query} The populated <code>Query</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('applicants')) {
        obj['applicants'] = ApiClient.convertToType(data['applicants'], [Applicant]);
      }
      if (data.hasOwnProperty('enrollment_date')) {
        obj['enrollment_date'] = ApiClient.convertToType(data['enrollment_date'], 'Date');
      }
      if (data.hasOwnProperty('fips_code')) {
        obj['fips_code'] = ApiClient.convertToType(data['fips_code'], 'String');
      }
      if (data.hasOwnProperty('household_income')) {
        obj['household_income'] = ApiClient.convertToType(data['household_income'], 'String');
      }
      if (data.hasOwnProperty('household_size')) {
        obj['household_size'] = ApiClient.convertToType(data['household_size'], 'String');
      }
      if (data.hasOwnProperty('market')) {
        obj['market'] = ApiClient.convertToType(data['market'], 'String');
      }
      if (data.hasOwnProperty('providers')) {
        obj['providers'] = ApiClient.convertToType(data['providers'], ['String']);
      }
      if (data.hasOwnProperty('zip_code')) {
        obj['zip_code'] = ApiClient.convertToType(data['zip_code'], 'String');
      }
    }
    return obj;
  }


  /**
   * @member {Array.<module:model/Applicant>} applicants
   */
  exports.prototype['applicants'] = undefined;

  /**
   * @member {Date} enrollment_date
   */
  exports.prototype['enrollment_date'] = undefined;

  /**
   * @member {String} fips_code
   */
  exports.prototype['fips_code'] = undefined;

  /**
   * @member {String} household_income
   */
  exports.prototype['household_income'] = undefined;

  /**
   * @member {String} household_size
   */
  exports.prototype['household_size'] = undefined;

  /**
   * @member {String} market
   */
  exports.prototype['market'] = undefined;

  /**
   * @member {Array.<String>} providers
   */
  exports.prototype['providers'] = undefined;

  /**
   * @member {String} zip_code
   */
  exports.prototype['zip_code'] = undefined;




  return exports;
}));
