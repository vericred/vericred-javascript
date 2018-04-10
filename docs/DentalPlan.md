# vericredClient.DentalPlan

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | The dental plan identifier | [optional] 
**name** | **String** | The dental plan name | [optional] 
**issuerName** | **String** | Name of the insurance carrier | [optional] 
**audience** | **String** | The dental plan audience | [optional] 
**logoUrl** | **String** | Link to a copy of the insurance carrier&#39;s logo | [optional] 
**planType** | **String** | Category of the plan (e.g. EPO, HMO, PPO, POS, Indemnity, PACE,HMO w/POS, Cost, FFS, MSA) | [optional] 
**standAlone** | **Boolean** | Stand alone flag for dental plan | [optional] 
**source** | **String** | Source of the plan benefit data | [optional] 
**identifiers** | [**[PlanIdentifier]**](PlanIdentifier.md) | List of identifiers of this Plan | [optional] 
**benefits** | [**DentalPlanBenefits**](DentalPlanBenefits.md) | Dental Plan Benefits | [optional] 


