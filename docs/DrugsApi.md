# vericredClient.DrugsApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listDrugs**](DrugsApi.md#listDrugs) | **GET** /drugs | Drug Search


<a name="listDrugs"></a>
# **listDrugs**
> DrugSearchResponse listDrugs(searchTerm)

Drug Search

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

var apiInstance = new vericredClient.DrugsApi();

var searchTerm = "Zyrtec"; // String | Full or partial proprietary name of drug


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listDrugs(searchTerm, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **searchTerm** | **String**| Full or partial proprietary name of drug | 

### Return type

[**DrugSearchResponse**](DrugSearchResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

