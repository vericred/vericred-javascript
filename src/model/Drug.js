(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './DrugPackage'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./DrugPackage'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.Drug = factory(root.vericred-client.ApiClient, root.vericred-client.DrugPackage);
  }
}(this, function(ApiClient, DrugPackage) {
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

      if (data.hasOwnProperty('ndc')) {
        obj['ndc'] = ApiClient.convertToType(data['ndc'], 'String');
      }
      if (data.hasOwnProperty('non_proprietary_name')) {
        obj['non_proprietary_name'] = ApiClient.convertToType(data['non_proprietary_name'], 'String');
      }
      if (data.hasOwnProperty('packages')) {
        obj['packages'] = ApiClient.convertToType(data['packages'], [DrugPackage]);
      }
      if (data.hasOwnProperty('proprietary_name')) {
        obj['proprietary_name'] = ApiClient.convertToType(data['proprietary_name'], 'String');
      }
    }
    return obj;
  }


  /**
   * National Drug Code ID
   * @member {String} ndc
   */
  exports.prototype['ndc'] = undefined;

  /**
   * Non-proprietary name of drug
   * @member {String} non_proprietary_name
   */
  exports.prototype['non_proprietary_name'] = undefined;

  /**
   * Available retail/prescription packages for this drug
   * @member {Array.<module:model/DrugPackage>} packages
   */
  exports.prototype['packages'] = undefined;

  /**
   * Proprietary name of drug
   * @member {String} proprietary_name
   */
  exports.prototype['proprietary_name'] = undefined;




  return exports;
}));
