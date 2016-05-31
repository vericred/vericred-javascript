(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/DrugCoverageResponse', '../model/DrugSearchResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/DrugCoverageResponse'), require('../model/DrugSearchResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.DrugsApi = factory(root.vericred-client.ApiClient, root.vericred-client.DrugCoverageResponse, root.vericred-client.DrugSearchResponse);
  }
}(this, function(ApiClient, DrugCoverageResponse, DrugSearchResponse) {
  'use strict';

  /**
   * Drugs service.
   * @module api/DrugsApi
   * @version 0.0.3
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
     * Callback function to receive the result of the getDrugCoverages operation.
     * @callback module:api/DrugsApi~getDrugCoveragesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DrugCoverageResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Search for DrugCoverages
     * Drug Coverages are the specific tier level, quantity limit, prior
authorization and step therapy for a given Drug/Plan combination. This endpoint
returns all DrugCoverages for a given Drug
     * @param {String} ndcPackageCode NDC package code
     * @param {String} audience Two-character state code
     * @param {String} stateCode Two-character state code
     * @param {Object} opts Optional parameters
     * @param {String} opts.vericredApiKey API Key
     * @param {module:api/DrugsApi~getDrugCoveragesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/DrugCoverageResponse}
     */
    this.getDrugCoverages = function(ndcPackageCode, audience, stateCode, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'ndcPackageCode' is set
      if (ndcPackageCode == undefined || ndcPackageCode == null) {
        throw "Missing the required parameter 'ndcPackageCode' when calling getDrugCoverages";
      }

      // verify the required parameter 'audience' is set
      if (audience == undefined || audience == null) {
        throw "Missing the required parameter 'audience' when calling getDrugCoverages";
      }

      // verify the required parameter 'stateCode' is set
      if (stateCode == undefined || stateCode == null) {
        throw "Missing the required parameter 'stateCode' when calling getDrugCoverages";
      }


      var pathParams = {
        'ndc_package_code': ndcPackageCode
      };
      var queryParams = {
        'audience': audience,
        'state_code': stateCode
      };
      var headerParams = {
        'Vericred-Api-Key': opts['vericredApiKey']
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = [];
      var accepts = [];
      var returnType = DrugCoverageResponse;

      return this.apiClient.callApi(
        '/drug_packages/{ndc_package_code}/coverages', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listDrugs operation.
     * @callback module:api/DrugsApi~listDrugsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DrugSearchResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Drug Search
     * Search for drugs by proprietary name
     * @param {String} searchTerm Full or partial proprietary name of drug
     * @param {Object} opts Optional parameters
     * @param {String} opts.vericredApiKey API Key
     * @param {module:api/DrugsApi~listDrugsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/DrugSearchResponse}
     */
    this.listDrugs = function(searchTerm, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'searchTerm' is set
      if (searchTerm == undefined || searchTerm == null) {
        throw "Missing the required parameter 'searchTerm' when calling listDrugs";
      }


      var pathParams = {
      };
      var queryParams = {
        'search_term': searchTerm
      };
      var headerParams = {
        'Vericred-Api-Key': opts['vericredApiKey']
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = DrugSearchResponse;

      return this.apiClient.callApi(
        '/drugs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
