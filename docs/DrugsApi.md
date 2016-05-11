# vericred-client.DrugsApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getDrugsCoveragesNdc**](DrugsApi.md#getDrugsCoveragesNdc) | **GET** /drugs/coverages | Drug Coverages are the specific tier level, quantity limit, prior authorization and step therapy for a given Drug/Plan


<a name="getDrugsCoveragesNdc"></a>
# **getDrugsCoveragesNdc**
> DrugCoverageResponse getDrugsCoveragesNdc(ndcPackageCode, stateCode)

Drug Coverages are the specific tier level, quantity limit, prior authorization and step therapy for a given Drug/Plan

Drug Coverages are the specific tier level, quantity limit, prior authorization and step therapy for a given Drug/Plan combination. This endpoint returns all DrugCoverages for a given Drug

### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.DrugsApi();

var ndcPackageCode = "ndcPackageCode_example"; // String | NDC package code

var stateCode = "stateCode_example"; // String | Two-character state code


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getDrugsCoveragesNdc(ndcPackageCode, stateCode, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ndcPackageCode** | **String**| NDC package code | 
 **stateCode** | **String**| Two-character state code | 

### Return type

[**DrugCoverageResponse**](DrugCoverageResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

