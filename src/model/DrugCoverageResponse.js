(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './DrugCoverage', './Meta'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./DrugCoverage'), require('./Meta'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.DrugCoverageResponse = factory(root.vericred-client.ApiClient, root.vericred-client.DrugCoverage, root.vericred-client.Meta);
  }
}(this, function(ApiClient, DrugCoverage, Meta) {
  'use strict';

  /**
   * The DrugCoverageResponse model module.
   * @module model/DrugCoverageResponse
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>DrugCoverageResponse</code>.
   * @alias module:model/DrugCoverageResponse
   * @class
   */
  var exports = function() {



  };

  /**
   * Constructs a <code>DrugCoverageResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DrugCoverageResponse} obj Optional instance to populate.
   * @return {module:model/DrugCoverageResponse} The populated <code>DrugCoverageResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('coverages')) {
        obj['coverages'] = ApiClient.convertToType(data['coverages'], [DrugCoverage]);
      }
      if (data.hasOwnProperty('meta')) {
        obj['meta'] = Meta.constructFromObject(data['meta']);
      }
    }
    return obj;
  }


  /**
   * DrugCoverage search results
   * @member {Array.<module:model/DrugCoverage>} coverages
   */
  exports.prototype['coverages'] = undefined;

  /**
   * Metadata for query
   * @member {module:model/Meta} meta
   */
  exports.prototype['meta'] = undefined;




  return exports;
}));
