# vericredClient.ProvidersApi

All URIs are relative to *https://api.vericred.com/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getProvider**](ProvidersApi.md#getProvider) | **GET** /providers/{npi} | Find a Provider
[**getProviders**](ProvidersApi.md#getProviders) | **POST** /providers/search | Find Providers
[**getProviders_0**](ProvidersApi.md#getProviders_0) | **POST** /providers/search/geocode | Find Providers


<a name="getProvider"></a>
# **getProvider**
> ProviderShowResponse getProvider(npi, opts)

Find a Provider

To retrieve a specific provider, just perform a GET using his NPI number

### Example
```javascript
var vericredClient = require('vericred-client');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.ProvidersApi();

var npi = "1234567890"; // String | NPI number

var opts = { 
  'year': "2016", // String | Only show plan ids for the given year
  'state': "NY" // String | Only show plan ids for the given state
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProvider(npi, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **npi** | **String**| NPI number | 
 **year** | **String**| Only show plan ids for the given year | [optional] 
 **state** | **String**| Only show plan ids for the given state | [optional] 

### Return type

[**ProviderShowResponse**](ProviderShowResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="getProviders"></a>
# **getProviders**
> ProvidersSearchResponse getProviders(body)

Find Providers

### Provider Details All searches can take a &#x60;search_term&#x60;, which is used as a component in the score (and thus the ranking/order) of the results.  This is combined with the proximity to the location in ranking results. For example, we would want \&quot;Dr. John Smith\&quot; who is 5 miles away from a given Zip Code to appear before \&quot;Dr. John Smith\&quot; who is 100 miles away.  The weighting also allows for non-exact matches.  In our prior example, we would want \&quot;Dr. Jon Smith\&quot; who is 2 miles away to appear before the exact match \&quot;Dr. John Smith\&quot; who is 100 miles away because it is more likely that the user just entered an incorrect name.  The free text search also supports Specialty name search and \&quot;body part\&quot; Specialty name search.  So, searching \&quot;John Smith nose\&quot; would return \&quot;Dr. John Smith\&quot;, the ENT Specialist before \&quot;Dr. John Smith\&quot; the Internist.  In addition, we can filter &#x60;Providers&#x60; by whether or not they accept *any* insurance.  Our data set includes over 4 million &#x60;Providers&#x60;, some of whom do not accept any insurance at all.  This filter makes it more likely that the user will find his or her practitioner in some cases.  We can also use &#x60;min_score&#x60; to omit less relevant results.  This makes sense in the case where your application wants to display *all* of the results returned regardless of how many there are.  Otherwise, using our default &#x60;min_score&#x60; and pagination should be sufficient.  ### Location Information  All &#x60;Provider&#x60; searches that do *not* specify &#x60;plan_ids&#x60; or &#x60;network_ids&#x60;require some type of location information. We use this information either to weight results or to filter results, depending on the type.  #### Zip Code When providing the &#x60;zip_code&#x60; parameter, we order the &#x60;Providers&#x60; returned based on their score, which incorporates their proximity to the given Zip Code and the closeness of match to the search text.  If a &#x60;radius&#x60; is also provided, we filter out &#x60;Providers&#x60; who are outside of that radius from the center of the Zip Code provided  #### Polygon When providing the &#x60;polygon&#x60; parameter, we filter providers who are outside the bounds of the shape provided.  This is mutually exclusive with &#x60;zip_code&#x60; and &#x60;radius&#x60;.  ### Plan/Network Information We can also filter based on &#x60;Plan&#x60; and &#x60;Network&#x60; participation.  These filters are mutually exclusive and return the union of the resulting sets for each &#x60;Plan&#x60; or &#x60;Network&#x60;.  I.e. if you provider Plan A and Plan B, you will receive &#x60;Providers&#x60; who accept *either* &#x60;Plan&#x60;.  The same is true for &#x60;Networks&#x60;.  ### Examples  *Find Dr. Foo near Brooklyn*  &#x60;{ \&quot;search_term\&quot;: \&quot;Foo\&quot;, \&quot;zip_code\&quot;: \&quot;11215\&quot; }&#x60;  *Find all Providers within 5 miles of Brooklyn who accept a Plan*  &#x60;{ \&quot;zip_code\&quot;: \&quot;11215\&quot;, \&quot;radius\&quot;: 5, \&quot;hios_ids\&quot;: [\&quot;88582NY0230001\&quot;] }&#x60;  *Find all providers on a map of Brooklyn ordered by a combination of proximity to the center point of the map and relevance to the search term \&quot;ENT\&quot;*  &#x60;&#x60;&#x60; {   \&quot;polygon\&quot;: [       {\&quot;lon\&quot;:-74.0126609802,\&quot;lat\&quot;:40.6275684851 },       {\&quot;lon\&quot;:-74.0126609802,\&quot;lat\&quot;:40.7097269508 },       {\&quot;lon\&quot;:-73.9367866516,\&quot;lat\&quot;:40.7097269508 },       {\&quot;lon\&quot;:-73.9367866516,\&quot;lat\&quot;:40.6275684851 }   ],   \&quot;search_term\&quot; : \&quot;ENT\&quot; } &#x60;&#x60;&#x60; 

### Example
```javascript
var vericredClient = require('vericred-client');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.ProvidersApi();

var body = new vericredClient.RequestProvidersSearch(); // RequestProvidersSearch | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProviders(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**RequestProvidersSearch**](RequestProvidersSearch.md)|  | 

### Return type

[**ProvidersSearchResponse**](ProvidersSearchResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="getProviders_0"></a>
# **getProviders_0**
> ProvidersGeocodeResponse getProviders_0(body)

Find Providers

### Provider Details All searches can take a &#x60;search_term&#x60;, which is used as a component in the score (and thus the ranking/order) of the results.  This is combined with the proximity to the location in ranking results. For example, we would want \&quot;Dr. John Smith\&quot; who is 5 miles away from a given Zip Code to appear before \&quot;Dr. John Smith\&quot; who is 100 miles away.  The weighting also allows for non-exact matches.  In our prior example, we would want \&quot;Dr. Jon Smith\&quot; who is 2 miles away to appear before the exact match \&quot;Dr. John Smith\&quot; who is 100 miles away because it is more likely that the user just entered an incorrect name.  The free text search also supports Specialty name search and \&quot;body part\&quot; Specialty name search.  So, searching \&quot;John Smith nose\&quot; would return \&quot;Dr. John Smith\&quot;, the ENT Specialist before \&quot;Dr. John Smith\&quot; the Internist.  In addition, we can filter &#x60;Providers&#x60; by whether or not they accept *any* insurance.  Our data set includes over 4 million &#x60;Providers&#x60;, some of whom do not accept any insurance at all.  This filter makes it more likely that the user will find his or her practitioner in some cases.  We can also use &#x60;min_score&#x60; to omit less relevant results.  This makes sense in the case where your application wants to display *all* of the results returned regardless of how many there are.  Otherwise, using our default &#x60;min_score&#x60; and pagination should be sufficient.  ### Location Information  All &#x60;Provider&#x60; searches that do *not* specify &#x60;plan_ids&#x60; or &#x60;network_ids&#x60;require some type of location information. We use this information either to weight results or to filter results, depending on the type.  #### Zip Code When providing the &#x60;zip_code&#x60; parameter, we order the &#x60;Providers&#x60; returned based on their score, which incorporates their proximity to the given Zip Code and the closeness of match to the search text.  If a &#x60;radius&#x60; is also provided, we filter out &#x60;Providers&#x60; who are outside of that radius from the center of the Zip Code provided  #### Polygon When providing the &#x60;polygon&#x60; parameter, we filter providers who are outside the bounds of the shape provided.  This is mutually exclusive with &#x60;zip_code&#x60; and &#x60;radius&#x60;.  ### Plan/Network Information We can also filter based on &#x60;Plan&#x60; and &#x60;Network&#x60; participation.  These filters are mutually exclusive and return the union of the resulting sets for each &#x60;Plan&#x60; or &#x60;Network&#x60;.  I.e. if you provider Plan A and Plan B, you will receive &#x60;Providers&#x60; who accept *either* &#x60;Plan&#x60;.  The same is true for &#x60;Networks&#x60;.  ### Examples  *Find Dr. Foo near Brooklyn*  &#x60;{ \&quot;search_term\&quot;: \&quot;Foo\&quot;, \&quot;zip_code\&quot;: \&quot;11215\&quot; }&#x60;  *Find all Providers within 5 miles of Brooklyn who accept a Plan*  &#x60;{ \&quot;zip_code\&quot;: \&quot;11215\&quot;, \&quot;radius\&quot;: 5, \&quot;hios_ids\&quot;: [\&quot;88582NY0230001\&quot;] }&#x60;  *Find all providers on a map of Brooklyn ordered by a combination of proximity to the center point of the map and relevance to the search term \&quot;ENT\&quot;*  &#x60;&#x60;&#x60; {   \&quot;polygon\&quot;: [       {\&quot;lon\&quot;:-74.0126609802,\&quot;lat\&quot;:40.6275684851 },       {\&quot;lon\&quot;:-74.0126609802,\&quot;lat\&quot;:40.7097269508 },       {\&quot;lon\&quot;:-73.9367866516,\&quot;lat\&quot;:40.7097269508 },       {\&quot;lon\&quot;:-73.9367866516,\&quot;lat\&quot;:40.6275684851 }   ],   \&quot;search_term\&quot; : \&quot;ENT\&quot; } &#x60;&#x60;&#x60; 

### Example
```javascript
var vericredClient = require('vericred-client');
var defaultClient = vericredClient.ApiClient.default;

// Configure API key authorization: Vericred-Api-Key
var Vericred-Api-Key = defaultClient.authentications['Vericred-Api-Key'];
Vericred-Api-Key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Vericred-Api-Key.apiKeyPrefix = 'Token';

var apiInstance = new vericredClient.ProvidersApi();

var body = new vericredClient.RequestProvidersSearch(); // RequestProvidersSearch | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProviders_0(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**RequestProvidersSearch**](RequestProvidersSearch.md)|  | 

### Return type

[**ProvidersGeocodeResponse**](ProvidersGeocodeResponse.md)

### Authorization

[Vericred-Api-Key](../README.md#Vericred-Api-Key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

