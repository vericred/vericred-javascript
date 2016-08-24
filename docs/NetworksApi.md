# vericredClient.NetworksApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listNetworks**](NetworksApi.md#listNetworks) | **GET** /networks | Networks


<a name="listNetworks"></a>
# **listNetworks**
> NetworkSearchResponse listNetworks(carrierId, opts)

Networks

A network is a list of the doctors, other health care providers, and hospitals that a plan has contracted with to provide medical care to its members. This endpoint is paginated.

### Example
```javascript
var vericredClient = require('vericredClient');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.NetworksApi();

var carrierId = "33333"; // String | Carrier HIOS Issuer ID

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
apiInstance.listNetworks(carrierId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **carrierId** | **String**| Carrier HIOS Issuer ID | 
 **page** | **Number**| Page of paginated response | [optional] 
 **perPage** | **Number**| Responses per page | [optional] 

### Return type

[**NetworkSearchResponse**](NetworkSearchResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

