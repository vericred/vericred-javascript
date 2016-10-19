# vericredClient.PlansApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**findPlans**](PlansApi.md#findPlans) | **POST** /plans/search | Find Plans
[**showPlan**](PlansApi.md#showPlan) | **GET** /plans/{id} | Show Plan


<a name="findPlans"></a>
# **findPlans**
> PlanSearchResponse findPlans(body)

Find Plans

### Location Information  Searching for a set of plans requires a &#x60;zip_code&#x60; and &#x60;fips_code&#x60; code.  These are used to determine pricing and availabity of health plans. This endpoint is paginated.  Optionally, you may provide a list of Applicants or Providers  ### Applicants  This is a list of people who will be covered by the plan.  We use this list to calculate the premium.  You must include &#x60;age&#x60; and can include &#x60;smoker&#x60;, which also factors into pricing in some states.  Applicants *must* include an age.  If smoker is omitted, its value is assumed to be false.  #### Multiple Applicants To get pricing for multiple applicants, just append multiple sets of data to the URL with the age and smoking status of each applicant next to each other.  For example, given two applicants - one age 32 and a non-smoker and one age 29 and a smoker, you could use the following request  &#x60;GET /plans?zip_code&#x3D;07451&amp;fips_code&#x3D;33025&amp;applicants[][age]&#x3D;32&amp;applicants[][age]&#x3D;29&amp;applicants[][smoker]&#x3D;true&#x60;  It would also be acceptible to include &#x60;applicants[][smoker]&#x3D;false&#x60; after the first applicant&#39;s age.  ### Providers  We identify Providers (Doctors) by their National Practitioner Index number (NPI).  If you pass a list of Providers, keyed by their NPI number, we will return a list of which Providers are in and out of network for each plan returned.  For example, if we had two providers with the NPI numbers &#x60;12345&#x60; and &#x60;23456&#x60; you would make the following request  &#x60;GET /plans?zip_code&#x3D;07451&amp;fips_code&#x3D;33025&amp;providers[][npi]&#x3D;12345&amp;providers[][npi]&#x3D;23456&#x60;  ### Enrollment Date  To calculate plan pricing and availability, we default to the current date as the enrollment date.  To specify a date in the future (or the past), pass a string with the format &#x60;YYYY-MM-DD&#x60; in the &#x60;enrollment_date&#x60; parameter.  &#x60;GET /plans?zip_code&#x3D;07451&amp;fips_code&#x3D;33025&amp;enrollment_date&#x3D;2016-01-01&#x60;  ### Subsidy  On-marketplace plans are eligible for a subsidy based on the &#x60;household_size&#x60; and &#x60;household_income&#x60; of the applicants.  If you pass those values, we will calculate the &#x60;subsidized_premium&#x60; and return it for each plan.  If no values are provided, the &#x60;subsidized_premium&#x60; will be the same as the &#x60;premium&#x60;  &#x60;GET /plans?zip_code&#x3D;07451&amp;fips_code&#x3D;33025&amp;household_size&#x3D;4&amp;household_income&#x3D;40000&#x60;   ### Sorting  Plans can be sorted by the &#x60;premium&#x60;, &#x60;carrier_name&#x60;, &#x60;level&#x60;, and &#x60;plan_type&#x60; fields, by either ascending (as &#x60;asc&#x60;) or descending (as &#x60;dsc&#x60;) sort under the &#x60;sort&#x60; field.  For example, to sort plans by level, the sort parameter would be &#x60;level:asc&#x60;. 

### Example
```javascript
var vericredClient = require('vericredClient');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.PlansApi();

var body = new vericredClient.RequestPlanFind(); // RequestPlanFind | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.findPlans(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**RequestPlanFind**](RequestPlanFind.md)|  | 

### Return type

[**PlanSearchResponse**](PlanSearchResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="showPlan"></a>
# **showPlan**
> PlanShowResponse showPlan(id, opts)

Show Plan

Show the details of an individual Plan.  This includes deductibles, maximums out of pocket, and co-pay/coinsurance for benefits

### Example
```javascript
var vericredClient = require('vericredClient');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.PlansApi();

var id = "88582NY0230001"; // String | ID of the Plan

var opts = { 
  'year': 2016 // Number | Plan year (defaults to current year)
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showPlan(id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| ID of the Plan | 
 **year** | **Number**| Plan year (defaults to current year) | [optional] 

### Return type

[**PlanShowResponse**](PlanShowResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

