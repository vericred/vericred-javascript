# vericred-client.PlansApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**postPlansFind**](PlansApi.md#postPlansFind) | **POST** /plans/find | 


<a name="postPlansFind"></a>
# **postPlansFind**
> PlanFindResponse postPlansFind(opts)



### Example
```javascript
var vericred-client = require('vericred-client');

var apiInstance = new vericred-client.PlansApi();

var opts = { 
  'body': new vericred-client.RequestPlanFind() // RequestPlanFind | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.postPlansFind(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**RequestPlanFind**](RequestPlanFind.md)|  | [optional] 

### Return type

[**PlanFindResponse**](PlanFindResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

