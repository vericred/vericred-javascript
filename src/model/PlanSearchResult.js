(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.VericredApi) {
      root.VericredApi = {};
    }
    root.VericredApi.PlanSearchResult = factory(root.VericredApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The PlanSearchResult model module.
   * @module model/PlanSearchResult
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>PlanSearchResult</code>.
   * @alias module:model/PlanSearchResult
   * @class
   */
  var exports = function() {
















































  };

  /**
   * Constructs a <code>PlanSearchResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PlanSearchResult} obj Optional instance to populate.
   * @return {module:model/PlanSearchResult} The populated <code>PlanSearchResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('adult_dental')) {
        obj['adult_dental'] = ApiClient.convertToType(data['adult_dental'], 'Boolean');
      }
      if (data.hasOwnProperty('ambulance')) {
        obj['ambulance'] = ApiClient.convertToType(data['ambulance'], 'String');
      }
      if (data.hasOwnProperty('benefits_summary_url')) {
        obj['benefits_summary_url'] = ApiClient.convertToType(data['benefits_summary_url'], 'String');
      }
      if (data.hasOwnProperty('buy_link')) {
        obj['buy_link'] = ApiClient.convertToType(data['buy_link'], 'String');
      }
      if (data.hasOwnProperty('carrier_name')) {
        obj['carrier_name'] = ApiClient.convertToType(data['carrier_name'], 'String');
      }
      if (data.hasOwnProperty('child_dental')) {
        obj['child_dental'] = ApiClient.convertToType(data['child_dental'], 'Boolean');
      }
      if (data.hasOwnProperty('child_eyewear')) {
        obj['child_eyewear'] = ApiClient.convertToType(data['child_eyewear'], 'String');
      }
      if (data.hasOwnProperty('customer_service_phone_number')) {
        obj['customer_service_phone_number'] = ApiClient.convertToType(data['customer_service_phone_number'], 'String');
      }
      if (data.hasOwnProperty('durable_medical_equipment')) {
        obj['durable_medical_equipment'] = ApiClient.convertToType(data['durable_medical_equipment'], 'String');
      }
      if (data.hasOwnProperty('diagnostic_test')) {
        obj['diagnostic_test'] = ApiClient.convertToType(data['diagnostic_test'], 'String');
      }
      if (data.hasOwnProperty('drug_formulary_url')) {
        obj['drug_formulary_url'] = ApiClient.convertToType(data['drug_formulary_url'], 'String');
      }
      if (data.hasOwnProperty('emergency_room')) {
        obj['emergency_room'] = ApiClient.convertToType(data['emergency_room'], 'String');
      }
      if (data.hasOwnProperty('family_drug_deductible')) {
        obj['family_drug_deductible'] = ApiClient.convertToType(data['family_drug_deductible'], 'String');
      }
      if (data.hasOwnProperty('family_drug_moop')) {
        obj['family_drug_moop'] = ApiClient.convertToType(data['family_drug_moop'], 'String');
      }
      if (data.hasOwnProperty('family_medical_deductible')) {
        obj['family_medical_deductible'] = ApiClient.convertToType(data['family_medical_deductible'], 'String');
      }
      if (data.hasOwnProperty('family_medical_moop')) {
        obj['family_medical_moop'] = ApiClient.convertToType(data['family_medical_moop'], 'String');
      }
      if (data.hasOwnProperty('generic_drugs')) {
        obj['generic_drugs'] = ApiClient.convertToType(data['generic_drugs'], 'String');
      }
      if (data.hasOwnProperty('hios_issuer_id')) {
        obj['hios_issuer_id'] = ApiClient.convertToType(data['hios_issuer_id'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('imaging')) {
        obj['imaging'] = ApiClient.convertToType(data['imaging'], 'String');
      }
      if (data.hasOwnProperty('individual_drug_deductible')) {
        obj['individual_drug_deductible'] = ApiClient.convertToType(data['individual_drug_deductible'], 'String');
      }
      if (data.hasOwnProperty('individual_drug_moop')) {
        obj['individual_drug_moop'] = ApiClient.convertToType(data['individual_drug_moop'], 'String');
      }
      if (data.hasOwnProperty('individual_medical_deductible')) {
        obj['individual_medical_deductible'] = ApiClient.convertToType(data['individual_medical_deductible'], 'String');
      }
      if (data.hasOwnProperty('individual_medical_moop')) {
        obj['individual_medical_moop'] = ApiClient.convertToType(data['individual_medical_moop'], 'String');
      }
      if (data.hasOwnProperty('inpatient_facility')) {
        obj['inpatient_facility'] = ApiClient.convertToType(data['inpatient_facility'], 'String');
      }
      if (data.hasOwnProperty('inpatient_physician')) {
        obj['inpatient_physician'] = ApiClient.convertToType(data['inpatient_physician'], 'String');
      }
      if (data.hasOwnProperty('level')) {
        obj['level'] = ApiClient.convertToType(data['level'], 'String');
      }
      if (data.hasOwnProperty('logo_url')) {
        obj['logo_url'] = ApiClient.convertToType(data['logo_url'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('non_preferred_brand_drugs')) {
        obj['non_preferred_brand_drugs'] = ApiClient.convertToType(data['non_preferred_brand_drugs'], 'String');
      }
      if (data.hasOwnProperty('on_market')) {
        obj['on_market'] = ApiClient.convertToType(data['on_market'], 'Boolean');
      }
      if (data.hasOwnProperty('off_market')) {
        obj['off_market'] = ApiClient.convertToType(data['off_market'], 'Boolean');
      }
      if (data.hasOwnProperty('out_of_network_coverage')) {
        obj['out_of_network_coverage'] = ApiClient.convertToType(data['out_of_network_coverage'], 'Boolean');
      }
      if (data.hasOwnProperty('outpatient_facility')) {
        obj['outpatient_facility'] = ApiClient.convertToType(data['outpatient_facility'], 'String');
      }
      if (data.hasOwnProperty('outpatient_mental_health')) {
        obj['outpatient_mental_health'] = ApiClient.convertToType(data['outpatient_mental_health'], 'String');
      }
      if (data.hasOwnProperty('outpatient_physician')) {
        obj['outpatient_physician'] = ApiClient.convertToType(data['outpatient_physician'], 'String');
      }
      if (data.hasOwnProperty('plan_market')) {
        obj['plan_market'] = ApiClient.convertToType(data['plan_market'], 'String');
      }
      if (data.hasOwnProperty('plan_type')) {
        obj['plan_type'] = ApiClient.convertToType(data['plan_type'], 'String');
      }
      if (data.hasOwnProperty('preferred_brand_drugs')) {
        obj['preferred_brand_drugs'] = ApiClient.convertToType(data['preferred_brand_drugs'], 'String');
      }
      if (data.hasOwnProperty('preventative_care')) {
        obj['preventative_care'] = ApiClient.convertToType(data['preventative_care'], 'String');
      }
      if (data.hasOwnProperty('primary_care_physician')) {
        obj['primary_care_physician'] = ApiClient.convertToType(data['primary_care_physician'], 'String');
      }
      if (data.hasOwnProperty('rehabilitation_services')) {
        obj['rehabilitation_services'] = ApiClient.convertToType(data['rehabilitation_services'], 'String');
      }
      if (data.hasOwnProperty('specialist')) {
        obj['specialist'] = ApiClient.convertToType(data['specialist'], 'String');
      }
      if (data.hasOwnProperty('specialty_drugs')) {
        obj['specialty_drugs'] = ApiClient.convertToType(data['specialty_drugs'], 'String');
      }
      if (data.hasOwnProperty('urgent_care')) {
        obj['urgent_care'] = ApiClient.convertToType(data['urgent_care'], 'String');
      }
      if (data.hasOwnProperty('match_percentage')) {
        obj['match_percentage'] = ApiClient.convertToType(data['match_percentage'], 'Integer');
      }
      if (data.hasOwnProperty('perfect_match_percentage')) {
        obj['perfect_match_percentage'] = ApiClient.convertToType(data['perfect_match_percentage'], 'Integer');
      }
    }
    return obj;
  }


  /**
   * Does the plan provide dental coverage for adults?
   * @member {Boolean} adult_dental
   */
  exports.prototype['adult_dental'] = undefined;

  /**
   * Benefits string for ambulance coverage
   * @member {String} ambulance
   */
  exports.prototype['ambulance'] = undefined;

  /**
   * Link to the summary of benefits and coverage (SBC) document.
   * @member {String} benefits_summary_url
   */
  exports.prototype['benefits_summary_url'] = undefined;

  /**
   * Link to a location to purchase the plan.
   * @member {String} buy_link
   */
  exports.prototype['buy_link'] = undefined;

  /**
   * Name of the insurance carrier
   * @member {String} carrier_name
   */
  exports.prototype['carrier_name'] = undefined;

  /**
   * Does the plan provide dental coverage for children?
   * @member {Boolean} child_dental
   */
  exports.prototype['child_dental'] = undefined;

  /**
   * Child eyewear benefits summary
   * @member {String} child_eyewear
   */
  exports.prototype['child_eyewear'] = undefined;

  /**
   * Phone number to contact the insurance carrier
   * @member {String} customer_service_phone_number
   */
  exports.prototype['customer_service_phone_number'] = undefined;

  /**
   * Benefits summary for durable medical equipment
   * @member {String} durable_medical_equipment
   */
  exports.prototype['durable_medical_equipment'] = undefined;

  /**
   * Diagnostic tests benefit summary
   * @member {String} diagnostic_test
   */
  exports.prototype['diagnostic_test'] = undefined;

  /**
   * Link to the summary of drug benefits for the plan
   * @member {String} drug_formulary_url
   */
  exports.prototype['drug_formulary_url'] = undefined;

  /**
   * Description of costs when visiting the ER
   * @member {String} emergency_room
   */
  exports.prototype['emergency_room'] = undefined;

  /**
   * Deductible for drugs when a family is on the plan.
   * @member {String} family_drug_deductible
   */
  exports.prototype['family_drug_deductible'] = undefined;

  /**
   * Maximum out-of-pocket for drugs when a family is on the plan
   * @member {String} family_drug_moop
   */
  exports.prototype['family_drug_moop'] = undefined;

  /**
   * Deductible when a family is on the plan
   * @member {String} family_medical_deductible
   */
  exports.prototype['family_medical_deductible'] = undefined;

  /**
   * Maximum out-of-pocket when a family is on the plan
   * @member {String} family_medical_moop
   */
  exports.prototype['family_medical_moop'] = undefined;

  /**
   * Cost for generic drugs
   * @member {String} generic_drugs
   */
  exports.prototype['generic_drugs'] = undefined;

  /**
   * 
   * @member {String} hios_issuer_id
   */
  exports.prototype['hios_issuer_id'] = undefined;

  /**
   * Government-issued HIOS plan ID
   * @member {String} id
   */
  exports.prototype['id'] = undefined;

  /**
   * Benefits summary for imaging coverage
   * @member {String} imaging
   */
  exports.prototype['imaging'] = undefined;

  /**
   * Deductible for drugs when an individual is on the plan
   * @member {String} individual_drug_deductible
   */
  exports.prototype['individual_drug_deductible'] = undefined;

  /**
   * Maximum out-of-pocket for drugs when an individual is on the plan
   * @member {String} individual_drug_moop
   */
  exports.prototype['individual_drug_moop'] = undefined;

  /**
   * Deductible when an individual is on the plan
   * @member {String} individual_medical_deductible
   */
  exports.prototype['individual_medical_deductible'] = undefined;

  /**
   * Maximum out-of-pocket when an individual is on the plan
   * @member {String} individual_medical_moop
   */
  exports.prototype['individual_medical_moop'] = undefined;

  /**
   * Cost under the plan for an inpatient facility
   * @member {String} inpatient_facility
   */
  exports.prototype['inpatient_facility'] = undefined;

  /**
   * Cost under the plan for an inpatient physician
   * @member {String} inpatient_physician
   */
  exports.prototype['inpatient_physician'] = undefined;

  /**
   * Plan metal grouping (e.g. platinum, gold, silver, etc)
   * @member {String} level
   */
  exports.prototype['level'] = undefined;

  /**
   * Link to a copy of the insurance carrier's logo
   * @member {String} logo_url
   */
  exports.prototype['logo_url'] = undefined;

  /**
   * Marketing name of the plan
   * @member {String} name
   */
  exports.prototype['name'] = undefined;

  /**
   * Cost under the plan for non-preferred brand drugs
   * @member {String} non_preferred_brand_drugs
   */
  exports.prototype['non_preferred_brand_drugs'] = undefined;

  /**
   * Is the plan on-market?
   * @member {Boolean} on_market
   */
  exports.prototype['on_market'] = undefined;

  /**
   * Is the plan off-market?
   * @member {Boolean} off_market
   */
  exports.prototype['off_market'] = undefined;

  /**
   * Does this plan provide any out of network coverage?
   * @member {Boolean} out_of_network_coverage
   */
  exports.prototype['out_of_network_coverage'] = undefined;

  /**
   * Benefits summary for outpatient facility coverage
   * @member {String} outpatient_facility
   */
  exports.prototype['outpatient_facility'] = undefined;

  /**
   * Benefits summary for outpatient mental health coverage
   * @member {String} outpatient_mental_health
   */
  exports.prototype['outpatient_mental_health'] = undefined;

  /**
   * Benefits summary for outpatient physician coverage
   * @member {String} outpatient_physician
   */
  exports.prototype['outpatient_physician'] = undefined;

  /**
   * Market in which the plan is offered (on_marketplace, shop, etc)
   * @member {String} plan_market
   */
  exports.prototype['plan_market'] = undefined;

  /**
   * Category of the plan (e.g. EPO, HMO, PPO, POS, Indemnity)
   * @member {String} plan_type
   */
  exports.prototype['plan_type'] = undefined;

  /**
   * Cost under the plan for perferred brand drugs
   * @member {String} preferred_brand_drugs
   */
  exports.prototype['preferred_brand_drugs'] = undefined;

  /**
   * Benefits summary for preventative care
   * @member {String} preventative_care
   */
  exports.prototype['preventative_care'] = undefined;

  /**
   * Cost under the plan to visit a Primary Care Physician
   * @member {String} primary_care_physician
   */
  exports.prototype['primary_care_physician'] = undefined;

  /**
   * Benefits summary for rehabilitation services
   * @member {String} rehabilitation_services
   */
  exports.prototype['rehabilitation_services'] = undefined;

  /**
   * Cost under the plan to visit a specialist
   * @member {String} specialist
   */
  exports.prototype['specialist'] = undefined;

  /**
   * Cost under the plan for specialty drugs
   * @member {String} specialty_drugs
   */
  exports.prototype['specialty_drugs'] = undefined;

  /**
   * Benefits summary for urgent care
   * @member {String} urgent_care
   */
  exports.prototype['urgent_care'] = undefined;

  /**
   * Percentage of doctors who matched this Plan
   * @member {Integer} match_percentage
   */
  exports.prototype['match_percentage'] = undefined;

  /**
   * Percentage of employees with 100% match
   * @member {Integer} perfect_match_percentage
   */
  exports.prototype['perfect_match_percentage'] = undefined;




  return exports;
}));
