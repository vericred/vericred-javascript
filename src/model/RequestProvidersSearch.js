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
    root.vericred-client.RequestProvidersSearch = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The RequestProvidersSearch model module.
   * @module model/RequestProvidersSearch
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>RequestProvidersSearch</code>.
   * @alias module:model/RequestProvidersSearch
   * @class
   */
  var exports = function() {









  };

  /**
   * Constructs a <code>RequestProvidersSearch</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RequestProvidersSearch} obj Optional instance to populate.
   * @return {module:model/RequestProvidersSearch} The populated <code>RequestProvidersSearch</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('accepts_insurance')) {
        obj['accepts_insurance'] = ApiClient.convertToType(data['accepts_insurance'], 'Boolean');
      }
      if (data.hasOwnProperty('hios_ids')) {
        obj['hios_ids'] = ApiClient.convertToType(data['hios_ids'], ['String']);
      }
      if (data.hasOwnProperty('page')) {
        obj['page'] = ApiClient.convertToType(data['page'], 'Integer');
      }
      if (data.hasOwnProperty('per_page')) {
        obj['per_page'] = ApiClient.convertToType(data['per_page'], 'Integer');
      }
      if (data.hasOwnProperty('radius')) {
        obj['radius'] = ApiClient.convertToType(data['radius'], 'Integer');
      }
      if (data.hasOwnProperty('search_term')) {
        obj['search_term'] = ApiClient.convertToType(data['search_term'], 'String');
      }
      if (data.hasOwnProperty('zip_code')) {
        obj['zip_code'] = ApiClient.convertToType(data['zip_code'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }


  /**
   * Limit results to Providers who accept at least one insurance
        plan.  Note that the inverse of this filter is not supported and
        any value will evaluate to true
   * @member {Boolean} accepts_insurance
   */
  exports.prototype['accepts_insurance'] = undefined;

  /**
   * List of HIOS ids
   * @member {Array.<String>} hios_ids
   */
  exports.prototype['hios_ids'] = undefined;

  /**
   * Page number
   * @member {Integer} page
   */
  exports.prototype['page'] = undefined;

  /**
   * Number of records to return per page
   * @member {Integer} per_page
   */
  exports.prototype['per_page'] = undefined;

  /**
   * Radius (in miles) to use to limit results
   * @member {Integer} radius
   */
  exports.prototype['radius'] = undefined;

  /**
   * String to search by
   * @member {String} search_term
   */
  exports.prototype['search_term'] = undefined;

  /**
   * Zip Code to search near
   * @member {String} zip_code
   */
  exports.prototype['zip_code'] = undefined;

  /**
   * Either organization or individual
   * @member {String} type
   */
  exports.prototype['type'] = undefined;




  return exports;
}));
