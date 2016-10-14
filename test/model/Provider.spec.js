/**
 * Vericred API
 * Vericred's API allows you to search for Health Plans that a specific doctor
accepts.

## Getting Started

Visit our [Developer Portal](https://vericred.3scale.net) to
create an account.

Once you have created an account, you can create one Application for
Production and another for our Sandbox (select the appropriate Plan when
you create the Application).

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
    instance = new vericredClient.Provider();
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

  describe('Provider', function() {
    it('should create an instance of Provider', function() {
      // uncomment below and update the code to test Provider
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be.a(vericredClient.Provider);
    });

    it('should have the property acceptingChangeOfPayorPatients (base name: "accepting_change_of_payor_patients")', function() {
      // uncomment below and update the code to test the property acceptingChangeOfPayorPatients
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property acceptingMedicaidPatients (base name: "accepting_medicaid_patients")', function() {
      // uncomment below and update the code to test the property acceptingMedicaidPatients
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property acceptingMedicarePatients (base name: "accepting_medicare_patients")', function() {
      // uncomment below and update the code to test the property acceptingMedicarePatients
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property acceptingPrivatePatients (base name: "accepting_private_patients")', function() {
      // uncomment below and update the code to test the property acceptingPrivatePatients
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property acceptingReferralPatients (base name: "accepting_referral_patients")', function() {
      // uncomment below and update the code to test the property acceptingReferralPatients
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property city (base name: "city")', function() {
      // uncomment below and update the code to test the property city
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property email (base name: "email")', function() {
      // uncomment below and update the code to test the property email
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property gender (base name: "gender")', function() {
      // uncomment below and update the code to test the property gender
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property firstName (base name: "first_name")', function() {
      // uncomment below and update the code to test the property firstName
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property lastName (base name: "last_name")', function() {
      // uncomment below and update the code to test the property lastName
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property latitude (base name: "latitude")', function() {
      // uncomment below and update the code to test the property latitude
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property longitude (base name: "longitude")', function() {
      // uncomment below and update the code to test the property longitude
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property middleName (base name: "middle_name")', function() {
      // uncomment below and update the code to test the property middleName
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property networkIds (base name: "network_ids")', function() {
      // uncomment below and update the code to test the property networkIds
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property organizationName (base name: "organization_name")', function() {
      // uncomment below and update the code to test the property organizationName
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property personalPhone (base name: "personal_phone")', function() {
      // uncomment below and update the code to test the property personalPhone
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property phone (base name: "phone")', function() {
      // uncomment below and update the code to test the property phone
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property presentationName (base name: "presentation_name")', function() {
      // uncomment below and update the code to test the property presentationName
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property specialty (base name: "specialty")', function() {
      // uncomment below and update the code to test the property specialty
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property state (base name: "state")', function() {
      // uncomment below and update the code to test the property state
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property stateId (base name: "state_id")', function() {
      // uncomment below and update the code to test the property stateId
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property streetLine1 (base name: "street_line_1")', function() {
      // uncomment below and update the code to test the property streetLine1
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property streetLine2 (base name: "street_line_2")', function() {
      // uncomment below and update the code to test the property streetLine2
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property suffix (base name: "suffix")', function() {
      // uncomment below and update the code to test the property suffix
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property title (base name: "title")', function() {
      // uncomment below and update the code to test the property title
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

    it('should have the property zipCode (base name: "zip_code")', function() {
      // uncomment below and update the code to test the property zipCode
      //var instane = new vericredClient.Provider();
      //expect(instance).to.be();
    });

  });

}));
