using { sap.capire.incidents as my } from '../db/schema';

service ProcessorsService { 
  action checkAI (Query: String);
  action diagram (Query: String);
  entity Incidents as projection on my.Incidents
  entity Customers as projection on my.Customers;

}
extend projection ProcessorsService.Customers with { 
  firstName || ' ' || lastName as name: String
}
annotate ProcessorsService.Incidents with @odata.draft.enabled; //[!code focus]