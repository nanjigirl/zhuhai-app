define(['./serviceHelper'], function (serviceHelper) {
    return {
        createCase:function (name,createType,disposeDepartment,description,submitOrNot,x,y,adress,cb) {
            var parameter = {
                id:'createCase',
                parameter:{
                    name:name,
                    createType:createType,
                    disposeDepartment:disposeDepartment,
                    description:description,
                    submitOrNot:submitOrNot,
                    x:x,
                    y:y,
                    adress:adress
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
        },

    }

});