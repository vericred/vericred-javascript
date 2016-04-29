# vericred-client.PlansApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**plansFindPost**](PlansApi.md#plansFindPost) | **POST** /plans/find | Find a set of plans for a Zip Code and County


<a name="plansFindPost"></a>
# **plansFindPost**
> [Plan] plansFindPost(query)

Find a set of plans for a Zip Code and County

### Location Information

Searching for a set of plans requires a &#x60;zip_code&#x60; and &#x60;fips_code&#x60;
code.  These are used to determine pricing and availabity
of health plans.

Optionally, you may provide a list of Applicants or Providers

### Applicants

This is a list of people who will be covered by the plan.  We
use this list to calculate the premium.  You must include &#x60;age&#x60;
and can include &#x60;smoker&#x60;, which also factors into pricing in some
states.

Applicants *must* include an age.  If smoker is omitted, its value is assumed
to be false.

#### Multiple Applicants

To get pricing for multiple applicants, just append multiple sets
of data to the URL with the age and smoking status of each applicant
next to each other.

For example, given two applicants - one age 32 and a non-smoker and one
age 29 and a smoker, you could use the following request

&#x60;GET /plans?zip_code&#x3D;07451&amp;fips_code&#x3D;33025&amp;applicants[][age]&#x3D;32&amp;applicants[][age]&#x3D;29&amp;applicants[][smoker]&#x3D;true&#x60;

It would also be acceptible to include &#x60;applicants[][smoker]&#x3D;false&#x60; after the
first applicant&#39;s age.

### Providers

We identify Providers (Doctors) by their National Practitioner
Index number (NPI).  If you pass a list of Providers, keyed by
their NPI number, we will return a list of which Providers are
in and out of network for each plan returned.

For example, if we had two providers with the NPI numbers &#x60;12345&#x60; and &#x60;23456&#x60;
you would make the following request

&#x60;GET /plans?zip_code&#x3D;07451&amp;fips_code&#x3D;33025&amp;providers[][npi]&#x3D;12345&amp;providers[][npi]&#x3D;23456&#x60;

### Enrollment Date

To calculate plan pricing and availability, we default to the current date
as the enrollment date.  To specify a date in the future (or the past), pass
a string with the format &#x60;YYYY-MM-DD&#x60; in the &#x60;enrollment_date&#x60; parameter.

&#x60;GET /plans?zip_code&#x3D;07451&amp;fips_code&#x3D;33025&amp;enrollment_date&#x3D;2016-01-01&#x60;

### Subsidy

On-marketplace plans are eligible for a subsidy based on the
&#x60;household_size&#x60; and &#x60;household_income&#x60; of the applicants.  If you
pass those values, we will calculate the &#x60;subsidized_premium&#x60;
and return it for each plan.  If no values are provided, the
&#x60;subsidized_premium&#x60; will be the same as the &#x60;premium&#x60;

&#x60;GET /plans?zip_code&#x3D;07451&amp;fips_code&#x3D;33025&amp;household_size&#x3D;4&amp;household_income&#x3D;40000&#x60;



### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.PlansApi();

var query = new vericred-client.Query(); // Query | Plan query


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.plansFindPost(query, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **query** | [**Query**](Query.md)| Plan query | 

### Return type

[**[Plan]**](Plan.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

