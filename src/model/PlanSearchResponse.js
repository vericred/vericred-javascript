(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './Drug', './Meta', './Plan'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Drug'), require('./Meta'), require('./Plan'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.PlanSearchResponse = factory(root.vericred-client.ApiClient, root.vericred-client.Drug, root.vericred-client.Meta, root.vericred-client.Plan);
  }
}(this, function(ApiClient, Drug, Meta, Plan) {
  'use strict';

  /**
   * The PlanSearchResponse model module.
   * @module model/PlanSearchResponse
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>PlanSearchResponse</code>.
   * @alias module:model/PlanSearchResponse
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>PlanSearchResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PlanSearchResponse} obj Optional instance to populate.
   * @return {module:model/PlanSearchResponse} The populated <code>PlanSearchResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('meta')) {
        obj['meta'] = Meta.constructFromObject(data['meta']);
      }
      if (data.hasOwnProperty('plans')) {
        obj['plans'] = ApiClient.convertToType(data['plans'], [Plan]);
      }
      if (data.hasOwnProperty('coverages')) {
        obj['coverages'] = ApiClient.convertToType(data['coverages'], [Drug]);
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
   * Plan search results
   * @member {Array.<module:model/Plan>} plans
   */
  exports.prototype['plans'] = undefined;

  /**
   * null
   * @member {Array.<module:model/Drug>} coverages
   */
  exports.prototype['coverages'] = undefined;




  return exports;
}));
