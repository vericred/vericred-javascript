# vericredClient.FormulariesApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listFormularies**](FormulariesApi.md#listFormularies) | **GET** /formularies | Formulary Search


<a name="listFormularies"></a>
# **listFormularies**
> FormularyResponse listFormularies(opts)

Formulary Search

Search for drugs by proprietary name

### Example
```javascript
var vericredClient = require('vericred-client');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.FormulariesApi();

var opts = { 
  'searchTerm': "HIX PPO", // String | Full or partial name of the formulary
  'rxBin': "123456", // String | RX BIN Number (found on an insurance card)
  'rxGroup': "HEALTH", // String | RX Group String (found on an insurance card)
  'rxPcn': "9999" // String | RX PCN Number (found on an insurance card)
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listFormularies(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **searchTerm** | **String**| Full or partial name of the formulary | [optional] 
 **rxBin** | **String**| RX BIN Number (found on an insurance card) | [optional] 
 **rxGroup** | **String**| RX Group String (found on an insurance card) | [optional] 
 **rxPcn** | **String**| RX PCN Number (found on an insurance card) | [optional] 

### Return type

[**FormularyResponse**](FormularyResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

