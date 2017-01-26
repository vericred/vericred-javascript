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
    root.vericredClient.Pricing = factory(root.vericredClient.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Pricing model module.
   * @module model/Pricing
   * @version 0.0.8
   */

  /**
   * Constructs a new <code>Pricing</code>.
   * @alias module:model/Pricing
   * @class
   */
  var exports = function() {
    var _this = this;














  };

  /**
   * Constructs a <code>Pricing</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Pricing} obj Optional instance to populate.
   * @return {module:model/Pricing} The populated <code>Pricing</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('age')) {
        obj['age'] = ApiClient.convertToType(data['age'], 'Number');
      }
      if (data.hasOwnProperty('effective_date')) {
        obj['effective_date'] = ApiClient.convertToType(data['effective_date'], 'Date');
      }
      if (data.hasOwnProperty('expiration_date')) {
        obj['expiration_date'] = ApiClient.convertToType(data['expiration_date'], 'Date');
      }
      if (data.hasOwnProperty('plan_id')) {
        obj['plan_id'] = ApiClient.convertToType(data['plan_id'], 'Number');
      }
      if (data.hasOwnProperty('premium_child_only')) {
        obj['premium_child_only'] = ApiClient.convertToType(data['premium_child_only'], 'Number');
      }
      if (data.hasOwnProperty('premium_family')) {
        obj['premium_family'] = ApiClient.convertToType(data['premium_family'], 'Number');
      }
      if (data.hasOwnProperty('premium_single')) {
        obj['premium_single'] = ApiClient.convertToType(data['premium_single'], 'Number');
      }
      if (data.hasOwnProperty('premium_single_and_children')) {
        obj['premium_single_and_children'] = ApiClient.convertToType(data['premium_single_and_children'], 'Number');
      }
      if (data.hasOwnProperty('premium_single_and_spouse')) {
        obj['premium_single_and_spouse'] = ApiClient.convertToType(data['premium_single_and_spouse'], 'Number');
      }
      if (data.hasOwnProperty('premium_single_smoker')) {
        obj['premium_single_smoker'] = ApiClient.convertToType(data['premium_single_smoker'], 'Number');
      }
      if (data.hasOwnProperty('rating_area_id')) {
        obj['rating_area_id'] = ApiClient.convertToType(data['rating_area_id'], 'String');
      }
      if (data.hasOwnProperty('premium_source')) {
        obj['premium_source'] = ApiClient.convertToType(data['premium_source'], 'String');
      }
      if (data.hasOwnProperty('updated_at')) {
        obj['updated_at'] = ApiClient.convertToType(data['updated_at'], 'String');
      }
    }
    return obj;
  }

  /**
   * Age of applicant
   * @member {Number} age
   */
  exports.prototype['age'] = undefined;
  /**
   * Effective date of plan
   * @member {Date} effective_date
   */
  exports.prototype['effective_date'] = undefined;
  /**
   * Plan expiration date
   * @member {Date} expiration_date
   */
  exports.prototype['expiration_date'] = undefined;
  /**
   * Foreign key to plans
   * @member {Number} plan_id
   */
  exports.prototype['plan_id'] = undefined;
  /**
   * Child-only premium
   * @member {Number} premium_child_only
   */
  exports.prototype['premium_child_only'] = undefined;
  /**
   * Family premium
   * @member {Number} premium_family
   */
  exports.prototype['premium_family'] = undefined;
  /**
   * Single-person premium
   * @member {Number} premium_single
   */
  exports.prototype['premium_single'] = undefined;
  /**
   * Single person including children premium
   * @member {Number} premium_single_and_children
   */
  exports.prototype['premium_single_and_children'] = undefined;
  /**
   * Person with spouse premium
   * @member {Number} premium_single_and_spouse
   */
  exports.prototype['premium_single_and_spouse'] = undefined;
  /**
   * Premium for single smoker
   * @member {Number} premium_single_smoker
   */
  exports.prototype['premium_single_smoker'] = undefined;
  /**
   * Foreign key to rating areas
   * @member {String} rating_area_id
   */
  exports.prototype['rating_area_id'] = undefined;
  /**
   * Where was this pricing data extracted from?
   * @member {String} premium_source
   */
  exports.prototype['premium_source'] = undefined;
  /**
   * Time when pricing was last updated
   * @member {String} updated_at
   */
  exports.prototype['updated_at'] = undefined;



  return exports;
}));


