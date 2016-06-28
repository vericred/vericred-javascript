# vericredClient.ProvidersApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getProvider**](ProvidersApi.md#getProvider) | **GET** /providers/{npi} | Find a Provider
[**getProviders**](ProvidersApi.md#getProviders) | **POST** /providers/search | Find Providers


<a name="getProvider"></a>
# **getProvider**
> ProviderShowResponse getProvider(npi)

Find a Provider

To retrieve a specific provider, just perform a GET using his NPI number

### Example
```javascript
var vericredClient = require('vericredClient');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.ProvidersApi();

var npi = "1234567890"; // String | NPI number


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProvider(npi, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **npi** | **String**| NPI number | 

### Return type

[**ProviderShowResponse**](ProviderShowResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="getProviders"></a>
# **getProviders**
> ProvidersSearchResponse getProviders(opts)

Find Providers

All &#x60;Provider&#x60; searches require a &#x60;zip_code&#x60;, which we use for weighting the search results to favor &#x60;Provider&#x60;s that are near the user.  For example, we would want \&quot;Dr. John Smith\&quot; who is 5 miles away to appear before \&quot;Dr. John Smith\&quot; who is 100 miles away.  The weighting also allows for non-exact matches.  In our prior example, we would want \&quot;Dr. Jon Smith\&quot; who is 2 miles away to appear before the exact match \&quot;Dr. John Smith\&quot; who is 100 miles away because it is more likely that the user just entered an incorrect name.  The free text search also supports Specialty name search and \&quot;body part\&quot; Specialty name search.  So, searching \&quot;John Smith nose\&quot; would return \&quot;Dr. John Smith\&quot;, the ENT Specialist before \&quot;Dr. John Smith\&quot; the Internist. 

### Example
```javascript
var vericredClient = require('vericredClient');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.ProvidersApi();

var opts = { 
  'body': new vericredClient.RequestProvidersSearch() // RequestProvidersSearch | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProviders(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**RequestProvidersSearch**](RequestProvidersSearch.md)|  | [optional] 

### Return type

[**ProvidersSearchResponse**](ProvidersSearchResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

