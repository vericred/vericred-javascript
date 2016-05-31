# vericred-client.NetworksApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listNetworks**](NetworksApi.md#listNetworks) | **GET** /networks | Networks


<a name="listNetworks"></a>
# **listNetworks**
> NetworkSearchResponse listNetworks(carrierId)

Networks

A network is a list of the doctors, other health care providers,
and hospitals that a plan has contracted with to provide medical care to
its members.

### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.NetworksApi();

var carrierId = "33333"; // String | Carrier HIOS Issuer ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listNetworks(carrierId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **carrierId** | **String**| Carrier HIOS Issuer ID | 

### Return type

[**NetworkSearchResponse**](NetworkSearchResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

