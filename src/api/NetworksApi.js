(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/NetworkSearchResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/NetworkSearchResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.NetworksApi = factory(root.vericred-client.ApiClient, root.vericred-client.NetworkSearchResponse);
  }
}(this, function(ApiClient, NetworkSearchResponse) {
  'use strict';

  /**
   * Networks service.
   * @module api/NetworksApi
   * @version 0.0.4
   */

  /**
   * Constructs a new NetworksApi. 
   * @alias module:api/NetworksApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the listNetworks operation.
     * @callback module:api/NetworksApi~listNetworksCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NetworkSearchResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Networks
     * A network is a list of the doctors, other health care providers,
and hospitals that a plan has contracted with to provide medical care to
its members.
     * @param {String} carrierId Carrier HIOS Issuer ID
     * @param {module:api/NetworksApi~listNetworksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/NetworkSearchResponse}
     */
    this.listNetworks = function(carrierId, callback) {
      var postBody = null;

      // verify the required parameter 'carrierId' is set
      if (carrierId == undefined || carrierId == null) {
        throw "Missing the required parameter 'carrierId' when calling listNetworks";
      }


      var pathParams = {
      };
      var queryParams = {
        'carrier_id': carrierId
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = NetworkSearchResponse;

      return this.apiClient.callApi(
        '/networks', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
