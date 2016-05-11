(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/ProviderResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ProviderResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.ProvidersApi = factory(root.vericred-client.ApiClient, root.vericred-client.ProviderResponse);
  }
}(this, function(ApiClient, ProviderResponse) {
  'use strict';

  /**
   * Providers service.
   * @module api/ProvidersApi
   * @version 0.0.2
   */

  /**
   * Constructs a new ProvidersApi. 
   * @alias module:api/ProvidersApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getProviders operation.
     * @callback module:api/ProvidersApi~getProvidersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProviderResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} searchTerm String to search by
     * @param {String} zipCode Zip Code to search near
     * @param {Object} opts Optional parameters
     * @param {String} opts.acceptsInsurance Limit results to Providers who accept at least one insurance plan.  Note that the inverse of this filter is not supported and any value will evaluate to true
     * @param {String} opts.page Page number
     * @param {String} opts.perPage Number of records to return per page
     * @param {String} opts.radius Radius (in miles) to use to limit results
     * @param {String} opts.type Either organization or individual
     * @param {module:api/ProvidersApi~getProvidersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ProviderResponse}
     */
    this.getProviders = function(searchTerm, zipCode, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'searchTerm' is set
      if (searchTerm == undefined || searchTerm == null) {
        throw "Missing the required parameter 'searchTerm' when calling getProviders";
      }

      // verify the required parameter 'zipCode' is set
      if (zipCode == undefined || zipCode == null) {
        throw "Missing the required parameter 'zipCode' when calling getProviders";
      }


      var pathParams = {
      };
      var queryParams = {
        'accepts_insurance': opts['acceptsInsurance'],
        'page': opts['page'],
        'per_page': opts['perPage'],
        'radius': opts['radius'],
        'search_term': searchTerm,
        'zip_code': zipCode,
        'type': opts['type']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = [];
      var accepts = [];
      var returnType = ProviderResponse;

      return this.apiClient.callApi(
        '/providers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProvidersNpi operation.
     * @callback module:api/ProvidersApi~getProvidersNpiCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProviderResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} npi NPI number
     * @param {module:api/ProvidersApi~getProvidersNpiCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ProviderResponse}
     */
    this.getProvidersNpi = function(npi, callback) {
      var postBody = null;

      // verify the required parameter 'npi' is set
      if (npi == undefined || npi == null) {
        throw "Missing the required parameter 'npi' when calling getProvidersNpi";
      }


      var pathParams = {
        'npi': npi
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = [];
      var accepts = [];
      var returnType = ProviderResponse;

      return this.apiClient.callApi(
        '/providers/{npi}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
