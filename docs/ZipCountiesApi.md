# vericred-client.ZipCountiesApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getZipCounties**](ZipCountiesApi.md#getZipCounties) | **GET** /zip_counties | 


<a name="getZipCounties"></a>
# **getZipCounties**
> ZipCountyResponse getZipCounties(zipPrefix)



### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.ZipCountiesApi();

var zipPrefix = "zipPrefix_example"; // String | Partial five-digit Zip


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

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

