(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './Meta', './Network'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Meta'), require('./Network'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.NetworkSearchResponse = factory(root.vericred-client.ApiClient, root.vericred-client.Meta, root.vericred-client.Network);
  }
}(this, function(ApiClient, Meta, Network) {
  'use strict';

  /**
   * The NetworkSearchResponse model module.
   * @module model/NetworkSearchResponse
   * @version 0.0.5
   */

  /**
   * Constructs a new <code>NetworkSearchResponse</code>.
   * @alias module:model/NetworkSearchResponse
   * @class
   */
  var exports = function() {



  };

  /**
   * Constructs a <code>NetworkSearchResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/NetworkSearchResponse} obj Optional instance to populate.
   * @return {module:model/NetworkSearchResponse} The populated <code>NetworkSearchResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('meta')) {
        obj['meta'] = Meta.constructFromObject(data['meta']);
      }
      if (data.hasOwnProperty('networks')) {
        obj['networks'] = ApiClient.convertToType(data['networks'], [Network]);
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
   * Networks that fit the requested criterion.
   * @member {Array.<module:model/Network>} networks
   */
  exports.prototype['networks'] = undefined;




  return exports;
}));
