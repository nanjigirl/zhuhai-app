define(['./model/facilityModel','services/facilityService'],function(facilityModel,facilityService){
return {
	getAllFacility:function(cb){
	facilityService.getAllFacility(function(data){
		cb(data);
	});

	},
	getDeviceDetailByFacility:function(facilityId,cb){
	facilityService.getDeviceDetailByFacility(facilityId,function(data){
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