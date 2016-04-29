# VericredApi.DrugCoverageApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**drugsNdcCoveragesGet**](DrugCoverageApi.md#drugsNdcCoveragesGet) | **GET** /drugs/{ndc}/coverages | Find Drug Coverages for a given NDC


<a name="drugsNdcCoveragesGet"></a>
# **drugsNdcCoveragesGet**
> [DrugCoverage] drugsNdcCoveragesGet(ndc)

Find Drug Coverages for a given NDC

Drug Coverages are the specific tier level, quantity limit, prior authorization
and step therapy for a given Drug/Plan combination.  This endpoint returns
all DrugCoverages for a given Drug



### Example
```javascript
var VericredApi = require('vericred-api');

var apiInstance = new VericredApi.DrugCoverageApi();

var ndc = "ndc_example"; // String | NDC for a drug


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.drugsNdcCoveragesGet(ndc, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ndc** | **String**| NDC for a drug | 

### Return type

[**[DrugCoverage]**](DrugCoverage.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

