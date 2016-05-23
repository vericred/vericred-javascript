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
    root.vericred-client.Drug = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The Drug model module.
   * @module model/Drug
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>Drug</code>.
   * @alias module:model/Drug
   * @class
   */
  var exports = function() {





  };

  /**
   * Constructs a <code>Drug</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Drug} obj Optional instance to populate.
   * @return {module:model/Drug} The populated <code>Drug</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('proprietary_name')) {
        obj['proprietary_name'] = ApiClient.convertToType(data['proprietary_name'], 'String');
      }
      if (data.hasOwnProperty('non_proprietary_name')) {
        obj['non_proprietary_name'] = ApiClient.convertToType(data['non_proprietary_name'], 'String');
      }
      if (data.hasOwnProperty('drug_package_ids')) {
        obj['drug_package_ids'] = ApiClient.convertToType(data['drug_package_ids'], ['String']);
      }
    }
    return obj;
  }


  /**
   * National Drug Code ID
   * @member {String} id
   */
  exports.prototype['id'] = undefined;

  /**
   * Proprietary name of drug
   * @member {String} proprietary_name
   */
  exports.prototype['proprietary_name'] = undefined;

  /**
   * Non-proprietary name of drug
   * @member {String} non_proprietary_name
   */
  exports.prototype['non_proprietary_name'] = undefined;

  /**
   * Array of drug package Ids
   * @member {Array.<String>} drug_package_ids
   */
  exports.prototype['drug_package_ids'] = undefined;




  return exports;
}));
