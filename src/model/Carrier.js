(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.VericredApi) {
      root.VericredApi = {};
    }
    root.VericredApi.Carrier = factory(root.VericredApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The Carrier model module.
   * @module model/Carrier
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>Carrier</code>.
   * @alias module:model/Carrier
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>Carrier</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Carrier} obj Optional instance to populate.
   * @return {module:model/Carrier} The populated <code>Carrier</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Integer');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('logo_path')) {
        obj['logo_path'] = ApiClient.convertToType(data['logo_path'], 'String');
      }
    }
    return obj;
  }


  /**
   * Primary key
   * @member {Integer} id
   */
  exports.prototype['id'] = undefined;

  /**
   * Name of the Carrier
   * @member {String} name
   */
  exports.prototype['name'] = undefined;

  /**
   * URL for the Carrier's logo
   * @member {String} logo_path
   */
  exports.prototype['logo_path'] = undefined;




  return exports;
}));
