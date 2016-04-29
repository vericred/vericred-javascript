(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['./ApiClient', './model/Applicant', './model/Carrier', './model/CarrierSubsidiary', './model/County', './model/Drug', './model/DrugCoverage', './model/InlineResponse200', './model/InlineResponse2001', './model/InlineResponse2002', './model/Plan', './model/PlanCounty', './model/PlanSearchResult', './model/Pricing', './model/Provider', './model/Query', './model/RatingArea', './model/State', './model/ZipCode', './model/ZipCounty', './api/DrugCoverageApi', './api/PlansApi', './api/ProvidersApi', './api/ZipCountiesApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/Applicant'), require('./model/Carrier'), require('./model/CarrierSubsidiary'), require('./model/County'), require('./model/Drug'), require('./model/DrugCoverage'), require('./model/InlineResponse200'), require('./model/InlineResponse2001'), require('./model/InlineResponse2002'), require('./model/Plan'), require('./model/PlanCounty'), require('./model/PlanSearchResult'), require('./model/Pricing'), require('./model/Provider'), require('./model/Query'), require('./model/RatingArea'), require('./model/State'), require('./model/ZipCode'), require('./model/ZipCounty'), require('./api/DrugCoverageApi'), require('./api/PlansApi'), require('./api/ProvidersApi'), require('./api/ZipCountiesApi'));
  }
}(function(ApiClient, Applicant, Carrier, CarrierSubsidiary, County, Drug, DrugCoverage, InlineResponse200, InlineResponse2001, InlineResponse2002, Plan, PlanCounty, PlanSearchResult, Pricing, Provider, Query, RatingArea, State, ZipCode, ZipCounty, DrugCoverageApi, PlansApi, ProvidersApi, ZipCountiesApi) {
  'use strict';

  /**
   * Vericred&#39;s API allows you to search for Health Plans that a specific doctor
accepts.

## Getting Started

Visit our [Developer Portal](https://vericred.3scale.net/access_code?access_code&#x3D;vericred&amp;cms_token&#x3D;3545ca52af07bde85b7c0c3aa9d1985e) to
create an account.

Once you have created an account, you can create one Application for
Production and another for our Sandbox (select the appropriate Plan when
you create the Application).

## Authentication

To authenticate, pass the API Key you created in the Developer Portal as
a &#x60;Vericred-Api-Key&#x60; header.

&#x60;curl -H &#39;Vericred-Api-Key: YOUR_KEY&#39; &quot;https://api.vericred.com/providers?search_term&#x3D;Foo&amp;zip_code&#x3D;11215&quot;&#x60;

## Versioning

Vericred&#39;s API default to the latest version.  However, if you need a specific
version, you can request it with an &#x60;Accept-Version&#x60; header.

The current version is &#x60;v3&#x60;.  Previous versions are &#x60;v1&#x60; and &#x60;v2&#x60;.

&#x60;curl -H &#39;Vericred-Api-Key: YOUR_KEY&#39; -H &#39;Accept-Version: v2&#39; &quot;https://api.vericred.com/providers?search_term&#x3D;Foo&amp;zip_code&#x3D;11215&quot;&#x60;

## Pagination

Most endpoints are not paginated.  It will be noted in the documentation if/when
an endpoint is paginated.

When pagination is present, a &#x60;meta&#x60; stanza will be present in the response
with the total number of records

&#x60;&#x60;&#x60;
{
  things: [{ id: 1 }, { id: 2 }],
  meta: { total: 500 }
}
&#x60;&#x60;&#x60;

## Sideloading

When we return multiple levels of an object graph (e.g. &#x60;Provider&#x60;s and their &#x60;State&#x60;s
we sideload the associated data.  In this example, we would provide an Array of
&#x60;State&#x60;s and a &#x60;state_id&#x60; for each provider.  This is done primarily to reduce the
payload size since many of the &#x60;Provider&#x60;s will share a &#x60;State&#x60;

&#x60;&#x60;&#x60;
{
  providers: [{ id: 1, state_id: 1}, { id: 2, state_id: 1 }],
  states: [{ id: 1, code: &#39;NY&#39; }]
}
&#x60;&#x60;&#x60;

If you need the second level of the object graph, you can just match the
corresponding id.

## Selecting specific data

All endpoints allow you to specify which fields you would like to return.
This allows you to limit the response to contain only the data you need.

For example, let&#39;s take a request that returns the following JSON by default

&#x60;&#x60;&#x60;
{
  provider: {
    id: 1,
    name: &#39;John&#39;,
    phone: &#39;1234567890&#39;,
    field_we_dont_care_about: &#39;value_we_dont_care_about&#39;
  },
  states: [{
    id: 1,
    name: &#39;New York&#39;,
    code: &#39;NY&#39;,
    field_we_dont_care_about: &#39;value_we_dont_care_about&#39;
  }]
}
&#x60;&#x60;&#x60;

To limit our results to only return the fields we care about, we specify the
&#x60;select&#x60; query string parameter for the corresponding fields in the JSON
document.

In this case, we want to select &#x60;name&#x60; and &#x60;phone&#x60; from the &#x60;provider&#x60; key,
so we would add the parameters &#x60;select&#x3D;provider.name,provider.phone&#x60;.
We also want the &#x60;name&#x60; and &#x60;code&#x60; from the &#x60;states&#x60; key, so we would
add the parameters &#x60;select&#x3D;states.name,staes.code&#x60;.  The id field of
each document is always returned whether or not it is requested.

Our final request would be &#x60;GET /providers/12345?select&#x3D;provider.name,provider.phone,states.name,states.code&#x60;

The response would be

&#x60;&#x60;&#x60;
{
  provider: {
    id: 1,
    name: &#39;John&#39;,
    phone: &#39;1234567890&#39;
  },
  states: [{
    id: 1,
    name: &#39;New York&#39;,
    code: &#39;NY&#39;
  }]
}
&#x60;&#x60;&#x60;

.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var VericredApi = require('./index'); // See note below*.
   * var xxxSvc = new VericredApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new VericredApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['./index'], function(){...}) and put the application logic within the
   * callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new VericredApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new VericredApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 1.0.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The Applicant model constructor.
     * @property {module:model/Applicant}
     */
    Applicant: Applicant,
    /**
     * The Carrier model constructor.
     * @property {module:model/Carrier}
     */
    Carrier: Carrier,
    /**
     * The CarrierSubsidiary model constructor.
     * @property {module:model/CarrierSubsidiary}
     */
    CarrierSubsidiary: CarrierSubsidiary,
    /**
     * The County model constructor.
     * @property {module:model/County}
     */
    County: County,
    /**
     * The Drug model constructor.
     * @property {module:model/Drug}
     */
    Drug: Drug,
    /**
     * The DrugCoverage model constructor.
     * @property {module:model/DrugCoverage}
     */
    DrugCoverage: DrugCoverage,
    /**
     * The InlineResponse200 model constructor.
     * @property {module:model/InlineResponse200}
     */
    InlineResponse200: InlineResponse200,
    /**
     * The InlineResponse2001 model constructor.
     * @property {module:model/InlineResponse2001}
     */
    InlineResponse2001: InlineResponse2001,
    /**
     * The InlineResponse2002 model constructor.
     * @property {module:model/InlineResponse2002}
     */
    InlineResponse2002: InlineResponse2002,
    /**
     * The Plan model constructor.
     * @property {module:model/Plan}
     */
    Plan: Plan,
    /**
     * The PlanCounty model constructor.
     * @property {module:model/PlanCounty}
     */
    PlanCounty: PlanCounty,
    /**
     * The PlanSearchResult model constructor.
     * @property {module:model/PlanSearchResult}
     */
    PlanSearchResult: PlanSearchResult,
    /**
     * The Pricing model constructor.
     * @property {module:model/Pricing}
     */
    Pricing: Pricing,
    /**
     * The Provider model constructor.
     * @property {module:model/Provider}
     */
    Provider: Provider,
    /**
     * The Query model constructor.
     * @property {module:model/Query}
     */
    Query: Query,
    /**
     * The RatingArea model constructor.
     * @property {module:model/RatingArea}
     */
    RatingArea: RatingArea,
    /**
     * The State model constructor.
     * @property {module:model/State}
     */
    State: State,
    /**
     * The ZipCode model constructor.
     * @property {module:model/ZipCode}
     */
    ZipCode: ZipCode,
    /**
     * The ZipCounty model constructor.
     * @property {module:model/ZipCounty}
     */
    ZipCounty: ZipCounty,
    /**
     * The DrugCoverageApi service constructor.
     * @property {module:api/DrugCoverageApi}
     */
    DrugCoverageApi: DrugCoverageApi,
    /**
     * The PlansApi service constructor.
     * @property {module:api/PlansApi}
     */
    PlansApi: PlansApi,
    /**
     * The ProvidersApi service constructor.
     * @property {module:api/ProvidersApi}
     */
    ProvidersApi: ProvidersApi,
    /**
     * The ZipCountiesApi service constructor.
     * @property {module:api/ZipCountiesApi}
     */
    ZipCountiesApi: ZipCountiesApi
  };

  return exports;
}));
