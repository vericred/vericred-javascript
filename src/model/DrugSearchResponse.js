(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './Drug', './DrugPackage', './Meta'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Drug'), require('./DrugPackage'), require('./Meta'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.DrugSearchResponse = factory(root.vericred-client.ApiClient, root.vericred-client.Drug, root.vericred-client.DrugPackage, root.vericred-client.Meta);
  }
}(this, function(ApiClient, Drug, DrugPackage, Meta) {
  'use strict';

  /**
   * The DrugSearchResponse model module.
   * @module model/DrugSearchResponse
   * @version 0.0.3
   */

  /**
   * Constructs a new <code>DrugSearchResponse</code>.
   * @alias module:model/DrugSearchResponse
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>DrugSearchResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DrugSearchResponse} obj Optional instance to populate.
   * @return {module:model/DrugSearchResponse} The populated <code>DrugSearchResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('meta')) {
        obj['meta'] = Meta.constructFromObject(data['meta']);
      }
      if (data.hasOwnProperty('drugs')) {
        obj['drugs'] = ApiClient.convertToType(data['drugs'], [Drug]);
      }
      if (data.hasOwnProperty('drug_packages')) {
        obj['drug_packages'] = ApiClient.convertToType(data['drug_packages'], [DrugPackage]);
      }
    }
    return obj;
  }


  /**
   * Metadata for query
   * @member {module:model/Meta} meta
   */
  exports.prototype['meta'] = undefined;

  /**
   * Drugs found in query
   * @member {Array.<module:model/Drug>} drugs
   */
  exports.prototype['drugs'] = undefined;

  /**
   * DrugPackages
   * @member {Array.<module:model/DrugPackage>} drug_packages
   */
  exports.prototype['drug_packages'] = undefined;




  return exports;
}));
