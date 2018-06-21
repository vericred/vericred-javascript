# vericredClient.DentalPlanSearchRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**applicants** | [**[DentalPlanSearchApplicant]**](DentalPlanSearchApplicant.md) | Applicants for desired plans. | [optional] 
**issuerId** | **Number** | National-level issuer id | [optional] 
**enrollmentDate** | **String** | Date of enrollment | [optional] 
**fipsCode** | **String** | County code to determine eligibility | [optional] 
**zipCode** | **String** | 5-digit zip code - this helps determine pricing. | [optional] 
**market** | **String** | The audience of plan to search for. Possible values are individual, small_group | [optional] 
**page** | **Number** | Selected page of paginated response. | [optional] 
**perPage** | **Number** | Results per page of response. | [optional] 


