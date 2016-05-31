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
    root.vericred-client.ZipCountyBulk = factory(root.vericred-client.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The ZipCountyBulk model module.
   * @module model/ZipCountyBulk
   * @version 0.0.3
   */

  /**
   * Constructs a new <code>ZipCountyBulk</code>.
   * @alias module:model/ZipCountyBulk
   * @class
   */
  var exports = function() {





  };

  /**
   * Constructs a <code>ZipCountyBulk</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ZipCountyBulk} obj Optional instance to populate.
   * @return {module:model/ZipCountyBulk} The populated <code>ZipCountyBulk</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Integer');
      }
      if (data.hasOwnProperty('rating_area_id')) {
        obj['rating_area_id'] = ApiClient.convertToType(data['rating_area_id'], 'String');
      }
      if (data.hasOwnProperty('county_id')) {
        obj['county_id'] = ApiClient.convertToType(data['county_id'], 'String');
      }
      if (data.hasOwnProperty('zip_code_id')) {
        obj['zip_code_id'] = ApiClient.convertToType(data['zip_code_id'], 'String');
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
   * Foreign key for rating area
   * @member {String} rating_area_id
   */
  exports.prototype['rating_area_id'] = undefined;

  /**
   * Foreign key for county (fips code)
   * @member {String} county_id
   */
  exports.prototype['county_id'] = undefined;

  /**
   * Foreign key for zip code (zip code)
   * @member {String} zip_code_id
   */
  exports.prototype['zip_code_id'] = undefined;




  return exports;
}));
