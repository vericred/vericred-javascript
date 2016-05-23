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
    root.vericred-client.State = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The State model module.
   * @module model/State
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>State</code>.
   * @alias module:model/State
   * @class
   */
  var exports = function() {









  };

  /**
   * Constructs a <code>State</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/State} obj Optional instance to populate.
   * @return {module:model/State} The populated <code>State</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Integer');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'String');
      }
      if (data.hasOwnProperty('fips_number')) {
        obj['fips_number'] = ApiClient.convertToType(data['fips_number'], 'String');
      }
      if (data.hasOwnProperty('last_date_for_individual')) {
        obj['last_date_for_individual'] = ApiClient.convertToType(data['last_date_for_individual'], 'Date');
      }
      if (data.hasOwnProperty('last_date_for_shop')) {
        obj['last_date_for_shop'] = ApiClient.convertToType(data['last_date_for_shop'], 'Date');
      }
      if (data.hasOwnProperty('live_for_business')) {
        obj['live_for_business'] = ApiClient.convertToType(data['live_for_business'], 'Boolean');
      }
      if (data.hasOwnProperty('live_for_consumers')) {
        obj['live_for_consumers'] = ApiClient.convertToType(data['live_for_consumers'], 'Boolean');
      }
    }
    return obj;
  }


  /**
   * Primary Key of State
   * @member {Integer} id
   */
  exports.prototype['id'] = undefined;

  /**
   * Name of state
   * @member {String} name
   */
  exports.prototype['name'] = undefined;

  /**
   * 2 letter code for state
   * @member {String} code
   */
  exports.prototype['code'] = undefined;

  /**
   * National FIPs number
   * @member {String} fips_number
   */
  exports.prototype['fips_number'] = undefined;

  /**
   * Last date this state is live for individuals
   * @member {Date} last_date_for_individual
   */
  exports.prototype['last_date_for_individual'] = undefined;

  /**
   * Last date this state is live for shop
   * @member {Date} last_date_for_shop
   */
  exports.prototype['last_date_for_shop'] = undefined;

  /**
   * Is this State available for businesses
   * @member {Boolean} live_for_business
   */
  exports.prototype['live_for_business'] = undefined;

  /**
   * Is this State available for individuals
   * @member {Boolean} live_for_consumers
   */
  exports.prototype['live_for_consumers'] = undefined;




  return exports;
}));
