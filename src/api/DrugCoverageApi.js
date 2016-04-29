(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/DrugCoverage'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/DrugCoverage'));
  } else {
    // Browser globals (root is window)
    if (!root.VericredApi) {
      root.VericredApi = {};
    }
    root.VericredApi.DrugCoverageApi = factory(root.VericredApi.ApiClient, root.VericredApi.DrugCoverage);
  }
}(this, function(ApiClient, DrugCoverage) {
  'use strict';

  /**
   * DrugCoverage service.
   * @module api/DrugCoverageApi
   * @version 1.0.0
   */

  /**
   * Constructs a new DrugCoverageApi. 
   * @alias module:api/DrugCoverageApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the drugsNdcCoveragesGet operation.
     * @callback module:api/DrugCoverageApi~drugsNdcCoveragesGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/DrugCoverage>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find Drug Coverages for a given NDC
     * Drug Coverages are the specific tier level, quantity limit, prior authorization
and step therapy for a given Drug/Plan combination.  This endpoint returns
all DrugCoverages for a given Drug


     * @param {String} ndc NDC for a drug
     * @param {module:api/DrugCoverageApi~drugsNdcCoveragesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {Array.<module:model/DrugCoverage>}
     */
    this.drugsNdcCoveragesGet = function(ndc, callback) {
      var postBody = null;

      // verify the required parameter 'ndc' is set
      if (ndc == undefined || ndc == null) {
        throw "Missing the required parameter 'ndc' when calling drugsNdcCoveragesGet";
      }


      var pathParams = {
        'ndc': ndc
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
      var returnType = [DrugCoverage];

      return this.apiClient.callApi(
        '/drugs/{ndc}/coverages', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
