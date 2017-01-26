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
add the parameters `select=states.name,staes.code`.  The id field of
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
<cost-share>     ::= <tier> <opt-num-prefix> <value> <opt-per-unit> <deductible> <tier-limit> "/" <tier> <opt-num-prefix> <value> <opt-per-unit> <deductible> "|" <benefit-limit>
<tier>           ::= "In-Network:" | "In-Network-Tier-2:" | "Out-of-Network:"
<opt-num-prefix> ::= "first" <num> <unit> | ""
<unit>           ::= "day(s)" | "visit(s)" | "exam(s)" | "item(s)"
<value>          ::= <ddct_moop> | <copay> | <coinsurance> | <compound> | "unknown" | "Not Applicable"
<compound>       ::= <copay> <deductible> "then" <coinsurance> <deductible> | <copay> <deductible> "then" <copay> <deductible> | <coinsurance> <deductible> "then" <coinsurance> <deductible>
<copay>          ::= "$" <num>
<coinsurace>     ::= <num> "%"
<ddct_moop>      ::= <copay> | "Included in Medical" | "Unlimited"
<opt-per-unit>   ::= "per day" | "per visit" | "per stay" | ""
<deductible>     ::= "before deductible" | "after deductible" | ""
<tier-limit>     ::= ", " <limit> | ""
<benefit-limit>  ::= <limit> | ""
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
    root.vericredClient.VendoredPlanBulk = factory(root.vericredClient.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The VendoredPlanBulk model module.
   * @module model/VendoredPlanBulk
   * @version 0.0.8
   */

  /**
   * Constructs a new <code>VendoredPlanBulk</code>.
   * @alias module:model/VendoredPlanBulk
   * @class
   */
  var exports = function() {
    var _this = this;







































































  };

  /**
   * Constructs a <code>VendoredPlanBulk</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VendoredPlanBulk} obj Optional instance to populate.
   * @return {module:model/VendoredPlanBulk} The populated <code>VendoredPlanBulk</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('adult_dental')) {
        obj['adult_dental'] = ApiClient.convertToType(data['adult_dental'], 'Boolean');
      }
      if (data.hasOwnProperty('age29_rider')) {
        obj['age29_rider'] = ApiClient.convertToType(data['age29_rider'], 'Boolean');
      }
      if (data.hasOwnProperty('ambulance')) {
        obj['ambulance'] = ApiClient.convertToType(data['ambulance'], 'String');
      }
      if (data.hasOwnProperty('benefits_summary_url')) {
        obj['benefits_summary_url'] = ApiClient.convertToType(data['benefits_summary_url'], 'String');
      }
      if (data.hasOwnProperty('buy_link')) {
        obj['buy_link'] = ApiClient.convertToType(data['buy_link'], 'String');
      }
      if (data.hasOwnProperty('carrier_name')) {
        obj['carrier_name'] = ApiClient.convertToType(data['carrier_name'], 'String');
      }
      if (data.hasOwnProperty('child_dental')) {
        obj['child_dental'] = ApiClient.convertToType(data['child_dental'], 'Boolean');
      }
      if (data.hasOwnProperty('child_eyewear')) {
        obj['child_eyewear'] = ApiClient.convertToType(data['child_eyewear'], 'String');
      }
      if (data.hasOwnProperty('child_eye_exam')) {
        obj['child_eye_exam'] = ApiClient.convertToType(data['child_eye_exam'], 'String');
      }
      if (data.hasOwnProperty('customer_service_phone_number')) {
        obj['customer_service_phone_number'] = ApiClient.convertToType(data['customer_service_phone_number'], 'String');
      }
      if (data.hasOwnProperty('durable_medical_equipment')) {
        obj['durable_medical_equipment'] = ApiClient.convertToType(data['durable_medical_equipment'], 'String');
      }
      if (data.hasOwnProperty('diagnostic_test')) {
        obj['diagnostic_test'] = ApiClient.convertToType(data['diagnostic_test'], 'String');
      }
      if (data.hasOwnProperty('display_name')) {
        obj['display_name'] = ApiClient.convertToType(data['display_name'], 'String');
      }
      if (data.hasOwnProperty('dp_rider')) {
        obj['dp_rider'] = ApiClient.convertToType(data['dp_rider'], 'Boolean');
      }
      if (data.hasOwnProperty('drug_formulary_url')) {
        obj['drug_formulary_url'] = ApiClient.convertToType(data['drug_formulary_url'], 'String');
      }
      if (data.hasOwnProperty('effective_date')) {
        obj['effective_date'] = ApiClient.convertToType(data['effective_date'], 'String');
      }
      if (data.hasOwnProperty('expiration_date')) {
        obj['expiration_date'] = ApiClient.convertToType(data['expiration_date'], 'String');
      }
      if (data.hasOwnProperty('emergency_room')) {
        obj['emergency_room'] = ApiClient.convertToType(data['emergency_room'], 'String');
      }
      if (data.hasOwnProperty('family_drug_deductible')) {
        obj['family_drug_deductible'] = ApiClient.convertToType(data['family_drug_deductible'], 'String');
      }
      if (data.hasOwnProperty('family_drug_moop')) {
        obj['family_drug_moop'] = ApiClient.convertToType(data['family_drug_moop'], 'String');
      }
      if (data.hasOwnProperty('family_medical_deductible')) {
        obj['family_medical_deductible'] = ApiClient.convertToType(data['family_medical_deductible'], 'String');
      }
      if (data.hasOwnProperty('family_medical_moop')) {
        obj['family_medical_moop'] = ApiClient.convertToType(data['family_medical_moop'], 'String');
      }
      if (data.hasOwnProperty('fp_rider')) {
        obj['fp_rider'] = ApiClient.convertToType(data['fp_rider'], 'Boolean');
      }
      if (data.hasOwnProperty('generic_drugs')) {
        obj['generic_drugs'] = ApiClient.convertToType(data['generic_drugs'], 'String');
      }
      if (data.hasOwnProperty('habilitation_services')) {
        obj['habilitation_services'] = ApiClient.convertToType(data['habilitation_services'], 'String');
      }
      if (data.hasOwnProperty('hios_issuer_id')) {
        obj['hios_issuer_id'] = ApiClient.convertToType(data['hios_issuer_id'], 'String');
      }
      if (data.hasOwnProperty('home_health_care')) {
        obj['home_health_care'] = ApiClient.convertToType(data['home_health_care'], 'String');
      }
      if (data.hasOwnProperty('hospice_service')) {
        obj['hospice_service'] = ApiClient.convertToType(data['hospice_service'], 'String');
      }
      if (data.hasOwnProperty('hsa_eligible')) {
        obj['hsa_eligible'] = ApiClient.convertToType(data['hsa_eligible'], 'Boolean');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('imaging')) {
        obj['imaging'] = ApiClient.convertToType(data['imaging'], 'String');
      }
      if (data.hasOwnProperty('in_network_ids')) {
        obj['in_network_ids'] = ApiClient.convertToType(data['in_network_ids'], ['Number']);
      }
      if (data.hasOwnProperty('individual_drug_deductible')) {
        obj['individual_drug_deductible'] = ApiClient.convertToType(data['individual_drug_deductible'], 'String');
      }
      if (data.hasOwnProperty('individual_drug_moop')) {
        obj['individual_drug_moop'] = ApiClient.convertToType(data['individual_drug_moop'], 'String');
      }
      if (data.hasOwnProperty('individual_medical_deductible')) {
        obj['individual_medical_deductible'] = ApiClient.convertToType(data['individual_medical_deductible'], 'String');
      }
      if (data.hasOwnProperty('individual_medical_moop')) {
        obj['individual_medical_moop'] = ApiClient.convertToType(data['individual_medical_moop'], 'String');
      }
      if (data.hasOwnProperty('inpatient_birth')) {
        obj['inpatient_birth'] = ApiClient.convertToType(data['inpatient_birth'], 'String');
      }
      if (data.hasOwnProperty('inpatient_facility')) {
        obj['inpatient_facility'] = ApiClient.convertToType(data['inpatient_facility'], 'String');
      }
      if (data.hasOwnProperty('inpatient_mental_health')) {
        obj['inpatient_mental_health'] = ApiClient.convertToType(data['inpatient_mental_health'], 'String');
      }
      if (data.hasOwnProperty('inpatient_physician')) {
        obj['inpatient_physician'] = ApiClient.convertToType(data['inpatient_physician'], 'String');
      }
      if (data.hasOwnProperty('inpatient_substance')) {
        obj['inpatient_substance'] = ApiClient.convertToType(data['inpatient_substance'], 'String');
      }
      if (data.hasOwnProperty('level')) {
        obj['level'] = ApiClient.convertToType(data['level'], 'String');
      }
      if (data.hasOwnProperty('logo_url')) {
        obj['logo_url'] = ApiClient.convertToType(data['logo_url'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('network_size')) {
        obj['network_size'] = ApiClient.convertToType(data['network_size'], 'Number');
      }
      if (data.hasOwnProperty('non_preferred_brand_drugs')) {
        obj['non_preferred_brand_drugs'] = ApiClient.convertToType(data['non_preferred_brand_drugs'], 'String');
      }
      if (data.hasOwnProperty('on_market')) {
        obj['on_market'] = ApiClient.convertToType(data['on_market'], 'Boolean');
      }
      if (data.hasOwnProperty('off_market')) {
        obj['off_market'] = ApiClient.convertToType(data['off_market'], 'Boolean');
      }
      if (data.hasOwnProperty('out_of_network_coverage')) {
        obj['out_of_network_coverage'] = ApiClient.convertToType(data['out_of_network_coverage'], 'Boolean');
      }
      if (data.hasOwnProperty('out_of_network_ids')) {
        obj['out_of_network_ids'] = ApiClient.convertToType(data['out_of_network_ids'], ['Number']);
      }
      if (data.hasOwnProperty('outpatient_facility')) {
        obj['outpatient_facility'] = ApiClient.convertToType(data['outpatient_facility'], 'String');
      }
      if (data.hasOwnProperty('outpatient_mental_health')) {
        obj['outpatient_mental_health'] = ApiClient.convertToType(data['outpatient_mental_health'], 'String');
      }
      if (data.hasOwnProperty('outpatient_physician')) {
        obj['outpatient_physician'] = ApiClient.convertToType(data['outpatient_physician'], 'String');
      }
      if (data.hasOwnProperty('outpatient_substance')) {
        obj['outpatient_substance'] = ApiClient.convertToType(data['outpatient_substance'], 'String');
      }
      if (data.hasOwnProperty('plan_market')) {
        obj['plan_market'] = ApiClient.convertToType(data['plan_market'], 'String');
      }
      if (data.hasOwnProperty('plan_type')) {
        obj['plan_type'] = ApiClient.convertToType(data['plan_type'], 'String');
      }
      if (data.hasOwnProperty('preferred_brand_drugs')) {
        obj['preferred_brand_drugs'] = ApiClient.convertToType(data['preferred_brand_drugs'], 'String');
      }
      if (data.hasOwnProperty('prenatal_postnatal_care')) {
        obj['prenatal_postnatal_care'] = ApiClient.convertToType(data['prenatal_postnatal_care'], 'String');
      }
      if (data.hasOwnProperty('preventative_care')) {
        obj['preventative_care'] = ApiClient.convertToType(data['preventative_care'], 'String');
      }
      if (data.hasOwnProperty('premium_subsidized')) {
        obj['premium_subsidized'] = ApiClient.convertToType(data['premium_subsidized'], 'Number');
      }
      if (data.hasOwnProperty('premium')) {
        obj['premium'] = ApiClient.convertToType(data['premium'], 'Number');
      }
      if (data.hasOwnProperty('premium_source')) {
        obj['premium_source'] = ApiClient.convertToType(data['premium_source'], 'String');
      }
      if (data.hasOwnProperty('primary_care_physician')) {
        obj['primary_care_physician'] = ApiClient.convertToType(data['primary_care_physician'], 'String');
      }
      if (data.hasOwnProperty('rehabilitation_services')) {
        obj['rehabilitation_services'] = ApiClient.convertToType(data['rehabilitation_services'], 'String');
      }
      if (data.hasOwnProperty('service_area_id')) {
        obj['service_area_id'] = ApiClient.convertToType(data['service_area_id'], 'String');
      }
      if (data.hasOwnProperty('skilled_nursing')) {
        obj['skilled_nursing'] = ApiClient.convertToType(data['skilled_nursing'], 'String');
      }
      if (data.hasOwnProperty('specialist')) {
        obj['specialist'] = ApiClient.convertToType(data['specialist'], 'String');
      }
      if (data.hasOwnProperty('specialty_drugs')) {
        obj['specialty_drugs'] = ApiClient.convertToType(data['specialty_drugs'], 'String');
      }
      if (data.hasOwnProperty('urgent_care')) {
        obj['urgent_care'] = ApiClient.convertToType(data['urgent_care'], 'String');
      }
      if (data.hasOwnProperty('vendor_id')) {
        obj['vendor_id'] = ApiClient.convertToType(data['vendor_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * Does the plan provide dental coverage for adults?
   * @member {Boolean} adult_dental
   */
  exports.prototype['adult_dental'] = undefined;
  /**
   * True if the plan allows dependents up to age 29
   * @member {Boolean} age29_rider
   */
  exports.prototype['age29_rider'] = undefined;
  /**
   * Benefits string for ambulance coverage
   * @member {String} ambulance
   */
  exports.prototype['ambulance'] = undefined;
  /**
   * Link to the summary of benefits and coverage (SBC) document.
   * @member {String} benefits_summary_url
   */
  exports.prototype['benefits_summary_url'] = undefined;
  /**
   * Link to a location to purchase the plan.
   * @member {String} buy_link
   */
  exports.prototype['buy_link'] = undefined;
  /**
   * Name of the insurance carrier
   * @member {String} carrier_name
   */
  exports.prototype['carrier_name'] = undefined;
  /**
   * Does the plan provide dental coverage for children?
   * @member {Boolean} child_dental
   */
  exports.prototype['child_dental'] = undefined;
  /**
   * Child eyewear benefits summary
   * @member {String} child_eyewear
   */
  exports.prototype['child_eyewear'] = undefined;
  /**
   * Child eye exam benefits summary
   * @member {String} child_eye_exam
   */
  exports.prototype['child_eye_exam'] = undefined;
  /**
   * Phone number to contact the insurance carrier
   * @member {String} customer_service_phone_number
   */
  exports.prototype['customer_service_phone_number'] = undefined;
  /**
   * Benefits summary for durable medical equipment
   * @member {String} durable_medical_equipment
   */
  exports.prototype['durable_medical_equipment'] = undefined;
  /**
   * Diagnostic tests benefit summary
   * @member {String} diagnostic_test
   */
  exports.prototype['diagnostic_test'] = undefined;
  /**
   * Alternate name for the Plan
   * @member {String} display_name
   */
  exports.prototype['display_name'] = undefined;
  /**
   * True if plan does not cover domestic partners
   * @member {Boolean} dp_rider
   */
  exports.prototype['dp_rider'] = undefined;
  /**
   * Link to the summary of drug benefits for the plan
   * @member {String} drug_formulary_url
   */
  exports.prototype['drug_formulary_url'] = undefined;
  /**
   * Effective date of coverage.
   * @member {String} effective_date
   */
  exports.prototype['effective_date'] = undefined;
  /**
   * Expiration date of coverage.
   * @member {String} expiration_date
   */
  exports.prototype['expiration_date'] = undefined;
  /**
   * Description of costs when visiting the ER
   * @member {String} emergency_room
   */
  exports.prototype['emergency_room'] = undefined;
  /**
   * Deductible for drugs when a family is on the plan.
   * @member {String} family_drug_deductible
   */
  exports.prototype['family_drug_deductible'] = undefined;
  /**
   * Maximum out-of-pocket for drugs when a family is on the plan
   * @member {String} family_drug_moop
   */
  exports.prototype['family_drug_moop'] = undefined;
  /**
   * Deductible when a family is on the plan
   * @member {String} family_medical_deductible
   */
  exports.prototype['family_medical_deductible'] = undefined;
  /**
   * Maximum out-of-pocket when a family is on the plan
   * @member {String} family_medical_moop
   */
  exports.prototype['family_medical_moop'] = undefined;
  /**
   * True if plan does not cover family planning
   * @member {Boolean} fp_rider
   */
  exports.prototype['fp_rider'] = undefined;
  /**
   * Cost for generic drugs
   * @member {String} generic_drugs
   */
  exports.prototype['generic_drugs'] = undefined;
  /**
   * Habilitation services benefits summary
   * @member {String} habilitation_services
   */
  exports.prototype['habilitation_services'] = undefined;
  /**
   * 
   * @member {String} hios_issuer_id
   */
  exports.prototype['hios_issuer_id'] = undefined;
  /**
   * Home health care benefits summary
   * @member {String} home_health_care
   */
  exports.prototype['home_health_care'] = undefined;
  /**
   * Hospice service benefits summary
   * @member {String} hospice_service
   */
  exports.prototype['hospice_service'] = undefined;
  /**
   * Is the plan HSA eligible?
   * @member {Boolean} hsa_eligible
   */
  exports.prototype['hsa_eligible'] = undefined;
  /**
   * Government-issued HIOS plan ID
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Benefits summary for imaging coverage
   * @member {String} imaging
   */
  exports.prototype['imaging'] = undefined;
  /**
   * List of NPI numbers for Providers passed in who accept this Plan
   * @member {Array.<Number>} in_network_ids
   */
  exports.prototype['in_network_ids'] = undefined;
  /**
   * Deductible for drugs when an individual is on the plan
   * @member {String} individual_drug_deductible
   */
  exports.prototype['individual_drug_deductible'] = undefined;
  /**
   * Maximum out-of-pocket for drugs when an individual is on the plan
   * @member {String} individual_drug_moop
   */
  exports.prototype['individual_drug_moop'] = undefined;
  /**
   * Deductible when an individual is on the plan
   * @member {String} individual_medical_deductible
   */
  exports.prototype['individual_medical_deductible'] = undefined;
  /**
   * Maximum out-of-pocket when an individual is on the plan
   * @member {String} individual_medical_moop
   */
  exports.prototype['individual_medical_moop'] = undefined;
  /**
   * Inpatient birth benefits summary
   * @member {String} inpatient_birth
   */
  exports.prototype['inpatient_birth'] = undefined;
  /**
   * Cost under the plan for an inpatient facility
   * @member {String} inpatient_facility
   */
  exports.prototype['inpatient_facility'] = undefined;
  /**
   * Inpatient mental helath benefits summary
   * @member {String} inpatient_mental_health
   */
  exports.prototype['inpatient_mental_health'] = undefined;
  /**
   * Cost under the plan for an inpatient physician
   * @member {String} inpatient_physician
   */
  exports.prototype['inpatient_physician'] = undefined;
  /**
   * Inpatient substance abuse benefits summary
   * @member {String} inpatient_substance
   */
  exports.prototype['inpatient_substance'] = undefined;
  /**
   * Plan metal grouping (e.g. platinum, gold, silver, etc)
   * @member {String} level
   */
  exports.prototype['level'] = undefined;
  /**
   * Link to a copy of the insurance carrier's logo
   * @member {String} logo_url
   */
  exports.prototype['logo_url'] = undefined;
  /**
   * Marketing name of the plan
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * Total number of Providers in network
   * @member {Number} network_size
   */
  exports.prototype['network_size'] = undefined;
  /**
   * Cost under the plan for non-preferred brand drugs
   * @member {String} non_preferred_brand_drugs
   */
  exports.prototype['non_preferred_brand_drugs'] = undefined;
  /**
   * Is the plan on-market?
   * @member {Boolean} on_market
   */
  exports.prototype['on_market'] = undefined;
  /**
   * Is the plan off-market?
   * @member {Boolean} off_market
   */
  exports.prototype['off_market'] = undefined;
  /**
   * Does this plan provide any out of network coverage?
   * @member {Boolean} out_of_network_coverage
   */
  exports.prototype['out_of_network_coverage'] = undefined;
  /**
   * List of NPI numbers for Providers passed in who do not accept this Plan
   * @member {Array.<Number>} out_of_network_ids
   */
  exports.prototype['out_of_network_ids'] = undefined;
  /**
   * Benefits summary for outpatient facility coverage
   * @member {String} outpatient_facility
   */
  exports.prototype['outpatient_facility'] = undefined;
  /**
   * Benefits summary for outpatient mental health coverage
   * @member {String} outpatient_mental_health
   */
  exports.prototype['outpatient_mental_health'] = undefined;
  /**
   * Benefits summary for outpatient physician coverage
   * @member {String} outpatient_physician
   */
  exports.prototype['outpatient_physician'] = undefined;
  /**
   * Outpatient substance abuse benefits summary
   * @member {String} outpatient_substance
   */
  exports.prototype['outpatient_substance'] = undefined;
  /**
   * Market in which the plan is offered (on_marketplace, shop, etc)
   * @member {String} plan_market
   */
  exports.prototype['plan_market'] = undefined;
  /**
   * Category of the plan (e.g. EPO, HMO, PPO, POS, Indemnity)
   * @member {String} plan_type
   */
  exports.prototype['plan_type'] = undefined;
  /**
   * Cost under the plan for perferred brand drugs
   * @member {String} preferred_brand_drugs
   */
  exports.prototype['preferred_brand_drugs'] = undefined;
  /**
   * Inpatient substance abuse benefits summary
   * @member {String} prenatal_postnatal_care
   */
  exports.prototype['prenatal_postnatal_care'] = undefined;
  /**
   * Benefits summary for preventative care
   * @member {String} preventative_care
   */
  exports.prototype['preventative_care'] = undefined;
  /**
   * Cumulative premium amount after subsidy
   * @member {Number} premium_subsidized
   */
  exports.prototype['premium_subsidized'] = undefined;
  /**
   * Cumulative premium amount
   * @member {Number} premium
   */
  exports.prototype['premium'] = undefined;
  /**
   * Source of the base pricing data
   * @member {String} premium_source
   */
  exports.prototype['premium_source'] = undefined;
  /**
   * Cost under the plan to visit a Primary Care Physician
   * @member {String} primary_care_physician
   */
  exports.prototype['primary_care_physician'] = undefined;
  /**
   * Benefits summary for rehabilitation services
   * @member {String} rehabilitation_services
   */
  exports.prototype['rehabilitation_services'] = undefined;
  /**
   * Foreign key for service area
   * @member {String} service_area_id
   */
  exports.prototype['service_area_id'] = undefined;
  /**
   * Benefits summary for skilled nursing services
   * @member {String} skilled_nursing
   */
  exports.prototype['skilled_nursing'] = undefined;
  /**
   * Cost under the plan to visit a specialist
   * @member {String} specialist
   */
  exports.prototype['specialist'] = undefined;
  /**
   * Cost under the plan for specialty drugs
   * @member {String} specialty_drugs
   */
  exports.prototype['specialty_drugs'] = undefined;
  /**
   * Benefits summary for urgent care
   * @member {String} urgent_care
   */
  exports.prototype['urgent_care'] = undefined;
  /**
   * Vendor-specific ID
   * @member {String} vendor_id
   */
  exports.prototype['vendor_id'] = undefined;



  return exports;
}));

