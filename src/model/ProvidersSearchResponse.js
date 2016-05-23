(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './Meta', './Provider', './State'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Meta'), require('./Provider'), require('./State'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.ProvidersSearchResponse = factory(root.vericred-client.ApiClient, root.vericred-client.Meta, root.vericred-client.Provider, root.vericred-client.State);
  }
}(this, function(ApiClient, Meta, Provider, State) {
  'use strict';

  /**
   * The ProvidersSearchResponse model module.
   * @module model/ProvidersSearchResponse
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>ProvidersSearchResponse</code>.
   * @alias module:model/ProvidersSearchResponse
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>ProvidersSearchResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProvidersSearchResponse} obj Optional instance to populate.
   * @return {module:model/ProvidersSearchResponse} The populated <code>ProvidersSearchResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('meta')) {
        obj['meta'] = Meta.constructFromObject(data['meta']);
      }
      if (data.hasOwnProperty('providers')) {
        obj['providers'] = ApiClient.convertToType(data['providers'], [Provider]);
      }
      if (data.hasOwnProperty('states')) {
        obj['states'] = ApiClient.convertToType(data['states'], [State]);
      }
    }
    return obj;
  }


  /**
   * Meta-data about the response.
   * @member {module:model/Meta} meta
   */
  exports.prototype['meta'] = undefined;

  /**
   * Providers that fit the requested criterion.
   * @member {Array.<module:model/Provider>} providers
   */
  exports.prototype['providers'] = undefined;

  /**
   * States that fit the requested criterion.
   * @member {Array.<module:model/State>} states
   */
  exports.prototype['states'] = undefined;




  return exports;
}));
