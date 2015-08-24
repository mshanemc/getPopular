({
	doInit : function(component, event, helper) {
		var getRecords = component.get("c.GetPopularRecords");
		var getFieldLabelMap = component.get("c.getFieldLabelMap");

        getRecords.setParams({ 
            objectType: component.get("v.object"),
            daysWindow: component.get("v.DaysWindow"),
            fields: component.get("v.fields"),            
            recordLimit: component.get("v.recordLimit")            
        });
        
        getRecords.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.objects", response.getReturnValue());
                component.set("v.objectCount", response.getReturnValue().length);
            } else {
                console.log(response);
            }
        });
        
        getFieldLabelMap.setParams({
            objectType: component.get("v.object"),
            fields: component.get("v.fields")            
        });
        
        getFieldLabelMap.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.fieldLabelMap", response.getReturnValue());
                console.log(component.get("v.fieldLabelMap"));
            } else {
                console.log(response);
            }
        });
        
        $A.enqueueAction(getFieldLabelMap);
        $A.enqueueAction(getRecords);
        
	},
    
    
})