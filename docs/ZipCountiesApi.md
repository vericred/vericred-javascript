# VericredApi.ZipCountiesApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**zipCountiesGet**](ZipCountiesApi.md#zipCountiesGet) | **GET** /zip_counties | Find Zip Counties by Zip Code


<a name="zipCountiesGet"></a>
# **zipCountiesGet**
> InlineResponse2002 zipCountiesGet(zipPrefix)

Find Zip Counties by Zip Code

### Finding Zip Code and Fips Code

Our &#x60;Plan&#x60; endpoints require a zip code and a fips (county) code.  This is
because plan pricing requires both of these elements.  Users are unlikely to
know their fips code, so we provide this endpoint to look up a &#x60;ZipCounty&#x60; by
zip code and return both the selected zip and fips codes.



### Example
```javascript
var VericredApi = require('vericred-api');

var apiInstance = new VericredApi.ZipCountiesApi();

var zipPrefix = "zipPrefix_example"; // String | Partial five-digit Zip


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.zipCountiesGet(zipPrefix, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **zipPrefix** | **String**| Partial five-digit Zip | 

### Return type

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

