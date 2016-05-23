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
    root.vericred-client.RequestPlanFindApplicant = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The RequestPlanFindApplicant model module.
   * @module model/RequestPlanFindApplicant
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>RequestPlanFindApplicant</code>.
   * @alias module:model/RequestPlanFindApplicant
   * @class
   */
  var exports = function() {


  };

  /**
   * Constructs a <code>RequestPlanFindApplicant</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RequestPlanFindApplicant} obj Optional instance to populate.
   * @return {module:model/RequestPlanFindApplicant} The populated <code>RequestPlanFindApplicant</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('age')) {
        obj['age'] = ApiClient.convertToType(data['age'], 'Integer');
      }
    }
    return obj;
  }


  /**
   * Age of applicant to search for
   * @member {Integer} age
   */
  exports.prototype['age'] = undefined;




  return exports;
}));
