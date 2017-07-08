define(['./serviceHelper'], function (serviceHelper) {
    return {
        getCoordinateData:function(terminalNum,cb){
            var parameter = {
                id:'getCoordinate',
                parameter:{
                    terminalNum:terminalNum
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