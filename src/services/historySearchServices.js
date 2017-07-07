define(['./serviceHelper'], function (serviceHelper) {
    return {
        getCarListData:function( cb){
            var parameter = {
                id:'getCarList',
                parameter:{
                    truckNum:''
                }
            };
            $.get(serviceHelper.getPath('getCarList'),function(result,errorCb){
                if(!!result){
                    if(!!result.success){
                        cb(result.data);
                    }
                }
                else{
                    errorCb(result);
                }
            });
        }

    }
});