# vericredClient.RequestProvidersSearch

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**acceptsInsurance** | **Boolean** | Limit results to Providers who accept at least one insurance         plan.  Note that the inverse of this filter is not supported and         any value will evaluate to true | [optional] 
**hiosIds** | **[String]** | List of HIOS ids | [optional] 
**minScore** | **Number** | Minimum search threshold to be included in the results | [optional] 
**networkIds** | **[Number]** | List of Vericred network ids | [optional] 
**page** | **Number** | Page number | [optional] 
**perPage** | **Number** | Number of records to return per page | [optional] 
**radius** | **Number** | Radius (in miles) to use to limit results | [optional] 
**searchTerm** | **String** | String to search by | [optional] 
**zipCode** | **String** | Zip Code to search near | [optional] 
**type** | **String** | Either organization or individual | [optional] 


