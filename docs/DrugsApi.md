# vericred-client.DrugsApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getDrugCoverages**](DrugsApi.md#getDrugCoverages) | **GET** /drug_packages/{ndc_package_code}/coverages | Search for DrugCoverages
[**listDrugs**](DrugsApi.md#listDrugs) | **GET** /drugs | Drug Search


<a name="getDrugCoverages"></a>
# **getDrugCoverages**
> DrugCoverageResponse getDrugCoverages(ndcPackageCode, audience, stateCode, opts)

Search for DrugCoverages

Drug Coverages are the specific tier level, quantity limit, prior
authorization and step therapy for a given Drug/Plan combination. This endpoint
returns all DrugCoverages for a given Drug

### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.DrugsApi();

var ndcPackageCode = "12345-4321-11"; // String | NDC package code

var audience = "individual"; // String | Two-character state code

var stateCode = "NY"; // String | Two-character state code

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
apiInstance.getDrugCoverages(ndcPackageCode, audience, stateCode, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ndcPackageCode** | **String**| NDC package code | 
 **audience** | **String**| Two-character state code | 
 **stateCode** | **String**| Two-character state code | 
 **vericredApiKey** | **String**| API Key | [optional] 

### Return type

[**DrugCoverageResponse**](DrugCoverageResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="listDrugs"></a>
# **listDrugs**
> DrugSearchResponse listDrugs(searchTerm, opts)

Drug Search

Search for drugs by proprietary name

### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.DrugsApi();

var searchTerm = "Zyrtec"; // String | Full or partial proprietary name of drug

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
apiInstance.listDrugs(searchTerm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **searchTerm** | **String**| Full or partial proprietary name of drug | 
 **vericredApiKey** | **String**| API Key | [optional] 

### Return type

[**DrugSearchResponse**](DrugSearchResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

