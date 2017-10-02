# vericredClient.ProviderNotificationSubscriptionsApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createProviderNotificationSubscription**](ProviderNotificationSubscriptionsApi.md#createProviderNotificationSubscription) | **POST** /providers/subscription | Subscribe
[**deleteProviderNotificationSubscription**](ProviderNotificationSubscriptionsApi.md#deleteProviderNotificationSubscription) | **DELETE** /providers/subscription/{nonce} | Unsubscribe
[**notifyProviderNotificationSubscription**](ProviderNotificationSubscriptionsApi.md#notifyProviderNotificationSubscription) | **POST** /CALLBACK_URL | Webhook


<a name="createProviderNotificationSubscription"></a>
# **createProviderNotificationSubscription**
> NotificationSubscriptionResponse createProviderNotificationSubscription(opts)

Subscribe

Subscribe to receive webhook notifications when providers join or leave a network.  The request must include a list of National Provider Index (NPI) numbers for providers, a callback URL where notifications should be sent, and either a plan ID or a network ID. The response will include a &#x60;nonce&#x60; value. The &#x60;nonce&#x60; will be included in all webhook notifications originating from this subscription and will be used as the identifier for all subsequent requests.  The &#x60;network_id&#x60; and &#x60;plan_id&#x60; are mutually exclusive. The request must include a value for one of the fields, but cannot include both.  Examples of valid request bodies are as follows:  &#x60;&#x60;&#x60; {   \&quot;npis\&quot;: [\&quot;2712589\&quot;, \&quot;8498549\&quot;, \&quot;19528190\&quot;],   \&quot;plan_id\&quot;: 1,   \&quot;callback_url\&quot;: \&quot;https://example.com/webhook\&quot; }  &#x60;&#x60;&#x60;  &#x60;&#x60;&#x60; {   \&quot;npis\&quot;: [\&quot;2712589\&quot;, \&quot;8498549\&quot;, \&quot;19528190\&quot;],   \&quot;network_id\&quot;: 1,   \&quot;callback_url\&quot;: \&quot;https://example.com/webhook\&quot; }  &#x60;&#x60;&#x60;

### Example
```javascript
var vericredClient = require('vericred-client');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.ProviderNotificationSubscriptionsApi();

var opts = { 
  'root': new vericredClient.RequestProviderNotificationSubscription() // RequestProviderNotificationSubscription | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createProviderNotificationSubscription(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **root** | [**RequestProviderNotificationSubscription**](RequestProviderNotificationSubscription.md)|  | [optional] 

### Return type

[**NotificationSubscriptionResponse**](NotificationSubscriptionResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteProviderNotificationSubscription"></a>
# **deleteProviderNotificationSubscription**
> deleteProviderNotificationSubscription(nonce)

Unsubscribe

Unsubscribe from an existing webhook notification.

### Example
```javascript
var vericredClient = require('vericred-client');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.ProviderNotificationSubscriptionsApi();

var nonce = "7d28bda02e69ca1ebfdfe628a9bb2d4f"; // String | The nonce value that was included in the response when the subscription was created


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteProviderNotificationSubscription(nonce, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **nonce** | **String**| The nonce value that was included in the response when the subscription was created | 

### Return type

null (empty response body)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="notifyProviderNotificationSubscription"></a>
# **notifyProviderNotificationSubscription**
> notifyProviderNotificationSubscription(opts)

Webhook

Webhook notifications are sent when there are events relevant to a subscription. Notifications will be sent to the callback URL that was provided in the original request.  The endpoint handling this request should respond with a successful status code (200 &lt;&#x3D; Status Code &lt; 300). If a successful status code is not returned the notification will be sent again at a regular interval.

### Example
```javascript
var vericredClient = require('vericred-client');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.ProviderNotificationSubscriptionsApi();

var opts = { 
  'root': new vericredClient.ProviderNetworkEventNotification() // ProviderNetworkEventNotification | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.notifyProviderNotificationSubscription(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **root** | [**ProviderNetworkEventNotification**](ProviderNetworkEventNotification.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

