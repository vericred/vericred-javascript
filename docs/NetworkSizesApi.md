# vericredClient.NetworkSizesApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listStateNetworkSizes**](NetworkSizesApi.md#listStateNetworkSizes) | **GET** /states/{state_id}/network_sizes | State Network Sizes


<a name="listStateNetworkSizes"></a>
# **listStateNetworkSizes**
> StateNetworkSizeResponse listStateNetworkSizes(stateId, opts)

State Network Sizes

The number of in-network Providers for each network in a given state. This data is recalculated nightly.  The endpoint is paginated.

### Example
```javascript
var vericredClient = require('vericredClient');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.NetworkSizesApi();

var stateId = "CA"; // String | State code

var opts = { 
  'page': 1, // Number | Page of paginated response
  'perPage': 1 // Number | Responses per page
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listStateNetworkSizes(stateId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stateId** | **String**| State code | 
 **page** | **Number**| Page of paginated response | [optional] 
 **perPage** | **Number**| Responses per page | [optional] 

### Return type

[**StateNetworkSizeResponse**](StateNetworkSizeResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

