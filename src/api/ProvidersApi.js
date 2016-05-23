(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/ProviderResponse', '../model/RequestProvidersSearch', '../model/ProvidersSearchResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ProviderResponse'), require('../model/RequestProvidersSearch'), require('../model/ProvidersSearchResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.ProvidersApi = factory(root.vericred-client.ApiClient, root.vericred-client.ProviderResponse, root.vericred-client.RequestProvidersSearch, root.vericred-client.ProvidersSearchResponse);
  }
}(this, function(ApiClient, ProviderResponse, RequestProvidersSearch, ProvidersSearchResponse) {
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
     * Callback function to receive the result of the getProvider operation.
     * @callback module:api/ProvidersApi~getProviderCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProviderResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find a Provider
     * To retrieve a specific provider, just perform a GET using his NPI number
     * @param {String} npi NPI number
     * @param {Object} opts Optional parameters
     * @param {String} opts.vericredApiKey API Key
     * @param {module:api/ProvidersApi~getProviderCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ProviderResponse}
     */
    this.getProvider = function(npi, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'npi' is set
      if (npi == undefined || npi == null) {
        throw "Missing the required parameter 'npi' when calling getProvider";
      }


      var pathParams = {
        'npi': npi
      };
      var queryParams = {
      };
      var headerParams = {
        'Vericred-Api-Key': opts['vericredApiKey']
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

    /**
     * Callback function to receive the result of the getProviders operation.
     * @callback module:api/ProvidersApi~getProvidersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProvidersSearchResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find Providers
     * All &#x60;Provider&#x60; searches require a &#x60;zip_code&#x60;, which we use for weighting
the search results to favor &#x60;Provider&#x60;s that are near the user.  For example,
we would want &quot;Dr. John Smith&quot; who is 5 miles away to appear before
&quot;Dr. John Smith&quot; who is 100 miles away.

The weighting also allows for non-exact matches.  In our prior example, we
would want &quot;Dr. Jon Smith&quot; who is 2 miles away to appear before the exact
match &quot;Dr. John Smith&quot; who is 100 miles away because it is more likely that
the user just entered an incorrect name.

The free text search also supports Specialty name search and &quot;body part&quot;
Specialty name search.  So, searching &quot;John Smith nose&quot; would return
&quot;Dr. John Smith&quot;, the ENT Specialist before &quot;Dr. John Smith&quot; the Internist.

     * @param {Object} opts Optional parameters
     * @param {module:model/RequestProvidersSearch} opts.body 
     * @param {module:api/ProvidersApi~getProvidersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/ProvidersSearchResponse}
     */
    this.getProviders = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
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
      var returnType = ProvidersSearchResponse;

      return this.apiClient.callApi(
        '/providers/search', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
