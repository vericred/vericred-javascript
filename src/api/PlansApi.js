(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/PlanFindResponse', '../model/RequestPlanFind'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/PlanFindResponse'), require('../model/RequestPlanFind'));
  } else {
    // Browser globals (root is window)
    if (!root.vericred-client) {
      root.vericred-client = {};
    }
    root.vericred-client.PlansApi = factory(root.vericred-client.ApiClient, root.vericred-client.PlanFindResponse, root.vericred-client.RequestPlanFind);
  }
}(this, function(ApiClient, PlanFindResponse, RequestPlanFind) {
  'use strict';

  /**
   * Plans service.
   * @module api/PlansApi
   * @version 0.0.2
   */

  /**
   * Constructs a new PlansApi. 
   * @alias module:api/PlansApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use, default to {@link module:ApiClient#instance}
   * if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the postPlansFind operation.
     * @callback module:api/PlansApi~postPlansFindCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PlanFindResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/RequestPlanFind} opts.body 
     * @param {module:api/PlansApi~postPlansFindCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/PlanFindResponse}
     */
    this.postPlansFind = function(opts, callback) {
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
      var returnType = PlanFindResponse;

      return this.apiClient.callApi(
        '/plans/find', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
