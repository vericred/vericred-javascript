# vericredClient.VisionPlan

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | The vision plan identifier | [optional] 
**name** | **String** | The vision plan name | [optional] 
**issuerName** | **String** | Name of the insurance carrier | [optional] 
**audience** | **String** | The vision plan audience | [optional] 
**benefitsSummaryUrl** | **String** | Link to the summary of benefits and coverage (SBC) document. | [optional] 
**logoUrl** | **String** | Link to a copy of the insurance carrier&#39;s logo | [optional] 
**planType** | **String** | Category of the plan (e.g. EPO, HMO, PPO, POS, Indemnity, PACE,HMO w/POS, Cost, FFS, MSA) | [optional] 
**standAlone** | **Boolean** | Stand alone flag for vision plan | [optional] 
**source** | **String** | Source of the plan benefit data | [optional] 
**identifiers** | [**[PlanIdentifier]**](PlanIdentifier.md) | List of identifiers of this Plan | [optional] 
**benefits** | [**VisionPlanBenefits**](VisionPlanBenefits.md) | Vision Plan Benefits | [optional] 


