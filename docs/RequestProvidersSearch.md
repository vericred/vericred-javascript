# vericred-client.RequestProvidersSearch

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**acceptsInsurance** | **Boolean** | Limit results to Providers who accept at least one insurance
        plan.  Note that the inverse of this filter is not supported and
        any value will evaluate to true | [optional] 
**hiosIds** | **[String]** | List of HIOS ids | [optional] 
**page** | **Integer** | Page number | [optional] 
**perPage** | **Integer** | Number of records to return per page | [optional] 
**radius** | **Integer** | Radius (in miles) to use to limit results | [optional] 
**searchTerm** | **String** | String to search by | [optional] 
**zipCode** | **String** | Zip Code to search near | [optional] 
**type** | **String** | Either organization or individual | [optional] 


