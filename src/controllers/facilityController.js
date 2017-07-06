define(['./model/facilityModel','services/facilityService'],function(facilityModel,facilityService){
return {
	getAllFacility:function(cb){
	facilityService.getAllFacility(function(data){
		cb(data);
	});

	},
    getFacilityByType:function(facilityType,cb){
	facilityService.getFacilityByType(facilityType,function(data){
		cb(data);
	});
	},
	getAlarmInfoByFacility:function(facilityId,cb){
		facilityService.getAlarmInfoByFacility(facilityId,function(data){
			cb(data);
		})
	}
}	
});