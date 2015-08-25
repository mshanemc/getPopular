# getPopular
Lightning Components for displaying most-followed records

There's a [demo video](https://www.youtube.com/watch?v=srdIGe7gkYo)!

Includes design resources for app builder.  You can specify 

* which sObject
* which fields you want to show
* how many records to include
* how many days to look back through (lastModified is within that many days)

There's a sub-component called AllFieldDisplayer.  It receives 

* an sObject (generic) 
* a list mapping the api-field-name to the label (friendly name, can be localized).

Then it displays the fields on the sObject you gave it (not ALL the fields, unless you passed in an object that had queried ALL the fields).   

Clicking on a record navigates you to the detail page for that record.

Not done that nicely:

* handling date fields--you just get the js timestamp format for now 
* special field types like geolocation.  