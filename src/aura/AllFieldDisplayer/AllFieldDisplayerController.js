({
	gotoRecord : function(component, event, helper) {
		var sObjectEvent = $A.get("e.force:navigateToSObject");        
        sObjectEvent.setParams({
            "recordId": component.get("v.subject.Id"),
        });
        sObjectEvent.fire();
    },
    
    doInit : function(component, event, helper){
        var subject = component.get("v.subject"),
			fieldMap = component.get("v.fieldMap"),
        	keys = Object.keys(subject),
            i = 0,
            kvps = [];
        
        //go through the fields and add them to kvps
        while (i < keys.length) {
            var prop = keys[i];            
            if (prop != "Id" && prop != "sobjectType"){ //exclude Id, sobjectType
                if (!$A.util.isUndefinedOrNull(fieldMap)){
	               kvps.push({"key" : fieldMap[prop], "value" : subject[prop]});                                   
                } else {
	               kvps.push({"key" : prop, "value" : subject[prop]});               
                }
            };
            i += 1;
        }
        component.set("v.kvps" , kvps);
        //TODO: handling for special fields types (date/datetime, geolocation)
    }
})