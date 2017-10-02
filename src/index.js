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

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ACAPlan', 'model/ACAPlan2018', 'model/ACAPlan2018SearchResponse', 'model/ACAPlan2018SearchResult', 'model/ACAPlan2018ShowResponse', 'model/ACAPlanPre2018', 'model/ACAPlanPre2018SearchResponse', 'model/ACAPlanPre2018SearchResult', 'model/ACAPlanPre2018ShowResponse', 'model/Applicant', 'model/Base', 'model/BasePlanSearchResponse', 'model/Carrier', 'model/CarrierSubsidiary', 'model/County', 'model/CountyBulk', 'model/Drug', 'model/DrugCoverage', 'model/DrugCoverageResponse', 'model/DrugPackage', 'model/DrugSearchResponse', 'model/Formulary', 'model/FormularyDrugPackageResponse', 'model/FormularyResponse', 'model/Meta', 'model/MetaPlanSearchResponse', 'model/Network', 'model/NetworkComparison', 'model/NetworkComparisonRequest', 'model/NetworkComparisonResponse', 'model/NetworkDetails', 'model/NetworkDetailsResponse', 'model/NetworkSearchResponse', 'model/NetworkSize', 'model/NotificationSubscription', 'model/NotificationSubscriptionResponse', 'model/Plan', 'model/PlanCounty', 'model/PlanCountyBulk', 'model/PlanDeleted', 'model/PlanIdentifier', 'model/PlanMedicare', 'model/PlanMedicareBulk', 'model/PlanPricingMedicare', 'model/PlanSearchResponse', 'model/PlanShowResponse', 'model/Provider', 'model/ProviderDetails', 'model/ProviderGeocode', 'model/ProviderNetworkEventNotification', 'model/ProviderShowResponse', 'model/ProvidersGeocodeResponse', 'model/ProvidersSearchResponse', 'model/RatingArea', 'model/RequestPlanFind', 'model/RequestPlanFindApplicant', 'model/RequestPlanFindDrugPackage', 'model/RequestPlanFindProvider', 'model/RequestProviderNotificationSubscription', 'model/RequestProvidersSearch', 'model/RxCuiIdentifier', 'model/RxCuiIdentifierSearchResponse', 'model/ServiceArea', 'model/ServiceAreaZipCounty', 'model/State', 'model/StateNetworkSizeRequest', 'model/StateNetworkSizeResponse', 'model/ZipCode', 'model/ZipCountiesResponse', 'model/ZipCounty', 'model/ZipCountyBulk', 'model/ZipCountyResponse', 'api/DrugCoveragesApi', 'api/DrugPackagesApi', 'api/DrugsApi', 'api/FormulariesApi', 'api/NetworkSizesApi', 'api/NetworksApi', 'api/PlansApi', 'api/ProviderNotificationSubscriptionsApi', 'api/ProvidersApi', 'api/ZipCountiesApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/ACAPlan'), require('./model/ACAPlan2018'), require('./model/ACAPlan2018SearchResponse'), require('./model/ACAPlan2018SearchResult'), require('./model/ACAPlan2018ShowResponse'), require('./model/ACAPlanPre2018'), require('./model/ACAPlanPre2018SearchResponse'), require('./model/ACAPlanPre2018SearchResult'), require('./model/ACAPlanPre2018ShowResponse'), require('./model/Applicant'), require('./model/Base'), require('./model/BasePlanSearchResponse'), require('./model/Carrier'), require('./model/CarrierSubsidiary'), require('./model/County'), require('./model/CountyBulk'), require('./model/Drug'), require('./model/DrugCoverage'), require('./model/DrugCoverageResponse'), require('./model/DrugPackage'), require('./model/DrugSearchResponse'), require('./model/Formulary'), require('./model/FormularyDrugPackageResponse'), require('./model/FormularyResponse'), require('./model/Meta'), require('./model/MetaPlanSearchResponse'), require('./model/Network'), require('./model/NetworkComparison'), require('./model/NetworkComparisonRequest'), require('./model/NetworkComparisonResponse'), require('./model/NetworkDetails'), require('./model/NetworkDetailsResponse'), require('./model/NetworkSearchResponse'), require('./model/NetworkSize'), require('./model/NotificationSubscription'), require('./model/NotificationSubscriptionResponse'), require('./model/Plan'), require('./model/PlanCounty'), require('./model/PlanCountyBulk'), require('./model/PlanDeleted'), require('./model/PlanIdentifier'), require('./model/PlanMedicare'), require('./model/PlanMedicareBulk'), require('./model/PlanPricingMedicare'), require('./model/PlanSearchResponse'), require('./model/PlanShowResponse'), require('./model/Provider'), require('./model/ProviderDetails'), require('./model/ProviderGeocode'), require('./model/ProviderNetworkEventNotification'), require('./model/ProviderShowResponse'), require('./model/ProvidersGeocodeResponse'), require('./model/ProvidersSearchResponse'), require('./model/RatingArea'), require('./model/RequestPlanFind'), require('./model/RequestPlanFindApplicant'), require('./model/RequestPlanFindDrugPackage'), require('./model/RequestPlanFindProvider'), require('./model/RequestProviderNotificationSubscription'), require('./model/RequestProvidersSearch'), require('./model/RxCuiIdentifier'), require('./model/RxCuiIdentifierSearchResponse'), require('./model/ServiceArea'), require('./model/ServiceAreaZipCounty'), require('./model/State'), require('./model/StateNetworkSizeRequest'), require('./model/StateNetworkSizeResponse'), require('./model/ZipCode'), require('./model/ZipCountiesResponse'), require('./model/ZipCounty'), require('./model/ZipCountyBulk'), require('./model/ZipCountyResponse'), require('./api/DrugCoveragesApi'), require('./api/DrugPackagesApi'), require('./api/DrugsApi'), require('./api/FormulariesApi'), require('./api/NetworkSizesApi'), require('./api/NetworksApi'), require('./api/PlansApi'), require('./api/ProviderNotificationSubscriptionsApi'), require('./api/ProvidersApi'), require('./api/ZipCountiesApi'));
  }
}(function(ApiClient, ACAPlan, ACAPlan2018, ACAPlan2018SearchResponse, ACAPlan2018SearchResult, ACAPlan2018ShowResponse, ACAPlanPre2018, ACAPlanPre2018SearchResponse, ACAPlanPre2018SearchResult, ACAPlanPre2018ShowResponse, Applicant, Base, BasePlanSearchResponse, Carrier, CarrierSubsidiary, County, CountyBulk, Drug, DrugCoverage, DrugCoverageResponse, DrugPackage, DrugSearchResponse, Formulary, FormularyDrugPackageResponse, FormularyResponse, Meta, MetaPlanSearchResponse, Network, NetworkComparison, NetworkComparisonRequest, NetworkComparisonResponse, NetworkDetails, NetworkDetailsResponse, NetworkSearchResponse, NetworkSize, NotificationSubscription, NotificationSubscriptionResponse, Plan, PlanCounty, PlanCountyBulk, PlanDeleted, PlanIdentifier, PlanMedicare, PlanMedicareBulk, PlanPricingMedicare, PlanSearchResponse, PlanShowResponse, Provider, ProviderDetails, ProviderGeocode, ProviderNetworkEventNotification, ProviderShowResponse, ProvidersGeocodeResponse, ProvidersSearchResponse, RatingArea, RequestPlanFind, RequestPlanFindApplicant, RequestPlanFindDrugPackage, RequestPlanFindProvider, RequestProviderNotificationSubscription, RequestProvidersSearch, RxCuiIdentifier, RxCuiIdentifierSearchResponse, ServiceArea, ServiceAreaZipCounty, State, StateNetworkSizeRequest, StateNetworkSizeResponse, ZipCode, ZipCountiesResponse, ZipCounty, ZipCountyBulk, ZipCountyResponse, DrugCoveragesApi, DrugPackagesApi, DrugsApi, FormulariesApi, NetworkSizesApi, NetworksApi, PlansApi, ProviderNotificationSubscriptionsApi, ProvidersApi, ZipCountiesApi) {
  'use strict';

  /**
   * Autogenerated JavaScript client for the Vericred API..<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var vericredClient = require('index'); // See note below*.
   * var xxxSvc = new vericredClient.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new vericredClient.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new vericredClient.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new vericredClient.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 0.0.10
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The ACAPlan model constructor.
     * @property {module:model/ACAPlan}
     */
    ACAPlan: ACAPlan,
    /**
     * The ACAPlan2018 model constructor.
     * @property {module:model/ACAPlan2018}
     */
    ACAPlan2018: ACAPlan2018,
    /**
     * The ACAPlan2018SearchResponse model constructor.
     * @property {module:model/ACAPlan2018SearchResponse}
     */
    ACAPlan2018SearchResponse: ACAPlan2018SearchResponse,
    /**
     * The ACAPlan2018SearchResult model constructor.
     * @property {module:model/ACAPlan2018SearchResult}
     */
    ACAPlan2018SearchResult: ACAPlan2018SearchResult,
    /**
     * The ACAPlan2018ShowResponse model constructor.
     * @property {module:model/ACAPlan2018ShowResponse}
     */
    ACAPlan2018ShowResponse: ACAPlan2018ShowResponse,
    /**
     * The ACAPlanPre2018 model constructor.
     * @property {module:model/ACAPlanPre2018}
     */
    ACAPlanPre2018: ACAPlanPre2018,
    /**
     * The ACAPlanPre2018SearchResponse model constructor.
     * @property {module:model/ACAPlanPre2018SearchResponse}
     */
    ACAPlanPre2018SearchResponse: ACAPlanPre2018SearchResponse,
    /**
     * The ACAPlanPre2018SearchResult model constructor.
     * @property {module:model/ACAPlanPre2018SearchResult}
     */
    ACAPlanPre2018SearchResult: ACAPlanPre2018SearchResult,
    /**
     * The ACAPlanPre2018ShowResponse model constructor.
     * @property {module:model/ACAPlanPre2018ShowResponse}
     */
    ACAPlanPre2018ShowResponse: ACAPlanPre2018ShowResponse,
    /**
     * The Applicant model constructor.
     * @property {module:model/Applicant}
     */
    Applicant: Applicant,
    /**
     * The Base model constructor.
     * @property {module:model/Base}
     */
    Base: Base,
    /**
     * The BasePlanSearchResponse model constructor.
     * @property {module:model/BasePlanSearchResponse}
     */
    BasePlanSearchResponse: BasePlanSearchResponse,
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
     * The CountyBulk model constructor.
     * @property {module:model/CountyBulk}
     */
    CountyBulk: CountyBulk,
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
     * The DrugCoverageResponse model constructor.
     * @property {module:model/DrugCoverageResponse}
     */
    DrugCoverageResponse: DrugCoverageResponse,
    /**
     * The DrugPackage model constructor.
     * @property {module:model/DrugPackage}
     */
    DrugPackage: DrugPackage,
    /**
     * The DrugSearchResponse model constructor.
     * @property {module:model/DrugSearchResponse}
     */
    DrugSearchResponse: DrugSearchResponse,
    /**
     * The Formulary model constructor.
     * @property {module:model/Formulary}
     */
    Formulary: Formulary,
    /**
     * The FormularyDrugPackageResponse model constructor.
     * @property {module:model/FormularyDrugPackageResponse}
     */
    FormularyDrugPackageResponse: FormularyDrugPackageResponse,
    /**
     * The FormularyResponse model constructor.
     * @property {module:model/FormularyResponse}
     */
    FormularyResponse: FormularyResponse,
    /**
     * The Meta model constructor.
     * @property {module:model/Meta}
     */
    Meta: Meta,
    /**
     * The MetaPlanSearchResponse model constructor.
     * @property {module:model/MetaPlanSearchResponse}
     */
    MetaPlanSearchResponse: MetaPlanSearchResponse,
    /**
     * The Network model constructor.
     * @property {module:model/Network}
     */
    Network: Network,
    /**
     * The NetworkComparison model constructor.
     * @property {module:model/NetworkComparison}
     */
    NetworkComparison: NetworkComparison,
    /**
     * The NetworkComparisonRequest model constructor.
     * @property {module:model/NetworkComparisonRequest}
     */
    NetworkComparisonRequest: NetworkComparisonRequest,
    /**
     * The NetworkComparisonResponse model constructor.
     * @property {module:model/NetworkComparisonResponse}
     */
    NetworkComparisonResponse: NetworkComparisonResponse,
    /**
     * The NetworkDetails model constructor.
     * @property {module:model/NetworkDetails}
     */
    NetworkDetails: NetworkDetails,
    /**
     * The NetworkDetailsResponse model constructor.
     * @property {module:model/NetworkDetailsResponse}
     */
    NetworkDetailsResponse: NetworkDetailsResponse,
    /**
     * The NetworkSearchResponse model constructor.
     * @property {module:model/NetworkSearchResponse}
     */
    NetworkSearchResponse: NetworkSearchResponse,
    /**
     * The NetworkSize model constructor.
     * @property {module:model/NetworkSize}
     */
    NetworkSize: NetworkSize,
    /**
     * The NotificationSubscription model constructor.
     * @property {module:model/NotificationSubscription}
     */
    NotificationSubscription: NotificationSubscription,
    /**
     * The NotificationSubscriptionResponse model constructor.
     * @property {module:model/NotificationSubscriptionResponse}
     */
    NotificationSubscriptionResponse: NotificationSubscriptionResponse,
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
     * The PlanCountyBulk model constructor.
     * @property {module:model/PlanCountyBulk}
     */
    PlanCountyBulk: PlanCountyBulk,
    /**
     * The PlanDeleted model constructor.
     * @property {module:model/PlanDeleted}
     */
    PlanDeleted: PlanDeleted,
    /**
     * The PlanIdentifier model constructor.
     * @property {module:model/PlanIdentifier}
     */
    PlanIdentifier: PlanIdentifier,
    /**
     * The PlanMedicare model constructor.
     * @property {module:model/PlanMedicare}
     */
    PlanMedicare: PlanMedicare,
    /**
     * The PlanMedicareBulk model constructor.
     * @property {module:model/PlanMedicareBulk}
     */
    PlanMedicareBulk: PlanMedicareBulk,
    /**
     * The PlanPricingMedicare model constructor.
     * @property {module:model/PlanPricingMedicare}
     */
    PlanPricingMedicare: PlanPricingMedicare,
    /**
     * The PlanSearchResponse model constructor.
     * @property {module:model/PlanSearchResponse}
     */
    PlanSearchResponse: PlanSearchResponse,
    /**
     * The PlanShowResponse model constructor.
     * @property {module:model/PlanShowResponse}
     */
    PlanShowResponse: PlanShowResponse,
    /**
     * The Provider model constructor.
     * @property {module:model/Provider}
     */
    Provider: Provider,
    /**
     * The ProviderDetails model constructor.
     * @property {module:model/ProviderDetails}
     */
    ProviderDetails: ProviderDetails,
    /**
     * The ProviderGeocode model constructor.
     * @property {module:model/ProviderGeocode}
     */
    ProviderGeocode: ProviderGeocode,
    /**
     * The ProviderNetworkEventNotification model constructor.
     * @property {module:model/ProviderNetworkEventNotification}
     */
    ProviderNetworkEventNotification: ProviderNetworkEventNotification,
    /**
     * The ProviderShowResponse model constructor.
     * @property {module:model/ProviderShowResponse}
     */
    ProviderShowResponse: ProviderShowResponse,
    /**
     * The ProvidersGeocodeResponse model constructor.
     * @property {module:model/ProvidersGeocodeResponse}
     */
    ProvidersGeocodeResponse: ProvidersGeocodeResponse,
    /**
     * The ProvidersSearchResponse model constructor.
     * @property {module:model/ProvidersSearchResponse}
     */
    ProvidersSearchResponse: ProvidersSearchResponse,
    /**
     * The RatingArea model constructor.
     * @property {module:model/RatingArea}
     */
    RatingArea: RatingArea,
    /**
     * The RequestPlanFind model constructor.
     * @property {module:model/RequestPlanFind}
     */
    RequestPlanFind: RequestPlanFind,
    /**
     * The RequestPlanFindApplicant model constructor.
     * @property {module:model/RequestPlanFindApplicant}
     */
    RequestPlanFindApplicant: RequestPlanFindApplicant,
    /**
     * The RequestPlanFindDrugPackage model constructor.
     * @property {module:model/RequestPlanFindDrugPackage}
     */
    RequestPlanFindDrugPackage: RequestPlanFindDrugPackage,
    /**
     * The RequestPlanFindProvider model constructor.
     * @property {module:model/RequestPlanFindProvider}
     */
    RequestPlanFindProvider: RequestPlanFindProvider,
    /**
     * The RequestProviderNotificationSubscription model constructor.
     * @property {module:model/RequestProviderNotificationSubscription}
     */
    RequestProviderNotificationSubscription: RequestProviderNotificationSubscription,
    /**
     * The RequestProvidersSearch model constructor.
     * @property {module:model/RequestProvidersSearch}
     */
    RequestProvidersSearch: RequestProvidersSearch,
    /**
     * The RxCuiIdentifier model constructor.
     * @property {module:model/RxCuiIdentifier}
     */
    RxCuiIdentifier: RxCuiIdentifier,
    /**
     * The RxCuiIdentifierSearchResponse model constructor.
     * @property {module:model/RxCuiIdentifierSearchResponse}
     */
    RxCuiIdentifierSearchResponse: RxCuiIdentifierSearchResponse,
    /**
     * The ServiceArea model constructor.
     * @property {module:model/ServiceArea}
     */
    ServiceArea: ServiceArea,
    /**
     * The ServiceAreaZipCounty model constructor.
     * @property {module:model/ServiceAreaZipCounty}
     */
    ServiceAreaZipCounty: ServiceAreaZipCounty,
    /**
     * The State model constructor.
     * @property {module:model/State}
     */
    State: State,
    /**
     * The StateNetworkSizeRequest model constructor.
     * @property {module:model/StateNetworkSizeRequest}
     */
    StateNetworkSizeRequest: StateNetworkSizeRequest,
    /**
     * The StateNetworkSizeResponse model constructor.
     * @property {module:model/StateNetworkSizeResponse}
     */
    StateNetworkSizeResponse: StateNetworkSizeResponse,
    /**
     * The ZipCode model constructor.
     * @property {module:model/ZipCode}
     */
    ZipCode: ZipCode,
    /**
     * The ZipCountiesResponse model constructor.
     * @property {module:model/ZipCountiesResponse}
     */
    ZipCountiesResponse: ZipCountiesResponse,
    /**
     * The ZipCounty model constructor.
     * @property {module:model/ZipCounty}
     */
    ZipCounty: ZipCounty,
    /**
     * The ZipCountyBulk model constructor.
     * @property {module:model/ZipCountyBulk}
     */
    ZipCountyBulk: ZipCountyBulk,
    /**
     * The ZipCountyResponse model constructor.
     * @property {module:model/ZipCountyResponse}
     */
    ZipCountyResponse: ZipCountyResponse,
    /**
     * The DrugCoveragesApi service constructor.
     * @property {module:api/DrugCoveragesApi}
     */
    DrugCoveragesApi: DrugCoveragesApi,
    /**
     * The DrugPackagesApi service constructor.
     * @property {module:api/DrugPackagesApi}
     */
    DrugPackagesApi: DrugPackagesApi,
    /**
     * The DrugsApi service constructor.
     * @property {module:api/DrugsApi}
     */
    DrugsApi: DrugsApi,
    /**
     * The FormulariesApi service constructor.
     * @property {module:api/FormulariesApi}
     */
    FormulariesApi: FormulariesApi,
    /**
     * The NetworkSizesApi service constructor.
     * @property {module:api/NetworkSizesApi}
     */
    NetworkSizesApi: NetworkSizesApi,
    /**
     * The NetworksApi service constructor.
     * @property {module:api/NetworksApi}
     */
    NetworksApi: NetworksApi,
    /**
     * The PlansApi service constructor.
     * @property {module:api/PlansApi}
     */
    PlansApi: PlansApi,
    /**
     * The ProviderNotificationSubscriptionsApi service constructor.
     * @property {module:api/ProviderNotificationSubscriptionsApi}
     */
    ProviderNotificationSubscriptionsApi: ProviderNotificationSubscriptionsApi,
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
