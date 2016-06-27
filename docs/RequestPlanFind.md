# vericred-client.RequestPlanFind

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**applicants** | [**[RequestPlanFindApplicant]**](RequestPlanFindApplicant.md) | Applicants for desired plans. | [optional] 
**enrollmentDate** | **String** | Date of enrollment | [optional] 
**drugPackages** | [**[DrugPackage]**](DrugPackage.md) | National Drug Code Package Id | [optional] 
**fipsCode** | **String** | County code to determine eligibility | [optional] 
**householdIncome** | **Integer** | Total household income. | [optional] 
**householdSize** | **Integer** | Number of people living in household. | [optional] 
**market** | **String** | Type of plan to search for. | [optional] 
**providers** | [**[RequestPlanFindProvider]**](RequestPlanFindProvider.md) | List of providers to search for. | [optional] 
**page** | **Integer** | Selected page of paginated response. | [optional] 
**perPage** | **Integer** | Results per page of response. | [optional] 
**sort** | **String** | Sort responses by plan field. | [optional] 
**zipCode** | **String** | 5-digit zip code - this helps determine pricing. | [optional] 


