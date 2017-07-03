define(['./serviceHelper','./mock/mock'], function (serviceHelper,mock) {
    return {
        getAllFacility: function (cb) {
          /*  $.get(serviceHelper.getPath('facilityList'), function (result) {
                console.log(result);
                if (!!result.success) {
                    cb(result.data);
                    return;
                }
                console.log('Error:', result);
            });*/
          setTimeout(function(){
              cb(mock.facilities);
          },1000);
        },
        getDeviceDetailByFacility: function (facilityId, cb) {
            setTimeout(function(){
                if(facilityId==35){
                    cb({devices:mock.rfDevices});
                }
                else if(facilityId==36){
                    cb({devices:mock.rvDevices});
                }
                else{
                    cb({devices:mock.rcDevices});
                }

            },1000);

        },
        getAlarmInfoByFacility:function(facilityId,cb,errorcb){
          setTimeout(function () {
              cb([]);
          },1000);
        }
    }

});