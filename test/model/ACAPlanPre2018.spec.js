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
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.vericredClient);
  }
}(this, function(expect, vericredClient) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new vericredClient.ACAPlanPre2018();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('ACAPlanPre2018', function() {
    it('should create an instance of ACAPlanPre2018', function() {
      // uncomment below and update the code to test ACAPlanPre2018
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be.a(vericredClient.ACAPlanPre2018);
    });

    it('should have the property carrierName (base name: "carrier_name")', function() {
      // uncomment below and update the code to test the property carrierName
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property displayName (base name: "display_name")', function() {
      // uncomment below and update the code to test the property displayName
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property effectiveDate (base name: "effective_date")', function() {
      // uncomment below and update the code to test the property effectiveDate
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property expirationDate (base name: "expiration_date")', function() {
      // uncomment below and update the code to test the property expirationDate
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property identifiers (base name: "identifiers")', function() {
      // uncomment below and update the code to test the property identifiers
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property networkIds (base name: "network_ids")', function() {
      // uncomment below and update the code to test the property networkIds
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property networkSize (base name: "network_size")', function() {
      // uncomment below and update the code to test the property networkSize
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property planType (base name: "plan_type")', function() {
      // uncomment below and update the code to test the property planType
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property serviceAreaId (base name: "service_area_id")', function() {
      // uncomment below and update the code to test the property serviceAreaId
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property source (base name: "source")', function() {
      // uncomment below and update the code to test the property source
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property adultDental (base name: "adult_dental")', function() {
      // uncomment below and update the code to test the property adultDental
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property age29Rider (base name: "age29_rider")', function() {
      // uncomment below and update the code to test the property age29Rider
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property ambulance (base name: "ambulance")', function() {
      // uncomment below and update the code to test the property ambulance
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property benefitsSummaryUrl (base name: "benefits_summary_url")', function() {
      // uncomment below and update the code to test the property benefitsSummaryUrl
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property buyLink (base name: "buy_link")', function() {
      // uncomment below and update the code to test the property buyLink
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property childDental (base name: "child_dental")', function() {
      // uncomment below and update the code to test the property childDental
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property childEyewear (base name: "child_eyewear")', function() {
      // uncomment below and update the code to test the property childEyewear
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property childEyeExam (base name: "child_eye_exam")', function() {
      // uncomment below and update the code to test the property childEyeExam
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property customerServicePhoneNumber (base name: "customer_service_phone_number")', function() {
      // uncomment below and update the code to test the property customerServicePhoneNumber
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property durableMedicalEquipment (base name: "durable_medical_equipment")', function() {
      // uncomment below and update the code to test the property durableMedicalEquipment
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property diagnosticTest (base name: "diagnostic_test")', function() {
      // uncomment below and update the code to test the property diagnosticTest
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property dpRider (base name: "dp_rider")', function() {
      // uncomment below and update the code to test the property dpRider
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property drugFormularyUrl (base name: "drug_formulary_url")', function() {
      // uncomment below and update the code to test the property drugFormularyUrl
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property emergencyRoom (base name: "emergency_room")', function() {
      // uncomment below and update the code to test the property emergencyRoom
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property familyDrugDeductible (base name: "family_drug_deductible")', function() {
      // uncomment below and update the code to test the property familyDrugDeductible
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property familyDrugMoop (base name: "family_drug_moop")', function() {
      // uncomment below and update the code to test the property familyDrugMoop
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property familyMedicalDeductible (base name: "family_medical_deductible")', function() {
      // uncomment below and update the code to test the property familyMedicalDeductible
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property familyMedicalMoop (base name: "family_medical_moop")', function() {
      // uncomment below and update the code to test the property familyMedicalMoop
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property fpRider (base name: "fp_rider")', function() {
      // uncomment below and update the code to test the property fpRider
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property genericDrugs (base name: "generic_drugs")', function() {
      // uncomment below and update the code to test the property genericDrugs
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property habilitationServices (base name: "habilitation_services")', function() {
      // uncomment below and update the code to test the property habilitationServices
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property hiosIssuerId (base name: "hios_issuer_id")', function() {
      // uncomment below and update the code to test the property hiosIssuerId
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property homeHealthCare (base name: "home_health_care")', function() {
      // uncomment below and update the code to test the property homeHealthCare
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property hospiceService (base name: "hospice_service")', function() {
      // uncomment below and update the code to test the property hospiceService
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property hsaEligible (base name: "hsa_eligible")', function() {
      // uncomment below and update the code to test the property hsaEligible
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property imaging (base name: "imaging")', function() {
      // uncomment below and update the code to test the property imaging
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property individualDrugDeductible (base name: "individual_drug_deductible")', function() {
      // uncomment below and update the code to test the property individualDrugDeductible
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property individualDrugMoop (base name: "individual_drug_moop")', function() {
      // uncomment below and update the code to test the property individualDrugMoop
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property individualMedicalDeductible (base name: "individual_medical_deductible")', function() {
      // uncomment below and update the code to test the property individualMedicalDeductible
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property individualMedicalMoop (base name: "individual_medical_moop")', function() {
      // uncomment below and update the code to test the property individualMedicalMoop
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property inpatientBirth (base name: "inpatient_birth")', function() {
      // uncomment below and update the code to test the property inpatientBirth
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property inpatientFacility (base name: "inpatient_facility")', function() {
      // uncomment below and update the code to test the property inpatientFacility
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property inpatientMentalHealth (base name: "inpatient_mental_health")', function() {
      // uncomment below and update the code to test the property inpatientMentalHealth
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property inpatientPhysician (base name: "inpatient_physician")', function() {
      // uncomment below and update the code to test the property inpatientPhysician
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property inpatientSubstance (base name: "inpatient_substance")', function() {
      // uncomment below and update the code to test the property inpatientSubstance
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property inNetworkIds (base name: "in_network_ids")', function() {
      // uncomment below and update the code to test the property inNetworkIds
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property level (base name: "level")', function() {
      // uncomment below and update the code to test the property level
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property logoUrl (base name: "logo_url")', function() {
      // uncomment below and update the code to test the property logoUrl
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property nonPreferredBrandDrugs (base name: "non_preferred_brand_drugs")', function() {
      // uncomment below and update the code to test the property nonPreferredBrandDrugs
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property onMarket (base name: "on_market")', function() {
      // uncomment below and update the code to test the property onMarket
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property offMarket (base name: "off_market")', function() {
      // uncomment below and update the code to test the property offMarket
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property outOfNetworkCoverage (base name: "out_of_network_coverage")', function() {
      // uncomment below and update the code to test the property outOfNetworkCoverage
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property outOfNetworkIds (base name: "out_of_network_ids")', function() {
      // uncomment below and update the code to test the property outOfNetworkIds
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property outpatientFacility (base name: "outpatient_facility")', function() {
      // uncomment below and update the code to test the property outpatientFacility
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property outpatientMentalHealth (base name: "outpatient_mental_health")', function() {
      // uncomment below and update the code to test the property outpatientMentalHealth
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property outpatientPhysician (base name: "outpatient_physician")', function() {
      // uncomment below and update the code to test the property outpatientPhysician
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property outpatientSubstance (base name: "outpatient_substance")', function() {
      // uncomment below and update the code to test the property outpatientSubstance
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property planMarket (base name: "plan_market")', function() {
      // uncomment below and update the code to test the property planMarket
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property preferredBrandDrugs (base name: "preferred_brand_drugs")', function() {
      // uncomment below and update the code to test the property preferredBrandDrugs
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property prenatalPostnatalCare (base name: "prenatal_postnatal_care")', function() {
      // uncomment below and update the code to test the property prenatalPostnatalCare
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property preventativeCare (base name: "preventative_care")', function() {
      // uncomment below and update the code to test the property preventativeCare
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property premiumSubsidized (base name: "premium_subsidized")', function() {
      // uncomment below and update the code to test the property premiumSubsidized
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property premium (base name: "premium")', function() {
      // uncomment below and update the code to test the property premium
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property premiumSource (base name: "premium_source")', function() {
      // uncomment below and update the code to test the property premiumSource
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property primaryCarePhysician (base name: "primary_care_physician")', function() {
      // uncomment below and update the code to test the property primaryCarePhysician
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property rehabilitationServices (base name: "rehabilitation_services")', function() {
      // uncomment below and update the code to test the property rehabilitationServices
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property skilledNursing (base name: "skilled_nursing")', function() {
      // uncomment below and update the code to test the property skilledNursing
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property specialist (base name: "specialist")', function() {
      // uncomment below and update the code to test the property specialist
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property specialtyDrugs (base name: "specialty_drugs")', function() {
      // uncomment below and update the code to test the property specialtyDrugs
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property urgentCare (base name: "urgent_care")', function() {
      // uncomment below and update the code to test the property urgentCare
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property actuarialValue (base name: "actuarial_value")', function() {
      // uncomment below and update the code to test the property actuarialValue
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property chiropracticServices (base name: "chiropractic_services")', function() {
      // uncomment below and update the code to test the property chiropracticServices
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property coinsurance (base name: "coinsurance")', function() {
      // uncomment below and update the code to test the property coinsurance
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property embeddedDeductible (base name: "embedded_deductible")', function() {
      // uncomment below and update the code to test the property embeddedDeductible
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property gated (base name: "gated")', function() {
      // uncomment below and update the code to test the property gated
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property imagingCenter (base name: "imaging_center")', function() {
      // uncomment below and update the code to test the property imagingCenter
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property imagingPhysician (base name: "imaging_physician")', function() {
      // uncomment below and update the code to test the property imagingPhysician
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property labTest (base name: "lab_test")', function() {
      // uncomment below and update the code to test the property labTest
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property mailOrderRx (base name: "mail_order_rx")', function() {
      // uncomment below and update the code to test the property mailOrderRx
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property nonpreferredGenericDrugShare (base name: "nonpreferred_generic_drug_share")', function() {
      // uncomment below and update the code to test the property nonpreferredGenericDrugShare
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property nonpreferredSpecialtyDrugShare (base name: "nonpreferred_specialty_drug_share")', function() {
      // uncomment below and update the code to test the property nonpreferredSpecialtyDrugShare
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property outpatientAmbulatoryCareCenter (base name: "outpatient_ambulatory_care_center")', function() {
      // uncomment below and update the code to test the property outpatientAmbulatoryCareCenter
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property planCalendar (base name: "plan_calendar")', function() {
      // uncomment below and update the code to test the property planCalendar
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property prenatalCare (base name: "prenatal_care")', function() {
      // uncomment below and update the code to test the property prenatalCare
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property postnatalCare (base name: "postnatal_care")', function() {
      // uncomment below and update the code to test the property postnatalCare
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

    it('should have the property skilledNursingFacility365 (base name: "skilled_nursing_facility_365")', function() {
      // uncomment below and update the code to test the property skilledNursingFacility365
      //var instane = new vericredClient.ACAPlanPre2018();
      //expect(instance).to.be();
    });

  });

}));
