(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/InlineResponse200', '../model/InlineResponse2001'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/InlineResponse200'), require('../model/InlineResponse2001'));
  } else {
    // Browser globals (root is window)
    if (!root.VericredApi) {
      root.VericredApi = {};
    }
    root.VericredApi.ProvidersApi = factory(root.VericredApi.ApiClient, root.VericredApi.InlineResponse200, root.VericredApi.InlineResponse2001);
  }
}(this, function(ApiClient, InlineResponse200, InlineResponse2001) {
  'use strict';

  /**
   * Providers service.
   * @module api/ProvidersApi
   * @version 1.0.0
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
     * Callback function to receive the result of the providersGet operation.
     * @callback module:api/ProvidersApi~providersGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse200} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find providers by term and zip code
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


     * @param {String} searchTerm String to search by
     * @param {String} zipCode Zip Code to search near
     * @param {Object} opts Optional parameters
     * @param {String} opts.acceptsInsurance Limit results to Providers who accept at least one insurance plan.  Note that the inverse of this filter is not supported and any value will evaluate to true
     * @param {Array.<String>} opts.hiosIds HIOS id of one or more plans
     * @param {String} opts.page Page number
     * @param {String} opts.perPage Number of records to return per page
     * @param {String} opts.radius Radius (in miles) to use to limit results
     * @param {module:api/ProvidersApi~providersGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/InlineResponse200}
     */
    this.providersGet = function(searchTerm, zipCode, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'searchTerm' is set
      if (searchTerm == undefined || searchTerm == null) {
        throw "Missing the required parameter 'searchTerm' when calling providersGet";
      }

      // verify the required parameter 'zipCode' is set
      if (zipCode == undefined || zipCode == null) {
        throw "Missing the required parameter 'zipCode' when calling providersGet";
      }


      var pathParams = {
      };
      var queryParams = {
        'accepts_insurance': opts['acceptsInsurance'],
        'hios_ids': this.apiClient.buildCollectionParam(opts['hiosIds'], 'csv'),
        'page': opts['page'],
        'per_page': opts['perPage'],
        'radius': opts['radius'],
        'search_term': searchTerm,
        'zip_code': zipCode
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = [];
      var accepts = [];
      var returnType = InlineResponse200;

      return this.apiClient.callApi(
        '/providers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the providersNpiGet operation.
     * @callback module:api/ProvidersApi~providersNpiGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2001} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find a specific Provider
     * To retrieve a specific provider, just perform a GET using his NPI number


     * @param {String} npi NPI number
     * @param {module:api/ProvidersApi~providersNpiGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/InlineResponse2001}
     */
    this.providersNpiGet = function(npi, callback) {
      var postBody = null;

      // verify the required parameter 'npi' is set
      if (npi == undefined || npi == null) {
        throw "Missing the required parameter 'npi' when calling providersNpiGet";
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
      var returnType = InlineResponse2001;

      return this.apiClient.callApi(
        '/providers/{npi}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
