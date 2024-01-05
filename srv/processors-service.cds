using { sap.capire.incidents as my } from '../db/schema';

service ProcessorsService { 
  entity Incidents as projection on my.Incidents;
  entity Customers as projection on my.Customers;
}
extend projection ProcessorsService.Customers with { 
  firstName || ' ' || lastName as name: String
}
annotate ProcessorsService with @(requires: 'support'); //[!code focus]
annotate ProcessorsService.Incidents with @odata.draft.enabled; //[!code focus]
