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
    root.vericred-client.RatingArea = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The RatingArea model module.
   * @module model/RatingArea
   * @version 0.0.5
   */

  /**
   * Constructs a new <code>RatingArea</code>.
   * @alias module:model/RatingArea
   * @class
   */
  var exports = function() {



  };

  /**
   * Constructs a <code>RatingArea</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RatingArea} obj Optional instance to populate.
   * @return {module:model/RatingArea} The populated <code>RatingArea</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('state_id')) {
        obj['state_id'] = ApiClient.convertToType(data['state_id'], 'String');
      }
    }
    return obj;
  }


  /**
   * Name of the Rating Area
   * @member {String} id
   */
  exports.prototype['id'] = undefined;

  /**
   * State Code
   * @member {String} state_id
   */
  exports.prototype['state_id'] = undefined;




  return exports;
}));
