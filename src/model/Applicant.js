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
    root.vericred-client.Applicant = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The Applicant model module.
   * @module model/Applicant
   * @version 0.0.5
   */

  /**
   * Constructs a new <code>Applicant</code>.
   * @alias module:model/Applicant
   * @class
   */
  var exports = function() {








  };

  /**
   * Constructs a <code>Applicant</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Applicant} obj Optional instance to populate.
   * @return {module:model/Applicant} The populated <code>Applicant</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Integer');
      }
      if (data.hasOwnProperty('dob')) {
        obj['dob'] = ApiClient.convertToType(data['dob'], 'Date');
      }
      if (data.hasOwnProperty('member_id')) {
        obj['member_id'] = ApiClient.convertToType(data['member_id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('relationship')) {
        obj['relationship'] = ApiClient.convertToType(data['relationship'], 'String');
      }
      if (data.hasOwnProperty('smoker')) {
        obj['smoker'] = ApiClient.convertToType(data['smoker'], 'Boolean');
      }
      if (data.hasOwnProperty('ssn')) {
        obj['ssn'] = ApiClient.convertToType(data['ssn'], 'String');
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
   * Date of Birth
   * @member {Date} dob
   */
  exports.prototype['dob'] = undefined;

  /**
   * Member token
   * @member {String} member_id
   */
  exports.prototype['member_id'] = undefined;

  /**
   * Full name of the Applicant
   * @member {String} name
   */
  exports.prototype['name'] = undefined;

  /**
   * Relationship of the Applicant to the Member
   * @member {String} relationship
   */
  exports.prototype['relationship'] = undefined;

  /**
   * Does the Applicant smoke?
   * @member {Boolean} smoker
   */
  exports.prototype['smoker'] = undefined;

  /**
   * Applicant's Social Security Number
   * @member {String} ssn
   */
  exports.prototype['ssn'] = undefined;




  return exports;
}));
