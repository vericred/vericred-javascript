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
    root.vericred-client.CarrierSubsidiary = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The CarrierSubsidiary model module.
   * @module model/CarrierSubsidiary
   * @version 0.0.5
   */

  /**
   * Constructs a new <code>CarrierSubsidiary</code>.
   * @alias module:model/CarrierSubsidiary
   * @class
   */
  var exports = function() {




  };

  /**
   * Constructs a <code>CarrierSubsidiary</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CarrierSubsidiary} obj Optional instance to populate.
   * @return {module:model/CarrierSubsidiary} The populated <code>CarrierSubsidiary</code> instance.
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
      if (data.hasOwnProperty('alternate_name')) {
        obj['alternate_name'] = ApiClient.convertToType(data['alternate_name'], 'String');
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
   * Subsidiary name
   * @member {String} name
   */
  exports.prototype['name'] = undefined;

  /**
   * Parent Carrier Name
   * @member {String} alternate_name
   */
  exports.prototype['alternate_name'] = undefined;




  return exports;
}));
