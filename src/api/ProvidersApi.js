/**
 * Vericred API
 * Vericred's API allows you to search for Health Plans that a specific doctor
accepts.

## Getting Started

Visit our [Developer Portal](https://developers.vericred.com) to
create an account.

Once you have created an account, you can create one Application for
Production and another for our Sandbox (select the appropriate Plan when
you create the Application).

## SDKs

Our API follows standard REST conventions, so you can use any HTTP client
to integrate with us. You will likely find it easier to use one of our
[autogenerated SDKs](https://github.com/vericred/?query=vericred-),
which we make available for several common programming languages.

## Authentication

To authenticate, pass the API Key you created in the Developer Portal as
a `Vericred-Api-Key` header.

`curl -H 'Vericred-Api-Key: YOUR_KEY' "https://api.vericred.com/providers?search_term=Foo&zip_code=11215"`

## Versioning

Vericred's API default to the latest version.  However, if you need a specific
version, you can request it with an `Accept-Version` header.

The current version is `v3`.  Previous versions are `v1` and `v2`.

`curl -H 'Vericred-Api-Key: YOUR_KEY' -H 'Accept-Version: v2' "https://api.vericred.com/providers?search_term=Foo&zip_code=11215"`

## Pagination

Endpoints that accept `page` and `per_page` parameters are paginated. They expose
four additional fields that contain data about your position in the response,
namely `Total`, `Per-Page`, `Link`, and `Page` as described in [RFC-5988](https://tools.ietf.org/html/rfc5988).

For example, to display 5 results per page and view the second page of a
`GET` to `/networks`, your final request would be `GET /networks?....page=2&per_page=5`.

## Sideloading

When we return multiple levels of an object graph (e.g. `Provider`s and their `State`s
we sideload the associated data.  In this example, we would provide an Array of
`State`s and a `state_id` for each provider.  This is done primarily to reduce the
payload size since many of the `Provider`s will share a `State`

```
{
  providers: [{ id: 1, state_id: 1}, { id: 2, state_id: 1 }],
  states: [{ id: 1, code: 'NY' }]
}
```

If you need the second level of the object graph, you can just match the
corresponding id.

## Selecting specific data

All endpoints allow you to specify which fields you would like to return.
This allows you to limit the response to contain only the data you need.

For example, let's take a request that returns the following JSON by default

```
{
  provider: {
    id: 1,
    name: 'John',
    phone: '1234567890',
    field_we_dont_care_about: 'value_we_dont_care_about'
  },
  states: [{
    id: 1,
    name: 'New York',
    code: 'NY',
    field_we_dont_care_about: 'value_we_dont_care_about'
  }]
}
```

To limit our results to only return the fields we care about, we specify the
`select` query string parameter for the corresponding fields in the JSON
document.

In this case, we want to select `name` and `phone` from the `provider` key,
so we would add the parameters `select=provider.name,provider.phone`.
We also want the `name` and `code` from the `states` key, so we would
add the parameters `select=states.name,states.code`.  The id field of
each document is always returned whether or not it is requested.

Our final request would be `GET /providers/12345?select=provider.name,provider.phone,states.name,states.code`

The response would be

```
{
  provider: {
    id: 1,
    name: 'John',
    phone: '1234567890'
  },
  states: [{
    id: 1,
    name: 'New York',
    code: 'NY'
  }]
}
```

## Benefits summary format
Benefit cost-share strings are formatted to capture:
 * Network tiers
 * Compound or conditional cost-share
 * Limits on the cost-share
 * Benefit-specific maximum out-of-pocket costs

**Example #1**
As an example, we would represent [this Summary of Benefits &amp; Coverage](https://s3.amazonaws.com/vericred-data/SBC/2017/33602TX0780032.pdf) as:

* **Hospital stay facility fees**:
  - Network Provider: `$400 copay/admit plus 20% coinsurance`
  - Out-of-Network Provider: `$1,500 copay/admit plus 50% coinsurance`
  - Vericred's format for this benefit: `In-Network: $400 before deductible then 20% after deductible / Out-of-Network: $1,500 before deductible then 50% after deductible`

* **Rehabilitation services:**
  - Network Provider: `20% coinsurance`
  - Out-of-Network Provider: `50% coinsurance`
  - Limitations & Exceptions: `35 visit maximum per benefit period combined with Chiropractic care.`
  - Vericred's format for this benefit: `In-Network: 20% after deductible / Out-of-Network: 50% after deductible | limit: 35 visit(s) per Benefit Period`

**Example #2**
In [this other Summary of Benefits &amp; Coverage](https://s3.amazonaws.com/vericred-data/SBC/2017/40733CA0110568.pdf), the **specialty_drugs** cost-share has a maximum out-of-pocket for in-network pharmacies.
* **Specialty drugs:**
  - Network Provider: `40% coinsurance up to a $500 maximum for up to a 30 day supply`
  - Out-of-Network Provider `Not covered`
  - Vericred's format for this benefit: `In-Network: 40% after deductible, up to $500 per script / Out-of-Network: 100%`

**BNF**

Here's a description of the benefits summary string, represented as a context-free grammar:

```
root                      ::= coverage

coverage                  ::= (simple_coverage | tiered_coverage) (space pipe space coverage_modifier)?
tiered_coverage           ::= tier (space slash space tier)*
tier                      ::= tier_name colon space (tier_coverage | not_applicable)
tier_coverage             ::= simple_coverage (space (then | or | and) space simple_coverage)* tier_limitation?
simple_coverage           ::= (pre_coverage_limitation space)? coverage_amount (space post_coverage_limitation)? (comma? space coverage_condition)?
coverage_modifier         ::= limit_condition colon space (((simple_coverage | simple_limitation) (semicolon space see_carrier_documentation)?) | see_carrier_documentation | waived_if_admitted | shared_across_tiers)
waived_if_admitted        ::= ("copay" space)? "waived if admitted"
simple_limitation         ::= pre_coverage_limitation space "copay applies"
tier_name                 ::= "In-Network-Tier-2" | "Out-of-Network" | "In-Network"
limit_condition           ::= "limit" | "condition"
tier_limitation           ::= comma space "up to" space (currency | (integer space time_unit plural?)) (space post_coverage_limitation)?
coverage_amount           ::= currency | unlimited | included | unknown | percentage | (digits space (treatment_unit | time_unit) plural?)
pre_coverage_limitation   ::= first space digits space time_unit plural?
post_coverage_limitation  ::= (((then space currency) | "per condition") space)? "per" space (treatment_unit | (integer space time_unit) | time_unit) plural?
coverage_condition        ::= ("before deductible" | "after deductible" | "penalty" | allowance | "in-state" | "out-of-state") (space allowance)?
allowance                 ::= upto_allowance | after_allowance
upto_allowance            ::= "up to" space (currency space)? "allowance"
after_allowance           ::= "after" space (currency space)? "allowance"
see_carrier_documentation ::= "see carrier documentation for more information"
shared_across_tiers       ::= "shared across all tiers"
unknown                   ::= "unknown"
unlimited                 ::= /[uU]nlimited/
included                  ::= /[iI]ncluded in [mM]edical/
time_unit                 ::= /[hH]our/ | (((/[cC]alendar/ | /[cC]ontract/) space)? /[yY]ear/) | /[mM]onth/ | /[dD]ay/ | /[wW]eek/ | /[vV]isit/ | /[lL]ifetime/ | ((((/[bB]enefit/ plural?) | /[eE]ligibility/) space)? /[pP]eriod/)
treatment_unit            ::= /[pP]erson/ | /[gG]roup/ | /[cC]ondition/ | /[sS]cript/ | /[vV]isit/ | /[eE]xam/ | /[iI]tem/ | /[sS]tay/ | /[tT]reatment/ | /[aA]dmission/ | /[eE]pisode/
comma                     ::= ","
colon                     ::= ":"
semicolon                 ::= ";"
pipe                      ::= "|"
slash                     ::= "/"
plural                    ::= "(s)" | "s"
then                      ::= "then" | ("," space) | space
or                        ::= "or"
and                       ::= "and"
not_applicable            ::= "Not Applicable" | "N/A" | "NA"
first                     ::= "first"
currency                  ::= "$" number
percentage                ::= number "%"
number                    ::= float | integer
float                     ::= digits "." digits
integer                   ::= /[0-9]/+ (comma_int | under_int)*
comma_int                 ::= ("," /[0-9]/*3) !"_"
under_int                 ::= ("_" /[0-9]/*3) !","
digits                    ::= /[0-9]/+ ("_" /[0-9]/+)*
space                     ::= /[ \t]/+
```


 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ProviderShowResponse', 'model/RequestProvidersSearch', 'model/ProvidersSearchResponse', 'model/ProvidersGeocodeResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ProviderShowResponse'), require('../model/RequestProvidersSearch'), require('../model/ProvidersSearchResponse'), require('../model/ProvidersGeocodeResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.vericredClient) {
      root.vericredClient = {};
    }
    root.vericredClient.ProvidersApi = factory(root.vericredClient.ApiClient, root.vericredClient.ProviderShowResponse, root.vericredClient.RequestProvidersSearch, root.vericredClient.ProvidersSearchResponse, root.vericredClient.ProvidersGeocodeResponse);
  }
}(this, function(ApiClient, ProviderShowResponse, RequestProvidersSearch, ProvidersSearchResponse, ProvidersGeocodeResponse) {
  'use strict';

  /**
   * Providers service.
   * @module api/ProvidersApi
   * @version 0.0.12
   */

  /**
   * Constructs a new ProvidersApi. 
   * @alias module:api/ProvidersApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getProvider operation.
     * @callback module:api/ProvidersApi~getProviderCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProviderShowResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find a Provider
     * To retrieve a specific provider, just perform a GET using his NPI number
     * @param {String} npi NPI number
     * @param {Object} opts Optional parameters
     * @param {String} opts.year Only show plan ids for the given year
     * @param {String} opts.state Only show plan ids for the given state
     * @param {module:api/ProvidersApi~getProviderCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProviderShowResponse}
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
        'year': opts['year'],
        'state': opts['state']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Vericred-Api-Key'];
      var contentTypes = [];
      var accepts = [];
      var returnType = ProviderShowResponse;

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
     * ### Provider Details All searches can take a &#x60;search_term&#x60;, which is used as a component in the score (and thus the ranking/order) of the results.  This is combined with the proximity to the location in ranking results. For example, we would want \&quot;Dr. John Smith\&quot; who is 5 miles away from a given Zip Code to appear before \&quot;Dr. John Smith\&quot; who is 100 miles away.  The weighting also allows for non-exact matches.  In our prior example, we would want \&quot;Dr. Jon Smith\&quot; who is 2 miles away to appear before the exact match \&quot;Dr. John Smith\&quot; who is 100 miles away because it is more likely that the user just entered an incorrect name.  The free text search also supports Specialty name search and \&quot;body part\&quot; Specialty name search.  So, searching \&quot;John Smith nose\&quot; would return \&quot;Dr. John Smith\&quot;, the ENT Specialist before \&quot;Dr. John Smith\&quot; the Internist.  In addition, we can filter &#x60;Providers&#x60; by whether or not they accept *any* insurance.  Our data set includes over 4 million &#x60;Providers&#x60;, some of whom do not accept any insurance at all.  This filter makes it more likely that the user will find his or her practitioner in some cases.  We can also use &#x60;min_score&#x60; to omit less relevant results.  This makes sense in the case where your application wants to display *all* of the results returned regardless of how many there are.  Otherwise, using our default &#x60;min_score&#x60; and pagination should be sufficient.  ### Location Information  All &#x60;Provider&#x60; searches that do *not* specify &#x60;plan_ids&#x60; or &#x60;network_ids&#x60;require some type of location information. We use this information either to weight results or to filter results, depending on the type.  #### Zip Code When providing the &#x60;zip_code&#x60; parameter, we order the &#x60;Providers&#x60; returned based on their score, which incorporates their proximity to the given Zip Code and the closeness of match to the search text.  If a &#x60;radius&#x60; is also provided, we filter out &#x60;Providers&#x60; who are outside of that radius from the center of the Zip Code provided  #### Polygon When providing the &#x60;polygon&#x60; parameter, we filter providers who are outside the bounds of the shape provided.  This is mutually exclusive with &#x60;zip_code&#x60; and &#x60;radius&#x60;.  ### Plan/Network Information We can also filter based on &#x60;Plan&#x60; and &#x60;Network&#x60; participation.  These filters are mutually exclusive and return the union of the resulting sets for each &#x60;Plan&#x60; or &#x60;Network&#x60;.  I.e. if you provider Plan A and Plan B, you will receive &#x60;Providers&#x60; who accept *either* &#x60;Plan&#x60;.  The same is true for &#x60;Networks&#x60;.  ### Examples  *Find Dr. Foo near Brooklyn*  &#x60;{ \&quot;search_term\&quot;: \&quot;Foo\&quot;, \&quot;zip_code\&quot;: \&quot;11215\&quot; }&#x60;  *Find all Providers within 5 miles of Brooklyn who accept a Plan*  &#x60;{ \&quot;zip_code\&quot;: \&quot;11215\&quot;, \&quot;radius\&quot;: 5, \&quot;hios_ids\&quot;: [\&quot;88582NY0230001\&quot;] }&#x60;  *Find all providers on a map of Brooklyn ordered by a combination of proximity to the center point of the map and relevance to the search term \&quot;ENT\&quot;*  &#x60;&#x60;&#x60; {   \&quot;polygon\&quot;: [       {\&quot;lon\&quot;:-74.0126609802,\&quot;lat\&quot;:40.6275684851 },       {\&quot;lon\&quot;:-74.0126609802,\&quot;lat\&quot;:40.7097269508 },       {\&quot;lon\&quot;:-73.9367866516,\&quot;lat\&quot;:40.7097269508 },       {\&quot;lon\&quot;:-73.9367866516,\&quot;lat\&quot;:40.6275684851 }   ],   \&quot;search_term\&quot; : \&quot;ENT\&quot; } &#x60;&#x60;&#x60; 
     * @param {module:model/RequestProvidersSearch} body 
     * @param {module:api/ProvidersApi~getProvidersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProvidersSearchResponse}
     */
    this.getProviders = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw "Missing the required parameter 'body' when calling getProviders";
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Vericred-Api-Key'];
      var contentTypes = [];
      var accepts = [];
      var returnType = ProvidersSearchResponse;

      return this.apiClient.callApi(
        '/providers/search', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProviders_0 operation.
     * @callback module:api/ProvidersApi~getProviders_0Callback
     * @param {String} error Error message, if any.
     * @param {module:model/ProvidersGeocodeResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find Providers
     * ### Provider Details All searches can take a &#x60;search_term&#x60;, which is used as a component in the score (and thus the ranking/order) of the results.  This is combined with the proximity to the location in ranking results. For example, we would want \&quot;Dr. John Smith\&quot; who is 5 miles away from a given Zip Code to appear before \&quot;Dr. John Smith\&quot; who is 100 miles away.  The weighting also allows for non-exact matches.  In our prior example, we would want \&quot;Dr. Jon Smith\&quot; who is 2 miles away to appear before the exact match \&quot;Dr. John Smith\&quot; who is 100 miles away because it is more likely that the user just entered an incorrect name.  The free text search also supports Specialty name search and \&quot;body part\&quot; Specialty name search.  So, searching \&quot;John Smith nose\&quot; would return \&quot;Dr. John Smith\&quot;, the ENT Specialist before \&quot;Dr. John Smith\&quot; the Internist.  In addition, we can filter &#x60;Providers&#x60; by whether or not they accept *any* insurance.  Our data set includes over 4 million &#x60;Providers&#x60;, some of whom do not accept any insurance at all.  This filter makes it more likely that the user will find his or her practitioner in some cases.  We can also use &#x60;min_score&#x60; to omit less relevant results.  This makes sense in the case where your application wants to display *all* of the results returned regardless of how many there are.  Otherwise, using our default &#x60;min_score&#x60; and pagination should be sufficient.  ### Location Information  All &#x60;Provider&#x60; searches that do *not* specify &#x60;plan_ids&#x60; or &#x60;network_ids&#x60;require some type of location information. We use this information either to weight results or to filter results, depending on the type.  #### Zip Code When providing the &#x60;zip_code&#x60; parameter, we order the &#x60;Providers&#x60; returned based on their score, which incorporates their proximity to the given Zip Code and the closeness of match to the search text.  If a &#x60;radius&#x60; is also provided, we filter out &#x60;Providers&#x60; who are outside of that radius from the center of the Zip Code provided  #### Polygon When providing the &#x60;polygon&#x60; parameter, we filter providers who are outside the bounds of the shape provided.  This is mutually exclusive with &#x60;zip_code&#x60; and &#x60;radius&#x60;.  ### Plan/Network Information We can also filter based on &#x60;Plan&#x60; and &#x60;Network&#x60; participation.  These filters are mutually exclusive and return the union of the resulting sets for each &#x60;Plan&#x60; or &#x60;Network&#x60;.  I.e. if you provider Plan A and Plan B, you will receive &#x60;Providers&#x60; who accept *either* &#x60;Plan&#x60;.  The same is true for &#x60;Networks&#x60;.  ### Examples  *Find Dr. Foo near Brooklyn*  &#x60;{ \&quot;search_term\&quot;: \&quot;Foo\&quot;, \&quot;zip_code\&quot;: \&quot;11215\&quot; }&#x60;  *Find all Providers within 5 miles of Brooklyn who accept a Plan*  &#x60;{ \&quot;zip_code\&quot;: \&quot;11215\&quot;, \&quot;radius\&quot;: 5, \&quot;hios_ids\&quot;: [\&quot;88582NY0230001\&quot;] }&#x60;  *Find all providers on a map of Brooklyn ordered by a combination of proximity to the center point of the map and relevance to the search term \&quot;ENT\&quot;*  &#x60;&#x60;&#x60; {   \&quot;polygon\&quot;: [       {\&quot;lon\&quot;:-74.0126609802,\&quot;lat\&quot;:40.6275684851 },       {\&quot;lon\&quot;:-74.0126609802,\&quot;lat\&quot;:40.7097269508 },       {\&quot;lon\&quot;:-73.9367866516,\&quot;lat\&quot;:40.7097269508 },       {\&quot;lon\&quot;:-73.9367866516,\&quot;lat\&quot;:40.6275684851 }   ],   \&quot;search_term\&quot; : \&quot;ENT\&quot; } &#x60;&#x60;&#x60; 
     * @param {module:model/RequestProvidersSearch} body 
     * @param {module:api/ProvidersApi~getProviders_0Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProvidersGeocodeResponse}
     */
    this.getProviders_0 = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw "Missing the required parameter 'body' when calling getProviders_0";
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['Vericred-Api-Key'];
      var contentTypes = [];
      var accepts = [];
      var returnType = ProvidersGeocodeResponse;

      return this.apiClient.callApi(
        '/providers/search/geocode', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
