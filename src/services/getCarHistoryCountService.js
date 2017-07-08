define(['./serviceHelper'], function (serviceHelper) {//车辆历史轨迹总数
    return {
        getCarHistoryCountData:function(terminalNum,startDate,endDate,cb){
            var parameter = {
                id:'getCarHistoryCount',
                parameter:{
                    terminalNum:terminalNum,
                    startDate:startDate,
                    endDate:endDate,
                }
            };
            $.get(serviceHelper.getPath(parameter),function(result,errorCb){
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