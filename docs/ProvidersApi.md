# vericred-client.ProvidersApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**providersGet**](ProvidersApi.md#providersGet) | **GET** /providers | Find providers by term and zip code
[**providersNpiGet**](ProvidersApi.md#providersNpiGet) | **GET** /providers/{npi} | Find a specific Provider


<a name="providersGet"></a>
# **providersGet**
> InlineResponse200 providersGet(searchTerm, zipCode, opts)

Find providers by term and zip code

All &#x60;Provider&#x60; searches require a &#x60;zip_code&#x60;, which we use for weighting
the search results to favor &#x60;Provider&#x60;s that are near the user.  For example,
we would want &quot;Dr. John Smith&quot; who is 5 miles away to appear before
&quot;Dr. John Smith&quot; who is 100 miles away.

The weighting also allows for non-exact matches.  In our prior example, we
would want &quot;Dr. Jon Smith&quot; who is 2 miles away to appear before the exact
match &quot;Dr. John Smith&quot; who is 100 miles away because it is more likely that
the user just entered an incorrect name.

The free text search also supports Specialty name search and &quot;body part&quot;
Specialty name search.  So, searching &quot;John Smith nose&quot; would return
&quot;Dr. John Smith&quot;, the ENT Specialist before &quot;Dr. John Smith&quot; the Internist.



### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.ProvidersApi();

var searchTerm = "searchTerm_example"; // String | String to search by

var zipCode = "zipCode_example"; // String | Zip Code to search near

var opts = { 
  'acceptsInsurance': "acceptsInsurance_example", // String | Limit results to Providers who accept at least one insurance plan.  Note that the inverse of this filter is not supported and any value will evaluate to true
  'hiosIds': ["hiosIds_example"], // [String] | HIOS id of one or more plans
  'page': "page_example", // String | Page number
  'perPage': "perPage_example", // String | Number of records to return per page
  'radius': "radius_example" // String | Radius (in miles) to use to limit results
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.providersGet(searchTerm, zipCode, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **searchTerm** | **String**| String to search by | 
 **zipCode** | **String**| Zip Code to search near | 
 **acceptsInsurance** | **String**| Limit results to Providers who accept at least one insurance plan.  Note that the inverse of this filter is not supported and any value will evaluate to true | [optional] 
 **hiosIds** | [**[String]**](String.md)| HIOS id of one or more plans | [optional] 
 **page** | **String**| Page number | [optional] 
 **perPage** | **String**| Number of records to return per page | [optional] 
 **radius** | **String**| Radius (in miles) to use to limit results | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="providersNpiGet"></a>
# **providersNpiGet**
> InlineResponse2001 providersNpiGet(npi)

Find a specific Provider

To retrieve a specific provider, just perform a GET using his NPI number



### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.ProvidersApi();

var npi = "npi_example"; // String | NPI number


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.providersNpiGet(npi, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **npi** | **String**| NPI number | 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

