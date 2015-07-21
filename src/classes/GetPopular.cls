public class GetPopular {
    
    //loop through my field list, build a map of <fieldName, label>
    @auraEnabled 
    public static map<String,string> getFieldLabelMap (string objectType, string fields){
		map<String,string> output = new map<String,string>();
        list<string> fieldsAsList = fields.replaceAll(' ', '').split(',', -1); //split the fields into a list, with no spaces in it
        
        //get the describe results for the selected object
        Schema.DescribeSobjectResult[] results = Schema.describeSObjects(new String[]{objectType});
        for (string field:fieldsAsList){
            //system.debug(results[0].fields.getMap().get(field).getDescribe().getLabel());
            output.put(field, results[0].fields.getMap().get(field).getDescribe().getLabel());
        }
      
        return output;  
    } 
    
    @AuraEnabled
    public static list<sobject> GetPopularRecords(string objectType, integer daysWindow, string fields, integer recordLimit){       
        list<Id> objectIds = AR2Id(GetPopularARs(objectType, daysWindow, recordLimit), 'ParentId');
        if (fields != null) fields = ', ' + fields;        
        string query = 'select id'+ fields +' from ' + objectType + ' where Id in:  objectIds';
        
        return Database.query(query);
    }

    //gets the Id out of a list of ARs
    public static list<id> AR2Id (list<AggregateResult> ARs, string IdField){
    	list<id> output = new list<id>();
        
        for (AggregateResult AR:ARs){
            output.add(string.valueOf(AR.get(IdField)));
        }		
		return output;        
    }
    
    public static list<aggregateResult> GetPopularARs (string objectType, integer daysWindow, integer recordLimit){
        string query = 'select id from ' + objectType + ' where LastModifiedDate  = LAST_N_DAYS: ' + daysWindow;        
        List<sObject> sobjList = Database.query(query);        
        
        list<id> objectIds = new list<id>();
        
        for (sobject so:sobjList){
            objectIds.add(string.valueof(so.get('Id')));
        }		
        
        return [select ParentId, count(Id) total from EntitySubscription where ParentId in: objectIds group by ParentId ORDER BY Count(Id) DESC limit: integer.valueof(recordLimit)];       
    }
    

}