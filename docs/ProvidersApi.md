# vericred-client.ProvidersApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getProviders**](ProvidersApi.md#getProviders) | **GET** /providers | 
[**getProvidersNpi**](ProvidersApi.md#getProvidersNpi) | **GET** /providers/{npi} | 


<a name="getProviders"></a>
# **getProviders**
> ProviderResponse getProviders(searchTerm, zipCode, opts)



### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.ProvidersApi();

var searchTerm = "searchTerm_example"; // String | String to search by

var zipCode = "zipCode_example"; // String | Zip Code to search near

var opts = { 
  'acceptsInsurance': "acceptsInsurance_example", // String | Limit results to Providers who accept at least one insurance plan.  Note that the inverse of this filter is not supported and any value will evaluate to true
  'page': "page_example", // String | Page number
  'perPage': "perPage_example", // String | Number of records to return per page
  'radius': "radius_example", // String | Radius (in miles) to use to limit results
  'type': "type_example" // String | Either organization or individual
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProviders(searchTerm, zipCode, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **searchTerm** | **String**| String to search by | 
 **zipCode** | **String**| Zip Code to search near | 
 **acceptsInsurance** | **String**| Limit results to Providers who accept at least one insurance plan.  Note that the inverse of this filter is not supported and any value will evaluate to true | [optional] 
 **page** | **String**| Page number | [optional] 
 **perPage** | **String**| Number of records to return per page | [optional] 
 **radius** | **String**| Radius (in miles) to use to limit results | [optional] 
 **type** | **String**| Either organization or individual | [optional] 

### Return type

[**ProviderResponse**](ProviderResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="getProvidersNpi"></a>
# **getProvidersNpi**
> ProviderResponse getProvidersNpi(npi)



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
apiInstance.getProvidersNpi(npi, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **npi** | **String**| NPI number | 

### Return type

[**ProviderResponse**](ProviderResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

