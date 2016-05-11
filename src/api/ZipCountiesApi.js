(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/ZipCountyResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ZipCountyResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.ZipCountiesApi = factory(root.vericred-client.ApiClient, root.vericred-client.ZipCountyResponse);
  }
}(this, function(ApiClient, ZipCountyResponse) {
  'use strict';

  /**
   * ZipCounties service.
   * @module api/ZipCountiesApi
   * @version 0.0.2
   */

  /**
   * Constructs a new ZipCountiesApi. 
   * @alias module:api/ZipCountiesApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getZipCounties operation.
     * @callback module:api/ZipCountiesApi~getZipCountiesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ZipCountyResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} zipPrefix Partial five-digit Zip
     * @param {module:api/ZipCountiesApi~getZipCountiesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ZipCountyResponse}
     */
    this.getZipCounties = function(zipPrefix, callback) {
      var postBody = null;

      // verify the required parameter 'zipPrefix' is set
      if (zipPrefix == undefined || zipPrefix == null) {
        throw "Missing the required parameter 'zipPrefix' when calling getZipCounties";
      }


      var pathParams = {
      };
      var queryParams = {
        'zip_prefix': zipPrefix
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = [];
      var accepts = [];
      var returnType = ZipCountyResponse;

      return this.apiClient.callApi(
        '/zip_counties', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
