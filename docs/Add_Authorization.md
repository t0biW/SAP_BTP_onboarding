# Add Authorization

## Prerequisits
You have added to your application a launch page for local testing. See [Use a Local Launch Page](Use_a_Local_Launch_Page.md).

## adding CAP Role Restrictions to Entities

1. Open the file `srv/processors-service.cds`.

2. Add the following restrictions block (`@(...)`) to your service.

```js
using { sap.capire.incidents as my } from '../db/schema';

/**
 * Used by support team members to process Incidents
 */
service ProcessorsService  {
  ...
}

annotate ProcessorsService with @(requires: 'support'); //[!code focus]
```

With this change, a user with the role `support` can view and change the incidents and customers.
