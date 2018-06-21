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
    define(['ApiClient', 'model/RequestPlanFindApplicant', 'model/RequestPlanFindDrugPackage', 'model/RequestPlanFindProvider'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./RequestPlanFindApplicant'), require('./RequestPlanFindDrugPackage'), require('./RequestPlanFindProvider'));
  } else {
    // Browser globals (root is window)
    if (!root.vericredClient) {
      root.vericredClient = {};
    }
    root.vericredClient.RequestPlanFindCarrierVerification = factory(root.vericredClient.ApiClient, root.vericredClient.RequestPlanFindApplicant, root.vericredClient.RequestPlanFindDrugPackage, root.vericredClient.RequestPlanFindProvider);
  }
}(this, function(ApiClient, RequestPlanFindApplicant, RequestPlanFindDrugPackage, RequestPlanFindProvider) {
  'use strict';




  /**
   * The RequestPlanFindCarrierVerification model module.
   * @module model/RequestPlanFindCarrierVerification
   * @version 0.0.12
   */

  /**
   * Constructs a new <code>RequestPlanFindCarrierVerification</code>.
   * @alias module:model/RequestPlanFindCarrierVerification
   * @class
   */
  var exports = function() {
    var _this = this;

















  };

  /**
   * Constructs a <code>RequestPlanFindCarrierVerification</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RequestPlanFindCarrierVerification} obj Optional instance to populate.
   * @return {module:model/RequestPlanFindCarrierVerification} The populated <code>RequestPlanFindCarrierVerification</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('applicants')) {
        obj['applicants'] = ApiClient.convertToType(data['applicants'], [RequestPlanFindApplicant]);
      }
      if (data.hasOwnProperty('carrier_id')) {
        obj['carrier_id'] = ApiClient.convertToType(data['carrier_id'], 'Number');
      }
      if (data.hasOwnProperty('enrollment_date')) {
        obj['enrollment_date'] = ApiClient.convertToType(data['enrollment_date'], 'String');
      }
      if (data.hasOwnProperty('drug_packages')) {
        obj['drug_packages'] = ApiClient.convertToType(data['drug_packages'], [RequestPlanFindDrugPackage]);
      }
      if (data.hasOwnProperty('fips_code')) {
        obj['fips_code'] = ApiClient.convertToType(data['fips_code'], 'String');
      }
      if (data.hasOwnProperty('group_name')) {
        obj['group_name'] = ApiClient.convertToType(data['group_name'], 'String');
      }
      if (data.hasOwnProperty('household_income')) {
        obj['household_income'] = ApiClient.convertToType(data['household_income'], 'Number');
      }
      if (data.hasOwnProperty('household_size')) {
        obj['household_size'] = ApiClient.convertToType(data['household_size'], 'Number');
      }
      if (data.hasOwnProperty('ids')) {
        obj['ids'] = ApiClient.convertToType(data['ids'], ['Number']);
      }
      if (data.hasOwnProperty('market')) {
        obj['market'] = ApiClient.convertToType(data['market'], 'String');
      }
      if (data.hasOwnProperty('providers')) {
        obj['providers'] = ApiClient.convertToType(data['providers'], [RequestPlanFindProvider]);
      }
      if (data.hasOwnProperty('page')) {
        obj['page'] = ApiClient.convertToType(data['page'], 'Number');
      }
      if (data.hasOwnProperty('per_page')) {
        obj['per_page'] = ApiClient.convertToType(data['per_page'], 'Number');
      }
      if (data.hasOwnProperty('sort')) {
        obj['sort'] = ApiClient.convertToType(data['sort'], 'String');
      }
      if (data.hasOwnProperty('zip_code')) {
        obj['zip_code'] = ApiClient.convertToType(data['zip_code'], 'String');
      }
      if (data.hasOwnProperty('issuer_vericred_ids')) {
        obj['issuer_vericred_ids'] = ApiClient.convertToType(data['issuer_vericred_ids'], ['String']);
      }
    }
    return obj;
  }

  /**
   * Applicants for desired plans.
   * @member {Array.<module:model/RequestPlanFindApplicant>} applicants
   */
  exports.prototype['applicants'] = undefined;
  /**
   * National-level carrier id
   * @member {Number} carrier_id
   */
  exports.prototype['carrier_id'] = undefined;
  /**
   * Date of enrollment
   * @member {String} enrollment_date
   */
  exports.prototype['enrollment_date'] = undefined;
  /**
   * National Drug Code Package Id
   * @member {Array.<module:model/RequestPlanFindDrugPackage>} drug_packages
   */
  exports.prototype['drug_packages'] = undefined;
  /**
   * County code to determine eligibility
   * @member {String} fips_code
   */
  exports.prototype['fips_code'] = undefined;
  /**
   * Label for search tracking
   * @member {String} group_name
   */
  exports.prototype['group_name'] = undefined;
  /**
   * Total household income.
   * @member {Number} household_income
   */
  exports.prototype['household_income'] = undefined;
  /**
   * Number of people living in household.
   * @member {Number} household_size
   */
  exports.prototype['household_size'] = undefined;
  /**
   * List of plan IDs to filter by
   * @member {Array.<Number>} ids
   */
  exports.prototype['ids'] = undefined;
  /**
   * Type of plan to search for.
   * @member {String} market
   */
  exports.prototype['market'] = undefined;
  /**
   * List of providers to search for.
   * @member {Array.<module:model/RequestPlanFindProvider>} providers
   */
  exports.prototype['providers'] = undefined;
  /**
   * Selected page of paginated response.
   * @member {Number} page
   */
  exports.prototype['page'] = undefined;
  /**
   * Results per page of response.
   * @member {Number} per_page
   */
  exports.prototype['per_page'] = undefined;
  /**
   * Sort responses by plan field.
   * @member {String} sort
   */
  exports.prototype['sort'] = undefined;
  /**
   * 5-digit zip code - this helps determine pricing.
   * @member {String} zip_code
   */
  exports.prototype['zip_code'] = undefined;
  /**
   * Vericred IDs of the issuers to include in search
   * @member {Array.<String>} issuer_vericred_ids
   */
  exports.prototype['issuer_vericred_ids'] = undefined;



  return exports;
}));

