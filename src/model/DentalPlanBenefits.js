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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.vericredClient) {
      root.vericredClient = {};
    }
    root.vericredClient.DentalPlanBenefits = factory(root.vericredClient.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The DentalPlanBenefits model module.
   * @module model/DentalPlanBenefits
   * @version 0.0.12
   */

  /**
   * Constructs a new <code>DentalPlanBenefits</code>.
   * @alias module:model/DentalPlanBenefits
   * @class
   */
  var exports = function() {
    var _this = this;
























  };

  /**
   * Constructs a <code>DentalPlanBenefits</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DentalPlanBenefits} obj Optional instance to populate.
   * @return {module:model/DentalPlanBenefits} The populated <code>DentalPlanBenefits</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('individual_deductible')) {
        obj['individual_deductible'] = ApiClient.convertToType(data['individual_deductible'], 'String');
      }
      if (data.hasOwnProperty('family_deductible')) {
        obj['family_deductible'] = ApiClient.convertToType(data['family_deductible'], 'String');
      }
      if (data.hasOwnProperty('individual_annual_max')) {
        obj['individual_annual_max'] = ApiClient.convertToType(data['individual_annual_max'], 'String');
      }
      if (data.hasOwnProperty('family_max_annual_max')) {
        obj['family_max_annual_max'] = ApiClient.convertToType(data['family_max_annual_max'], 'String');
      }
      if (data.hasOwnProperty('individual_moop')) {
        obj['individual_moop'] = ApiClient.convertToType(data['individual_moop'], 'String');
      }
      if (data.hasOwnProperty('family_moop')) {
        obj['family_moop'] = ApiClient.convertToType(data['family_moop'], 'String');
      }
      if (data.hasOwnProperty('office_visits')) {
        obj['office_visits'] = ApiClient.convertToType(data['office_visits'], 'String');
      }
      if (data.hasOwnProperty('radiograph_bitewings')) {
        obj['radiograph_bitewings'] = ApiClient.convertToType(data['radiograph_bitewings'], 'String');
      }
      if (data.hasOwnProperty('radiograph_other')) {
        obj['radiograph_other'] = ApiClient.convertToType(data['radiograph_other'], 'String');
      }
      if (data.hasOwnProperty('fluoride_treatment')) {
        obj['fluoride_treatment'] = ApiClient.convertToType(data['fluoride_treatment'], 'String');
      }
      if (data.hasOwnProperty('space_maintainers')) {
        obj['space_maintainers'] = ApiClient.convertToType(data['space_maintainers'], 'String');
      }
      if (data.hasOwnProperty('prophylaxis_cleaning')) {
        obj['prophylaxis_cleaning'] = ApiClient.convertToType(data['prophylaxis_cleaning'], 'String');
      }
      if (data.hasOwnProperty('sealant')) {
        obj['sealant'] = ApiClient.convertToType(data['sealant'], 'String');
      }
      if (data.hasOwnProperty('fillings_amalgram')) {
        obj['fillings_amalgram'] = ApiClient.convertToType(data['fillings_amalgram'], 'String');
      }
      if (data.hasOwnProperty('fillings_composite')) {
        obj['fillings_composite'] = ApiClient.convertToType(data['fillings_composite'], 'String');
      }
      if (data.hasOwnProperty('emergency_treatment')) {
        obj['emergency_treatment'] = ApiClient.convertToType(data['emergency_treatment'], 'String');
      }
      if (data.hasOwnProperty('restorative')) {
        obj['restorative'] = ApiClient.convertToType(data['restorative'], 'String');
      }
      if (data.hasOwnProperty('surgery_anesthesia')) {
        obj['surgery_anesthesia'] = ApiClient.convertToType(data['surgery_anesthesia'], 'String');
      }
      if (data.hasOwnProperty('surgery_extraction')) {
        obj['surgery_extraction'] = ApiClient.convertToType(data['surgery_extraction'], 'String');
      }
      if (data.hasOwnProperty('endodontics')) {
        obj['endodontics'] = ApiClient.convertToType(data['endodontics'], 'String');
      }
      if (data.hasOwnProperty('periodontics')) {
        obj['periodontics'] = ApiClient.convertToType(data['periodontics'], 'String');
      }
      if (data.hasOwnProperty('orthodontics_adult')) {
        obj['orthodontics_adult'] = ApiClient.convertToType(data['orthodontics_adult'], 'String');
      }
      if (data.hasOwnProperty('orthodontics_child')) {
        obj['orthodontics_child'] = ApiClient.convertToType(data['orthodontics_child'], 'String');
      }
    }
    return obj;
  }

  /**
   * Individual Deductible benefit string
   * @member {String} individual_deductible
   */
  exports.prototype['individual_deductible'] = undefined;
  /**
   * Family Deductible benefit string
   * @member {String} family_deductible
   */
  exports.prototype['family_deductible'] = undefined;
  /**
   * Individual Annual Max benefit string
   * @member {String} individual_annual_max
   */
  exports.prototype['individual_annual_max'] = undefined;
  /**
   * Family Max Annual Max benefit string
   * @member {String} family_max_annual_max
   */
  exports.prototype['family_max_annual_max'] = undefined;
  /**
   * Individual MOOP benefit string
   * @member {String} individual_moop
   */
  exports.prototype['individual_moop'] = undefined;
  /**
   * Family MOOP benefit string
   * @member {String} family_moop
   */
  exports.prototype['family_moop'] = undefined;
  /**
   * Office Visits benefit string
   * @member {String} office_visits
   */
  exports.prototype['office_visits'] = undefined;
  /**
   * Radiograph - Bitewings benefit string
   * @member {String} radiograph_bitewings
   */
  exports.prototype['radiograph_bitewings'] = undefined;
  /**
   * Radiograph - Other benefit string
   * @member {String} radiograph_other
   */
  exports.prototype['radiograph_other'] = undefined;
  /**
   * Fluoride Treatment benefit string
   * @member {String} fluoride_treatment
   */
  exports.prototype['fluoride_treatment'] = undefined;
  /**
   * Space Maintainers benefit string
   * @member {String} space_maintainers
   */
  exports.prototype['space_maintainers'] = undefined;
  /**
   * Prophylaxis Cleaning benefit string
   * @member {String} prophylaxis_cleaning
   */
  exports.prototype['prophylaxis_cleaning'] = undefined;
  /**
   * Sealant benefit string
   * @member {String} sealant
   */
  exports.prototype['sealant'] = undefined;
  /**
   * Fillings - Amalgram benefit string
   * @member {String} fillings_amalgram
   */
  exports.prototype['fillings_amalgram'] = undefined;
  /**
   * Fillings - Composite benefit string
   * @member {String} fillings_composite
   */
  exports.prototype['fillings_composite'] = undefined;
  /**
   * Emergency Treatment benefit string
   * @member {String} emergency_treatment
   */
  exports.prototype['emergency_treatment'] = undefined;
  /**
   * Restorative benefit string
   * @member {String} restorative
   */
  exports.prototype['restorative'] = undefined;
  /**
   * Surgery - Anesthesia benefit string
   * @member {String} surgery_anesthesia
   */
  exports.prototype['surgery_anesthesia'] = undefined;
  /**
   * Surgery - Extraction benefit string
   * @member {String} surgery_extraction
   */
  exports.prototype['surgery_extraction'] = undefined;
  /**
   * Endodontics benefit string
   * @member {String} endodontics
   */
  exports.prototype['endodontics'] = undefined;
  /**
   * Periodontics benefit string
   * @member {String} periodontics
   */
  exports.prototype['periodontics'] = undefined;
  /**
   * Orthodontics - Adult benefit string
   * @member {String} orthodontics_adult
   */
  exports.prototype['orthodontics_adult'] = undefined;
  /**
   * Orthodontics - Child benefit string
   * @member {String} orthodontics_child
   */
  exports.prototype['orthodontics_child'] = undefined;



  return exports;
}));


