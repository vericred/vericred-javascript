(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/DrugCoverageResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/DrugCoverageResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.DrugsApi = factory(root.vericred-client.ApiClient, root.vericred-client.DrugCoverageResponse);
  }
}(this, function(ApiClient, DrugCoverageResponse) {
  'use strict';

  /**
   * Drugs service.
   * @module api/DrugsApi
   * @version 0.0.2
   */

  /**
   * Constructs a new DrugsApi. 
   * @alias module:api/DrugsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getDrugsCoveragesNdc operation.
     * @callback module:api/DrugsApi~getDrugsCoveragesNdcCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DrugCoverageResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Drug Coverages are the specific tier level, quantity limit, prior authorization and step therapy for a given Drug/Plan
     * Drug Coverages are the specific tier level, quantity limit, prior authorization and step therapy for a given Drug/Plan combination. This endpoint returns all DrugCoverages for a given Drug
     * @param {String} ndcPackageCode NDC package code
     * @param {String} stateCode Two-character state code
     * @param {module:api/DrugsApi~getDrugsCoveragesNdcCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/DrugCoverageResponse}
     */
    this.getDrugsCoveragesNdc = function(ndcPackageCode, stateCode, callback) {
      var postBody = null;

      // verify the required parameter 'ndcPackageCode' is set
      if (ndcPackageCode == undefined || ndcPackageCode == null) {
        throw "Missing the required parameter 'ndcPackageCode' when calling getDrugsCoveragesNdc";
      }

      // verify the required parameter 'stateCode' is set
      if (stateCode == undefined || stateCode == null) {
        throw "Missing the required parameter 'stateCode' when calling getDrugsCoveragesNdc";
      }


      var pathParams = {
      };
      var queryParams = {
        'ndc_package_code': ndcPackageCode,
        'state_code': stateCode
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = [];
      var accepts = [];
      var returnType = DrugCoverageResponse;

      return this.apiClient.callApi(
        '/drugs/coverages', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
