(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './Provider'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Provider'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.ProviderShowResponse = factory(root.vericred-client.ApiClient, root.vericred-client.Provider);
  }
}(this, function(ApiClient, Provider) {
  'use strict';

  /**
   * The ProviderShowResponse model module.
   * @module model/ProviderShowResponse
   * @version 0.0.5
   */

  /**
   * Constructs a new <code>ProviderShowResponse</code>.
   * @alias module:model/ProviderShowResponse
   * @class
   */
  var exports = function() {


  };

  /**
   * Constructs a <code>ProviderShowResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProviderShowResponse} obj Optional instance to populate.
   * @return {module:model/ProviderShowResponse} The populated <code>ProviderShowResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('provider')) {
        obj['provider'] = Provider.constructFromObject(data['provider']);
      }
    }
    return obj;
  }


  /**
   * The requested provider.
   * @member {module:model/Provider} provider
   */
  exports.prototype['provider'] = undefined;




  return exports;
}));
