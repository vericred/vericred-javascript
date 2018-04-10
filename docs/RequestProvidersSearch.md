# vericredClient.RequestProvidersSearch

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**acceptsInsurance** | **Boolean** | Limit results to Providers who accept at least one insurance         plan.  Note that the inverse of this filter is not supported and         any value will evaluate to true | [optional] 
**ids** | **[Number]** | List of NPIs | [optional] 
**minScore** | **Number** | Minimum search threshold to be included in the results | [optional] 
**networkIds** | **[Number]** | List of Vericred network ids | [optional] 
**page** | **Number** | Page number | [optional] 
**perPage** | **Number** | Number of records to return per page | [optional] 
**polygon** | **Number** | Define a custom search polygon, mutually exclusive with zip_code search | [optional] 
**radius** | **Number** | Radius (in miles) to use to limit results | [optional] 
**searchTerm** | **String** | String to search by | [optional] 
**sort** | **String** | specify sort mode (distance or random) | [optional] 
**sortSeed** | **Number** | Seed value for random sort. Randomly-ordered searches with the same seed return results in consistent order. | [optional] 
**type** | **String** | Either organization or individual | [optional] 
**zipCode** | **String** | Zip Code to search near | [optional] 


