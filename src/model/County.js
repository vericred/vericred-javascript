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
    root.VericredApi.County = factory(root.VericredApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The County model module.
   * @module model/County
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>County</code>.
   * @alias module:model/County
   * @class
   */
  var exports = function() {








  };

  /**
   * Constructs a <code>County</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/County} obj Optional instance to populate.
   * @return {module:model/County} The populated <code>County</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Integer');
      }
      if (data.hasOwnProperty('fips_code')) {
        obj['fips_code'] = ApiClient.convertToType(data['fips_code'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('state_code')) {
        obj['state_code'] = ApiClient.convertToType(data['state_code'], 'String');
      }
      if (data.hasOwnProperty('state_id')) {
        obj['state_id'] = ApiClient.convertToType(data['state_id'], 'Integer');
      }
      if (data.hasOwnProperty('state_live')) {
        obj['state_live'] = ApiClient.convertToType(data['state_live'], 'Boolean');
      }
      if (data.hasOwnProperty('state_live_for_business')) {
        obj['state_live_for_business'] = ApiClient.convertToType(data['state_live_for_business'], 'Boolean');
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
   * State FIPS code
   * @member {String} fips_code
   */
  exports.prototype['fips_code'] = undefined;

  /**
   * Human-readable name
   * @member {String} name
   */
  exports.prototype['name'] = undefined;

  /**
   * Two-character state code
   * @member {String} state_code
   */
  exports.prototype['state_code'] = undefined;

  /**
   * state relationship
   * @member {Integer} state_id
   */
  exports.prototype['state_id'] = undefined;

  /**
   * Is the state containing this county active for consumers?
                  *deprecated in favor of last_date_for_individual
   * @member {Boolean} state_live
   */
  exports.prototype['state_live'] = undefined;

  /**
   * Is the state containing this county active for business?
                  *deprecated in favor of last_date_for_shop
   * @member {Boolean} state_live_for_business
   */
  exports.prototype['state_live_for_business'] = undefined;




  return exports;
}));
