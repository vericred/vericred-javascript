# vericredClient.NetworksApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createNetworkComparisons**](NetworksApi.md#createNetworkComparisons) | **POST** /networks/{id}/network_comparisons | Network Comparisons
[**listNetworks**](NetworksApi.md#listNetworks) | **GET** /networks | Networks
[**showNetwork**](NetworksApi.md#showNetwork) | **GET** /networks/{id} | Network Details


<a name="createNetworkComparisons"></a>
# **createNetworkComparisons**
> NetworkComparisonResponse createNetworkComparisons(id, body)

Network Comparisons

Compare provider counts in a given area between a base network and one or more comparison networks.  #### Comparing Networks Comparison of provider counts within a radius requires that you provide a &#x60;zip_code&#x60; and &#x60;radius&#x60; to use as a search area.  The response returns the total number of unique &#x60;Providers&#x60; in the Base &#x60;Network&#x60; (i.e. those who are not present in the Comparison &#x60;Network&#x60;), The number of unique &#x60;Provider&#x60;s in the Comparison &#x60;Network&#x60; (i.e. those who are not present in the Base &#x60;Network&#x60;), and the count of &#x60;Provider&#x60;s who are in *both* &#x60;Network&#x60;s

### Example
```javascript
var vericredClient = require('vericred-client');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.NetworksApi();

var id = 100001; // Number | Primary key of the base network

var body = new vericredClient.NetworkComparisonRequest(); // NetworkComparisonRequest | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createNetworkComparisons(id, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| Primary key of the base network | 
 **body** | [**NetworkComparisonRequest**](NetworkComparisonRequest.md)|  | 

### Return type

[**NetworkComparisonResponse**](NetworkComparisonResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listNetworks"></a>
# **listNetworks**
> NetworkSearchResponse listNetworks(carrierId, opts)

Networks

A network is a list of the doctors, other health care providers, and hospitals that a plan has contracted with to provide medical care to its members. This endpoint is paginated.

### Example
```javascript
var vericredClient = require('vericred-client');
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

<a name="showNetwork"></a>
# **showNetwork**
> NetworkDetailsResponse showNetwork(id)

Network Details

A network is a list of the doctors, other health care providers, and hospitals that a plan has contracted with to provide medical care to its members.

### Example
```javascript
var vericredClient = require('vericred-client');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.NetworksApi();

var id = 100001; // Number | Primary key of the network


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showNetwork(id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| Primary key of the network | 

### Return type

[**NetworkDetailsResponse**](NetworkDetailsResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

