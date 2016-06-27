# vericred-client.ZipCountiesApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getZipCounties**](ZipCountiesApi.md#getZipCounties) | **GET** /zip_counties | Search for Zip Counties


<a name="getZipCounties"></a>
# **getZipCounties**
> ZipCountyResponse getZipCounties(zipPrefix)

Search for Zip Counties

Our &#x60;Plan&#x60; endpoints require a zip code and a fips (county) code.  This is because plan pricing requires both of these elements.  Users are unlikely to know their fips code, so we provide this endpoint to look up a &#x60;ZipCounty&#x60; by zip code and return both the selected zip and fips codes.

### Example
```javascript
var vericred-client = require('vericred-client');
var defaultClient = vericred-client.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericred-client.ZipCountiesApi();

var zipPrefix = "1002"; // String | Partial five-digit Zip


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getZipCounties(zipPrefix, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **zipPrefix** | **String**| Partial five-digit Zip | 

### Return type

[**ZipCountyResponse**](ZipCountyResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

