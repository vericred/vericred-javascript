# vericredClient.RequestPlanFindCarrierVerification

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**applicants** | [**[RequestPlanFindApplicant]**](RequestPlanFindApplicant.md) | Applicants for desired plans. | [optional] 
**carrierId** | **Number** | National-level carrier id | [optional] 
**enrollmentDate** | **String** | Date of enrollment | [optional] 
**drugPackages** | [**[RequestPlanFindDrugPackage]**](RequestPlanFindDrugPackage.md) | National Drug Code Package Id | [optional] 
**fipsCode** | **String** | County code to determine eligibility | [optional] 
**groupName** | **String** | Label for search tracking | [optional] 
**householdIncome** | **Number** | Total household income. | [optional] 
**householdSize** | **Number** | Number of people living in household. | [optional] 
**ids** | **[Number]** | List of plan IDs to filter by | [optional] 
**market** | **String** | Type of plan to search for. | [optional] 
**providers** | [**[RequestPlanFindProvider]**](RequestPlanFindProvider.md) | List of providers to search for. | [optional] 
**page** | **Number** | Selected page of paginated response. | [optional] 
**perPage** | **Number** | Results per page of response. | [optional] 
**sort** | **String** | Sort responses by plan field. | [optional] 
**zipCode** | **String** | 5-digit zip code - this helps determine pricing. | [optional] 
**issuerVericredIds** | **[String]** | Vericred IDs of the issuers to include in search | [optional] 


