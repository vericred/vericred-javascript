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
    root.vericred-client.Provider = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The Provider model module.
   * @module model/Provider
   * @version 0.0.3
   */

  /**
   * Constructs a new <code>Provider</code>.
   * @alias module:model/Provider
   * @class
   */
  var exports = function() {





























  };

  /**
   * Constructs a <code>Provider</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Provider} obj Optional instance to populate.
   * @return {module:model/Provider} The populated <code>Provider</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('accepting_change_of_payor_patients')) {
        obj['accepting_change_of_payor_patients'] = ApiClient.convertToType(data['accepting_change_of_payor_patients'], 'Boolean');
      }
      if (data.hasOwnProperty('accepting_medicaid_patients')) {
        obj['accepting_medicaid_patients'] = ApiClient.convertToType(data['accepting_medicaid_patients'], 'Boolean');
      }
      if (data.hasOwnProperty('accepting_medicare_patients')) {
        obj['accepting_medicare_patients'] = ApiClient.convertToType(data['accepting_medicare_patients'], 'Boolean');
      }
      if (data.hasOwnProperty('accepting_private_patients')) {
        obj['accepting_private_patients'] = ApiClient.convertToType(data['accepting_private_patients'], 'Boolean');
      }
      if (data.hasOwnProperty('accepting_referral_patients')) {
        obj['accepting_referral_patients'] = ApiClient.convertToType(data['accepting_referral_patients'], 'Boolean');
      }
      if (data.hasOwnProperty('city')) {
        obj['city'] = ApiClient.convertToType(data['city'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('gender')) {
        obj['gender'] = ApiClient.convertToType(data['gender'], 'String');
      }
      if (data.hasOwnProperty('first_name')) {
        obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
      }
      if (data.hasOwnProperty('hios_ids')) {
        obj['hios_ids'] = ApiClient.convertToType(data['hios_ids'], ['String']);
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Integer');
      }
      if (data.hasOwnProperty('last_name')) {
        obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
      }
      if (data.hasOwnProperty('latitude')) {
        obj['latitude'] = ApiClient.convertToType(data['latitude'], 'Number');
      }
      if (data.hasOwnProperty('longitude')) {
        obj['longitude'] = ApiClient.convertToType(data['longitude'], 'Number');
      }
      if (data.hasOwnProperty('middle_name')) {
        obj['middle_name'] = ApiClient.convertToType(data['middle_name'], 'String');
      }
      if (data.hasOwnProperty('network_ids')) {
        obj['network_ids'] = ApiClient.convertToType(data['network_ids'], ['Integer']);
      }
      if (data.hasOwnProperty('personal_phone')) {
        obj['personal_phone'] = ApiClient.convertToType(data['personal_phone'], 'String');
      }
      if (data.hasOwnProperty('phone')) {
        obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
      }
      if (data.hasOwnProperty('presentation_name')) {
        obj['presentation_name'] = ApiClient.convertToType(data['presentation_name'], 'String');
      }
      if (data.hasOwnProperty('specialty')) {
        obj['specialty'] = ApiClient.convertToType(data['specialty'], 'String');
      }
      if (data.hasOwnProperty('state')) {
        obj['state'] = ApiClient.convertToType(data['state'], 'String');
      }
      if (data.hasOwnProperty('state_id')) {
        obj['state_id'] = ApiClient.convertToType(data['state_id'], 'Integer');
      }
      if (data.hasOwnProperty('street_line_1')) {
        obj['street_line_1'] = ApiClient.convertToType(data['street_line_1'], 'String');
      }
      if (data.hasOwnProperty('street_line_2')) {
        obj['street_line_2'] = ApiClient.convertToType(data['street_line_2'], 'String');
      }
      if (data.hasOwnProperty('suffix')) {
        obj['suffix'] = ApiClient.convertToType(data['suffix'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('zip_code')) {
        obj['zip_code'] = ApiClient.convertToType(data['zip_code'], 'String');
      }
    }
    return obj;
  }


  /**
   * Is this provider accepting patients with a change of insurance?
   * @member {Boolean} accepting_change_of_payor_patients
   */
  exports.prototype['accepting_change_of_payor_patients'] = undefined;

  /**
   * Is this provider accepting new Medicaid patients?
   * @member {Boolean} accepting_medicaid_patients
   */
  exports.prototype['accepting_medicaid_patients'] = undefined;

  /**
   * Is this provider accepting new Medicare patients?
   * @member {Boolean} accepting_medicare_patients
   */
  exports.prototype['accepting_medicare_patients'] = undefined;

  /**
   * Is this provider accepting new patients with private insurance?
   * @member {Boolean} accepting_private_patients
   */
  exports.prototype['accepting_private_patients'] = undefined;

  /**
   * Is this provider accepting new patients via referrals?
   * @member {Boolean} accepting_referral_patients
   */
  exports.prototype['accepting_referral_patients'] = undefined;

  /**
   * City name (e.g. Springfield).
   * @member {String} city
   */
  exports.prototype['city'] = undefined;

  /**
   * Primary email address to contact the provider.
   * @member {String} email
   */
  exports.prototype['email'] = undefined;

  /**
   * Provider's gender (M or F)
   * @member {String} gender
   */
  exports.prototype['gender'] = undefined;

  /**
   * Given name for the provider.
   * @member {String} first_name
   */
  exports.prototype['first_name'] = undefined;

  /**
   * List of HIOS ids for this provider
   * @member {Array.<String>} hios_ids
   */
  exports.prototype['hios_ids'] = undefined;

  /**
   * National Provider Index (NPI) number
   * @member {Integer} id
   */
  exports.prototype['id'] = undefined;

  /**
   * Family name for the provider.
   * @member {String} last_name
   */
  exports.prototype['last_name'] = undefined;

  /**
   * Latitude of provider
   * @member {Number} latitude
   */
  exports.prototype['latitude'] = undefined;

  /**
   * Longitude of provider
   * @member {Number} longitude
   */
  exports.prototype['longitude'] = undefined;

  /**
   * Middle name for the provider.
   * @member {String} middle_name
   */
  exports.prototype['middle_name'] = undefined;

  /**
   * Array of network ids
   * @member {Array.<Integer>} network_ids
   */
  exports.prototype['network_ids'] = undefined;

  /**
   * Personal contact phone for the provider.
   * @member {String} personal_phone
   */
  exports.prototype['personal_phone'] = undefined;

  /**
   * Office phone for the provider
   * @member {String} phone
   */
  exports.prototype['phone'] = undefined;

  /**
   * Preferred name for display (e.g. Dr. Francis White may prefer Dr. Frank White)
   * @member {String} presentation_name
   */
  exports.prototype['presentation_name'] = undefined;

  /**
   * Name of the primary Specialty
   * @member {String} specialty
   */
  exports.prototype['specialty'] = undefined;

  /**
   * State code for the provider's address (e.g. NY).
   * @member {String} state
   */
  exports.prototype['state'] = undefined;

  /**
   * Foreign key to States
   * @member {Integer} state_id
   */
  exports.prototype['state_id'] = undefined;

  /**
   * First line of the provider's street address.
   * @member {String} street_line_1
   */
  exports.prototype['street_line_1'] = undefined;

  /**
   * Second line of the provider's street address.
   * @member {String} street_line_2
   */
  exports.prototype['street_line_2'] = undefined;

  /**
   * Suffix for the provider's name (e.g. Jr)
   * @member {String} suffix
   */
  exports.prototype['suffix'] = undefined;

  /**
   * Professional title for the provider (e.g. Dr).
   * @member {String} title
   */
  exports.prototype['title'] = undefined;

  /**
   * Type of NPI number (individual provider vs organization).
   * @member {String} type
   */
  exports.prototype['type'] = undefined;

  /**
   * Postal code for the provider's address (e.g. 11215)
   * @member {String} zip_code
   */
  exports.prototype['zip_code'] = undefined;




  return exports;
}));
