(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/InlineResponse2002'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/InlineResponse2002'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.ZipCountiesApi = factory(root.vericred-client.ApiClient, root.vericred-client.InlineResponse2002);
  }
}(this, function(ApiClient, InlineResponse2002) {
  'use strict';

  /**
   * ZipCounties service.
   * @module api/ZipCountiesApi
   * @version 0.0.1
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
     * Callback function to receive the result of the zipCountiesGet operation.
     * @callback module:api/ZipCountiesApi~zipCountiesGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2002} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find Zip Counties by Zip Code
     * ### Finding Zip Code and Fips Code

Our &#x60;Plan&#x60; endpoints require a zip code and a fips (county) code.  This is
because plan pricing requires both of these elements.  Users are unlikely to
know their fips code, so we provide this endpoint to look up a &#x60;ZipCounty&#x60; by
zip code and return both the selected zip and fips codes.


     * @param {String} zipPrefix Partial five-digit Zip
     * @param {module:api/ZipCountiesApi~zipCountiesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/InlineResponse2002}
     */
    this.zipCountiesGet = function(zipPrefix, callback) {
      var postBody = null;

      // verify the required parameter 'zipPrefix' is set
      if (zipPrefix == undefined || zipPrefix == null) {
        throw "Missing the required parameter 'zipPrefix' when calling zipCountiesGet";
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
      var returnType = InlineResponse2002;

      return this.apiClient.callApi(
        '/zip_counties', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
