# Prerequisits

You have the SAP Business Application Studio configured. See [Set Up SAP Business Application Studio](Set_up_BAS.md).

# Create a CAP Project

1. In SAP Business Application Studio, click the burger menu at the top left corner and choose **Terminal** &rarr; **New Terminal**
2. Navigate to the projects folder from the root directory.

```
cd projects
```

3. Create a new project using `cds init`.

```
cds init incidents-mgmt
```

This creates a folder `incidents-mgmt` with your newly created CAP project.

4. Choose **Open Folder** &rarr; /home/user/projects. Choose **OK** to open the project in BAS.

> **_INFO:_** This document is compatible with cds version 7. Please go to the package.json file and check whether the @sap/cds version is 7 or higher. If necessary, update the cds version in the dependencies to: `@sap/cds: >=7`.

5. Choose **Terminal** &rarr; **New Terminal** from its menu.
6. You can now use the terminal to start the CAP server using following command:

> **_INFO:_** you need to be in the project, i.e. first navigate to your project in hte terminal via `cd ./projects/incidents-mgmt`.
 
```
cds watch
```

The CAP server serves all the CAP sources from your project. It also "watches" all the files in your projects and conveniently restarts whenever you save a file. Changes you've made are immediately served without you having to run the command again. In this newly created project the CAP server tells you that there are no models or service definitions yet that it can serve.
After you executed the `cds watch` command, you should get this feedback in the terminal:

```
[dev] cds w

cds serve all --with-mocks --in-memory?
live reload enabled for browsers

    ___________________________

 No models found in db/,srv/,app/,schema,services. // [!code focus]
 Waiting for some to arrive... // [!code focus]
```

You are invited to let this command run while doing the next steps to get immediate feedback from the CAP server. 
So, let's go on adding a CDS model as follows...
---

# Add a Domain Model

1. Create a new file `schema.cds` in the `db` folder of your project.
2. Paste the following code snippet in the `db/schema.cds` file.

```
using { User, cuid, managed, sap.common.CodeList } from '@sap/cds/common';
namespace sap.capire.incidents; 

/**
 * Incidents created by Customers.
 */
entity Incidents : cuid, managed {  
   customer     : Association to Customers;
   title        : String  @title : 'Title';
   urgency      : Association to Urgency;
   status       : Association to Status; 
   conversation  : Composition of many {
    key ID    : UUID;
    timestamp : type of managed:createdAt;
    author    : type of managed:createdBy;
    message   : String;
  };
}

/**
 * Customers entitled to create support Incidents.
 */
entity Customers : cuid, managed { 
  firstName     : String;
  lastName      : String;
  email         : EMailAddress;
  phone         : PhoneNumber;
  incidents     : Association to many Incidents on incidents.customer = $self;
}

entity Status : CodeList {
  key code: String enum {
      new = 'N';
      assigned = 'A'; 
      in_process = 'I'; 
      on_hold = 'H'; 
      resolved = 'R'; 
      closed = 'C'; 
  };
  criticality : Integer;
}

entity Urgency : CodeList {
  key code: String enum {
      high = 'H';
      medium = 'M'; 
      low = 'L'; 
  };
}

type EMailAddress : String;
type PhoneNumber : String;
```
As soon as you saved the file, the still running CAP server reacts immediately with a new output:

```
[cds] - connect to db > sqlite { database: ':memory:' }
/> successfully deployed to in-memory db.
```

This means that the CAP server detected the changes in `db/schema.cds` and automatically created an in-memory SQLite database when restarting the server process.

---
# Create services

After the recent changes, the CAP server prints this message:

```
No service definitions found in loaded models.
    Waiting for some to arrive...
```

Let's define a service _ProcessorsService_ for support engineers to process incidents created on behalf of customers.

to create the service definition:

1. Create a new file `processors-service.cds` in the `srv` folder.
2. Paste the following code snippet in the `srv/processors-service.cds` file:

```
using { sap.capire.incidents as my } from '../db/schema';

service ProcessorsService { 
  entity Incidents as projection on my.Incidents;
  entity Customers as projection on my.Customers;
}
```

This time, the CAP server reacted with additional output:

```
[cds] - serving ProcessorsService { path: '/odata/v4/processors' } 

[cds] - server listening on { url: 'http://localhost:4004' }
[cds] - [ terminate with ^C ]
```

As you can see in the log output, the new file created generic service provider `ProcessorsService` that serve requests on the `/odata/v4/processors` endpoint.

`Command+click` to open the link `https://port4004-workspaces-ws-9pjlw.us10.applicationstudio.cloud.sap/launchpage.html#Shell-home` from SAP Business Application Studio in your browser, you'll see the generic index.html page:


