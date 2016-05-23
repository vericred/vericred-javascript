# vericred-client.ZipCountiesApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getZipCounties**](ZipCountiesApi.md#getZipCounties) | **GET** /zip_counties | Search for Zip Counties


<a name="getZipCounties"></a>
# **getZipCounties**
> ZipCountyResponse getZipCounties(zipPrefix, opts)

Search for Zip Counties

Our &#x60;Plan&#x60; endpoints require a zip code and a fips (county) code.  This is because plan pricing requires both of these elements.  Users are unlikely to know their fips code, so we provide this endpoint to look up a &#x60;ZipCounty&#x60; by zip code and return both the selected zip and fips codes.

### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.ZipCountiesApi();

var zipPrefix = "1002"; // String | Partial five-digit Zip

var opts = { 
  'vericredApiKey': "api-doc-key" // String | API Key
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getZipCounties(zipPrefix, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **zipPrefix** | **String**| Partial five-digit Zip | 
 **vericredApiKey** | **String**| API Key | [optional] 

### Return type

[**ZipCountyResponse**](ZipCountyResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

