define(['./serviceHelper'], function (serviceHelper) {//获取车辆历史轨迹分页信息
    return {
        getCarHistoryData:function(terminalNum,startDate,endDate,pageNum,cb){
            var parameter = {
                id:'getCarHistory',
                parameter:{
                    terminalNum:terminalNum,
                    startDate:startDate,
                    endDate:endDate,
                    pageNum:pageNum
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