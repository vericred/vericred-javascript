# vericredClient.DrugPackagesApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**showFormularyDrugPackageCoverage**](DrugPackagesApi.md#showFormularyDrugPackageCoverage) | **GET** /formularies/{formulary_id}/drug_packages/{ndc_package_code} | Formulary Drug Package Search


<a name="showFormularyDrugPackageCoverage"></a>
# **showFormularyDrugPackageCoverage**
> FormularyDrugPackageResponse showFormularyDrugPackageCoverage(formularyId, ndcPackageCode)

Formulary Drug Package Search

Search for coverage by Formulary and DrugPackage ID

### Example
```javascript
var vericredClient = require('vericred-client');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.DrugPackagesApi();

var formularyId = "123"; // String | ID of the Formulary in question

var ndcPackageCode = "07777-3105-01"; // String | ID of the DrugPackage in question


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showFormularyDrugPackageCoverage(formularyId, ndcPackageCode, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **formularyId** | **String**| ID of the Formulary in question | 
 **ndcPackageCode** | **String**| ID of the DrugPackage in question | 

### Return type

[**FormularyDrugPackageResponse**](FormularyDrugPackageResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

